import { action, Flow, trigger, wfa } from '@servicenow/sdk/automation'

export const icsFormGeneratorFulfillmentFlow = Flow(
    {
        $id: Now.ID['ics-form-generator-fulfillment-flow'],
        name: 'ICS Form Generator - Fulfillment Flow',
        runAs: 'system',
    },
    wfa.trigger(
        trigger.application.serviceCatalog,
        { $id: Now.ID['ics-form-generator-service-catalog-trigger'] },
        { run_flow_in: 'background' }
    ),
    () => {
        wfa.action(
            action.core.log,
            { $id: Now.ID['ics-form-generator-process-request'] },
            {
                log_level: 'info',
                log_message: wfa.inlineScript(`(function() {
                    var SKILL_NAME = 'ICS Catalog Design Interpreter';
                    var GENERATED_MARKDOWN_FILE = 'generated-catalog-design.md';
                    var GENERATED_FLUENT_FILE = 'generated-catalog-item.now.ts';
                    var REQUIRED_INPUTS = ['document text', 'additional instructions', 'requested item status', 'optional name prefix'];
                    var REQUIRED_OUTPUT = 'catalog specification json';

                    function toStr(value) {
                        return value === null || value === undefined ? '' : (value + '');
                    }

                    function trim(value) {
                        return toStr(value).trim();
                    }

                    function isEmpty(value) {
                        return trim(value) === '';
                    }

                    function safeJson(value) {
                        try {
                            return JSON.stringify(value);
                        } catch (ignore) {
                            return toStr(value);
                        }
                    }

                    function xmlDecode(text) {
                        return toStr(text)
                            .replace(/&amp;/g, '&')
                            .replace(/&lt;/g, '<')
                            .replace(/&gt;/g, '>')
                            .replace(/&quot;/g, '"')
                            .replace(/&#39;/g, "'")
                            .replace(/&#10;/g, '\\n')
                            .replace(/&#xA;/g, '\\n')
                            .replace(/&#13;/g, '')
                            .replace(/&#xD;/g, '');
                    }

                    function toBoolean(value) {
                        var v = trim(value).toLowerCase();
                        return v === 'true' || v === 'yes' || v === '1' || v === 'y';
                    }

                    function resolveRitmSysId() {
                        try {
                            if (typeof fd_data !== 'undefined') {
                                var directPaths = [
                                    fd_data && fd_data.trigger && fd_data.trigger.request_item,
                                    fd_data && fd_data.trigger && fd_data.trigger.current && fd_data.trigger.current.sys_id,
                                    fd_data && fd_data.trigger && fd_data.trigger.current,
                                ];

                                for (var d = 0; d < directPaths.length; d++) {
                                    var direct = trim(directPaths[d]);
                                    if (/^[0-9a-f]{32}$/.test(direct)) {
                                        return direct;
                                    }
                                }

                                var fdText = safeJson(fd_data);
                                var keyedMatch = fdText.match(/"request_item"\s*:\s*"([0-9a-f]{32})"/);
                                if (keyedMatch && keyedMatch[1]) {
                                    return keyedMatch[1];
                                }
                            }
                        } catch (ignore) {}

                        return '';
                    }

                    function getRitmStateValues() {
                        var state = {
                            successState: '3',
                            successStage: 'complete',
                            failureState: '4',
                            failureStage: 'incomplete',
                        };

                        try {
                            var choice = new GlideRecord('sys_choice');
                            choice.addQuery('name', 'sc_req_item');
                            choice.addQuery('element', 'state');
                            choice.addQuery('inactive', false);
                            choice.query();
                            while (choice.next()) {
                                var label = trim(choice.getValue('label')).toLowerCase();
                                var val = trim(choice.getValue('value'));
                                if ((label === 'closed complete' || label === 'complete') && !isEmpty(val)) {
                                    state.successState = val;
                                }
                                if ((label === 'closed incomplete' || label === 'incomplete' || label === 'cancelled') && !isEmpty(val)) {
                                    state.failureState = val;
                                }
                            }
                        } catch (ignore) {}

                        return state;
                    }

                    function writeWorkNotes(ritmRecord, lines) {
                        ritmRecord.setValue('work_notes', toStr(lines).substring(0, 3900));
                        ritmRecord.update();
                    }

                    function closeRitm(ritmRecord, stateValue, stageValue, notes) {
                        ritmRecord.setValue('state', stateValue);
                        ritmRecord.setValue('stage', stageValue);
                        ritmRecord.setValue('work_notes', toStr(notes).substring(0, 3900));
                        ritmRecord.update();
                    }

                    function findDocxAttachment(ritmSysId) {
                        var attachment = new GlideRecord('sys_attachment');
                        attachment.addQuery('table_name', 'sc_req_item');
                        attachment.addQuery('table_sys_id', ritmSysId);
                        attachment.addQuery('file_name', 'ENDSWITH', '.docx');
                        attachment.orderByDesc('sys_created_on');
                        attachment.setLimit(1);
                        attachment.query();
                        return attachment.next() ? attachment : null;
                    }

                    function readZipEntryText(bytes, entryName) {
                        var ByteArrayInputStream = Packages.java.io.ByteArrayInputStream;
                        var ByteArrayOutputStream = Packages.java.io.ByteArrayOutputStream;
                        var ZipInputStream = Packages.java.util.zip.ZipInputStream;

                        var zis = new ZipInputStream(new ByteArrayInputStream(bytes));
                        try {
                            var entry;
                            while ((entry = zis.getNextEntry()) !== null) {
                                if (toStr(entry.getName()) === entryName) {
                                    var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);
                                    var baos = new ByteArrayOutputStream();
                                    var len;
                                    while ((len = zis.read(buffer)) > 0) {
                                        baos.write(buffer, 0, len);
                                    }
                                    return new java.lang.String(baos.toByteArray(), 'UTF-8') + '';
                                }
                            }
                        } finally {
                            try { zis.close(); } catch (ignore) {}
                        }
                        return '';
                    }

                    function extractDocxContent(attachmentRecord) {
                        var extraction = {
                            capabilityAvailable: false,
                            detail: '',
                            paragraphs: [],
                            tables: [],
                            documentText: '',
                        };

                        try {
                            if (typeof GlideSysAttachment === 'undefined') {
                                extraction.detail = 'GlideSysAttachment API unavailable in runtime.';
                                return extraction;
                            }

                            var gsa = new GlideSysAttachment();
                            var bytes = gsa.getBytes(attachmentRecord);
                            if (!bytes || bytes.length === 0) {
                                extraction.detail = 'Attachment bytes are empty.';
                                return extraction;
                            }

                            extraction.capabilityAvailable = true;
                            extraction.detail = 'OpenXML extraction using GlideSysAttachment + java.util.zip.';

                            var xml = readZipEntryText(bytes, 'word/document.xml');
                            if (isEmpty(xml)) {
                                extraction.detail = 'DOCX extraction failed: word/document.xml not found.';
                                extraction.capabilityAvailable = false;
                                return extraction;
                            }

                            var paragraphMatches = xml.match(/<w:p[\\s\\S]*?<\\/w:p>/g) || [];
                            for (var i = 0; i < paragraphMatches.length; i++) {
                                var p = paragraphMatches[i];
                                var textParts = p.match(/<w:t[^>]*>([\\s\\S]*?)<\\/w:t>/g) || [];
                                var paragraphText = '';
                                for (var j = 0; j < textParts.length; j++) {
                                    paragraphText += xmlDecode(textParts[j].replace(/<[^>]+>/g, ''));
                                }
                                paragraphText = trim(paragraphText);
                                if (!isEmpty(paragraphText)) {
                                    extraction.paragraphs.push(paragraphText);
                                }
                            }

                            var rowMatches = xml.match(/<w:tr[\\s\\S]*?<\\/w:tr>/g) || [];
                            for (var r = 0; r < rowMatches.length; r++) {
                                var row = rowMatches[r];
                                var cells = [];
                                var cellMatches = row.match(/<w:tc[\\s\\S]*?<\\/w:tc>/g) || [];
                                for (var c = 0; c < cellMatches.length; c++) {
                                    var cell = cellMatches[c];
                                    var cellTextParts = cell.match(/<w:t[^>]*>([\\s\\S]*?)<\\/w:t>/g) || [];
                                    var cellText = '';
                                    for (var k = 0; k < cellTextParts.length; k++) {
                                        cellText += xmlDecode(cellTextParts[k].replace(/<[^>]+>/g, ''));
                                    }
                                    cellText = trim(cellText);
                                    cells.push(cellText);
                                }
                                if (cells.length > 0) {
                                    extraction.tables.push(cells);
                                }
                            }

                            var lines = [];
                            for (var pIndex = 0; pIndex < extraction.paragraphs.length; pIndex++) {
                                lines.push(extraction.paragraphs[pIndex]);
                            }
                            if (extraction.tables.length > 0) {
                                lines.push('');
                                lines.push('Table Content:');
                                for (var tIndex = 0; tIndex < extraction.tables.length; tIndex++) {
                                    lines.push('- ' + extraction.tables[tIndex].join(' | '));
                                }
                            }
                            extraction.documentText = lines.join('\\n').substring(0, 50000);
                            return extraction;
                        } catch (e) {
                            extraction.detail = 'DOCX extraction error: ' + toStr(e && e.message ? e.message : e);
                            extraction.capabilityAvailable = false;
                            return extraction;
                        }
                    }

                    function getSkillReadiness() {
                        var readiness = {
                            skillExists: false,
                            skillActivePublished: false,
                            aiProviderConfigured: false,
                            modelConfigured: false,
                            requiredSkillInputsPresent: false,
                            requiredSkillOutputPresent: false,
                            invocationConfigPresent: false,
                            capabilityId: '',
                            messages: [],
                        };

                        var capability = new GlideRecord('sys_one_extend_capability');
                        capability.addQuery('name', SKILL_NAME);
                        capability.setLimit(1);
                        capability.query();
                        if (!capability.next()) {
                            readiness.messages.push('Skill record not found: ' + SKILL_NAME);
                            return readiness;
                        }

                        readiness.skillExists = true;
                        readiness.capabilityId = toStr(capability.getUniqueValue());
                        readiness.skillActivePublished = toBoolean(capability.getValue('active'));

                        var skillConfig = new GlideRecord('sn_nowassist_skill_config');
                        skillConfig.addQuery('skill_id', readiness.capabilityId);
                        skillConfig.setLimit(1);
                        skillConfig.query();
                        if (skillConfig.next()) {
                            readiness.invocationConfigPresent = true;
                        } else {
                            readiness.messages.push('Skill config not found in sn_nowassist_skill_config.');
                        }

                        var definition = new GlideRecord('sys_one_extend_capability_definition');
                        definition.addQuery('capability', readiness.capabilityId);
                        definition.setLimit(1);
                        definition.query();
                        var definitionId = definition.next() ? toStr(definition.getUniqueValue()) : '';

                        if (!isEmpty(definitionId)) {
                            var aiConfig = new GlideRecord('sys_generative_ai_config');
                            aiConfig.addQuery('definition', definitionId);
                            aiConfig.orderByDesc('sys_created_on');
                            aiConfig.setLimit(1);
                            aiConfig.query();
                            if (aiConfig.next()) {
                                readiness.aiProviderConfigured = !isEmpty(aiConfig.getValue('name'));
                                readiness.modelConfigured = !isEmpty(aiConfig.getValue('model'));
                                readiness.skillActivePublished = readiness.skillActivePublished && toBoolean(aiConfig.getValue('active'));
                            } else {
                                readiness.messages.push('No Generative AI config found for skill definition.');
                            }

                            var attrs = new GlideRecord('sys_one_extend_definition_attribute');
                            if (attrs.isValidField('definition')) {
                                attrs.addQuery('definition', definitionId);
                            }
                            attrs.query();
                            var found = {};
                            while (attrs.next()) {
                                var attrName = trim(attrs.getValue('name'));
                                if (!isEmpty(attrName)) {
                                    found[attrName] = true;
                                }
                            }

                            var allInputs = true;
                            for (var iReq = 0; iReq < REQUIRED_INPUTS.length; iReq++) {
                                if (!found[REQUIRED_INPUTS[iReq]]) {
                                    allInputs = false;
                                }
                            }
                            readiness.requiredSkillInputsPresent = allInputs;
                            readiness.requiredSkillOutputPresent = !!found[REQUIRED_OUTPUT];
                        } else {
                            readiness.messages.push('Skill capability definition not found.');
                        }

                        return readiness;
                    }

                    function invokeSkill(capabilityId, documentText, requestedItemStatus, optionalPrefix, additionalInstructions) {
                        var result = {
                            ok: false,
                            raw: null,
                            parsedJson: null,
                            source: '',
                            message: '',
                        };

                        if (typeof sn_one_extend === 'undefined' || !sn_one_extend.OneExtendUtil) {
                            result.message = 'sn_one_extend.OneExtendUtil API is not available in runtime.';
                            return result;
                        }

                        var inputPayload = {
                            'document text': documentText,
                            'additional instructions': additionalInstructions,
                            'requested item status': requestedItemStatus,
                            'optional name prefix': optionalPrefix,
                        };

                        try {
                            var request = {
                                capabilityId: capabilityId,
                                inputs: inputPayload,
                            };
                            var response = sn_one_extend.OneExtendUtil.executeCapability(request);
                            result.raw = response;

                            if (!response || isEmpty(response['catalog specification json'])) {
                                result.message = 'Skill output "catalog specification json" was missing.';
                                return result;
                            }

                            result.source = 'catalog specification json';
                            result.parsedJson = JSON.parse(toStr(response['catalog specification json']));
                            result.ok = true;
                            result.message = 'Skill invocation succeeded.';
                            return result;
                        } catch (invokeErr) {
                            result.message = toStr(invokeErr && invokeErr.message ? invokeErr.message : invokeErr);
                        }

                        return result;
                    }

                    function validateSpec(spec) {
                        var out = {
                            valid: true,
                            errors: [],
                            warnings: [],
                            normalized: null,
                            variableCount: 0,
                            choiceCount: 0,
                        };

                        if (!spec || typeof spec !== 'object') {
                            out.valid = false;
                            out.errors.push('Skill output is not a JSON object.');
                            return out;
                        }

                        var item = spec.catalog_item || {};
                        var variables = spec.variables || [];
                        var warnings = spec.warnings || [];
                        var errors = spec.errors || [];

                        for (var wi = 0; wi < warnings.length; wi++) {
                            out.warnings.push(toStr(warnings[wi]));
                        }
                        for (var ei = 0; ei < errors.length; ei++) {
                            out.errors.push(toStr(errors[ei]));
                        }

                        if (isEmpty(item.name)) out.errors.push('catalog_item.name is required.');
                        if (isEmpty(item.short_description)) out.errors.push('catalog_item.short_description is required.');
                        if (isEmpty(item.description)) out.errors.push('catalog_item.description is required.');
                        if (isEmpty(item.catalog_name)) out.errors.push('catalog_item.catalog_name is required.');
                        if (isEmpty(item.category_name)) out.errors.push('catalog_item.category_name is required.');
                        if (toStr(item.name).length > 100) out.errors.push('catalog_item.name exceeds 100 chars.');
                        if (toStr(item.short_description).length > 160) out.errors.push('catalog_item.short_description exceeds 160 chars.');

                        if (!Array.isArray(variables)) {
                            out.errors.push('variables must be an array.');
                            variables = [];
                        }

                        if (variables.length > 50) {
                            out.errors.push('No more than 50 variables are allowed.');
                        }

                        var supportedTypes = {
                            single_line_text: true,
                            multi_line_text: true,
                            reference: true,
                            select_box: true,
                            yes_no: true,
                            requested_for: true,
                            integer: true,
                            true_false: true,
                        };
                        var names = {};
                        var orders = {};

                        for (var i = 0; i < variables.length; i++) {
                            var v = variables[i] || {};
                            var varName = trim(v.variable_name);
                            var varType = trim(v.type).toLowerCase();
                            var order = parseInt(v.order, 10);

                            if (isEmpty(varName)) out.errors.push('variables[' + i + '].variable_name is required.');
                            if (!/^[a-z][a-z0-9_]*$/.test(varName)) out.errors.push('Variable name invalid: ' + varName);
                            if (toStr(varName).length > 40) out.errors.push('Variable name exceeds 40 chars: ' + varName);
                            if (names[varName]) out.errors.push('Duplicate variable name: ' + varName);
                            names[varName] = true;

                            if (isEmpty(v.question)) out.errors.push('Question is required for variable: ' + varName);
                            if (toStr(v.question).length > 120) out.errors.push('Question exceeds 120 chars: ' + varName);

                            if (!supportedTypes[varType]) out.errors.push('Unsupported variable type: ' + varType);
                            if (isNaN(order)) out.errors.push('Variable order must be numeric for: ' + varName);
                            if (orders[order]) out.errors.push('Duplicate variable order: ' + order);
                            orders[order] = true;

                            if (varType === 'reference' && isEmpty(v.reference_table)) {
                                out.errors.push('Reference variable requires reference_table: ' + varName);
                            }
                            if (varType === 'reference' && !isEmpty(v.reference_qualifier) && toStr(v.reference_qualifier).length > 255) {
                                out.errors.push('Reference qualifier exceeds 255 chars: ' + varName);
                            }

                            if (varType === 'select_box') {
                                if (!Array.isArray(v.choices) || v.choices.length === 0) {
                                    out.errors.push('Choice variable requires non-empty choices: ' + varName);
                                } else {
                                    var choiceValues = {};
                                    var choiceLabels = {};
                                    for (var cIdx = 0; cIdx < v.choices.length; cIdx++) {
                                        var ch = v.choices[cIdx] || {};
                                        var cVal = trim(ch.value);
                                        var cLab = trim(ch.label);
                                        if (isEmpty(cVal) || isEmpty(cLab)) {
                                            out.errors.push('Choice value/label is required: ' + varName + ' index ' + cIdx);
                                        }
                                        if (choiceValues[cVal]) out.errors.push('Duplicate choice value on ' + varName + ': ' + cVal);
                                        if (choiceLabels[cLab]) out.errors.push('Duplicate choice label on ' + varName + ': ' + cLab);
                                        choiceValues[cVal] = true;
                                        choiceLabels[cLab] = true;
                                    }
                                }
                            }
                        }

                        out.variableCount = variables.length;
                        var cc = 0;
                        for (var vc = 0; vc < variables.length; vc++) {
                            cc += Array.isArray(variables[vc].choices) ? variables[vc].choices.length : 0;
                        }
                        out.choiceCount = cc;
                        out.valid = out.errors.length === 0;
                        out.normalized = {
                            catalog_item: {
                                name: trim(item.name),
                                short_description: trim(item.short_description),
                                description: trim(item.description),
                                active: toBoolean(item.active),
                                catalog_name: trim(item.catalog_name),
                                category_name: trim(item.category_name),
                            },
                            variables: variables,
                            warnings: out.warnings,
                            errors: out.errors,
                        };
                        return out;
                    }

                    function findActiveCatalogByName(name) {
                        var gr = new GlideRecord('sc_catalog');
                        gr.addQuery('title', name);
                        gr.addQuery('active', true);
                        gr.setLimit(2);
                        gr.query();
                        if (!gr.next()) {
                            return { status: 'none', record: null };
                        }
                        var first = gr.getUniqueValue();
                        if (gr.next()) {
                            return { status: 'multiple', record: null };
                        }
                        gr.get(first);
                        return { status: 'one', record: gr };
                    }

                    function findActiveCategoryByName(name) {
                        var gr = new GlideRecord('sc_category');
                        gr.addQuery('title', name);
                        gr.addQuery('active', true);
                        gr.setLimit(2);
                        gr.query();
                        if (!gr.next()) {
                            return { status: 'none', record: null };
                        }
                        var first = gr.getUniqueValue();
                        if (gr.next()) {
                            return { status: 'multiple', record: null };
                        }
                        gr.get(first);
                        return { status: 'one', record: gr };
                    }

                    function validateCategoryInCatalog(categoryId, catalogId) {
                        var m = new GlideRecord('sc_category_catalog');
                        m.addQuery('sc_category', categoryId);
                        m.addQuery('sc_catalog', catalogId);
                        m.setLimit(1);
                        m.query();
                        return m.next();
                    }

                    function tableExists(tableName) {
                        var obj = GlideDBObjectManager.get();
                        return obj && obj.tableExists(tableName);
                    }

                    function isActivationRequested(ritmSysId) {
                        try {
                            var ritm = new GlideRecord('sc_req_item');
                            if (ritm.get(ritmSysId) && ritm.variables && ritm.variables.make_generated_item_active) {
                                var byVarApi = trim(ritm.variables.make_generated_item_active + '').toLowerCase();
                                if (byVarApi === 'yes' || byVarApi === 'true' || byVarApi === '1') {
                                    return true;
                                }
                            }
                        } catch (ignore) {}

                        var mtom = new GlideRecord('sc_item_option_mtom');
                        mtom.addQuery('request_item', ritmSysId);
                        mtom.addQuery('sc_item_option.item_option_new.name', 'make_generated_item_active');
                        mtom.orderByDesc('sys_created_on');
                        mtom.setLimit(1);
                        mtom.query();
                        if (mtom.next()) {
                            var val = trim(mtom.getValue('value')).toLowerCase();
                            return val === 'yes' || val === 'true' || val === '1';
                        }
                        return false;
                    }

                    function findExistingGeneratedItem(ritmSysId) {
                        var item = new GlideRecord('sc_cat_item');
                        if (item.isValidField('u_ics_form_generator_source_ritm')) {
                            item.addQuery('u_ics_form_generator_source_ritm', ritmSysId);
                            item.orderByDesc('sys_created_on');
                            item.setLimit(1);
                            item.query();
                            if (item.next()) return item;
                        }

                        item = new GlideRecord('sc_cat_item');
                        item.addQuery('description', 'CONTAINS', '[generated_from_ritm:' + ritmSysId + ']');
                        item.orderByDesc('sys_created_on');
                        item.setLimit(1);
                        item.query();
                        return item.next() ? item : null;
                    }

                    function findDuplicateItemByName(itemName) {
                        var item = new GlideRecord('sc_cat_item');
                        item.addQuery('name', itemName);
                        item.setLimit(1);
                        item.query();
                        return item.next();
                    }

                    function cleanupCreatedRecords(createdRefs) {
                        for (var i = 0; i < createdRefs.length; i++) {
                            var ref = createdRefs[i];
                            try {
                                var gr = new GlideRecord(ref.table);
                                if (gr.get(ref.sys_id)) {
                                    gr.deleteRecord();
                                }
                            } catch (ignore) {}
                        }
                    }

                    function getItemOptionTypeValue(typeKey) {
                        var desiredLabels = {
                            single_line_text: ['Single Line Text', 'Single Line'],
                            multi_line_text: ['Multi Line Text', 'Multi Line'],
                            reference: ['Reference'],
                            select_box: ['Select Box', 'Select'],
                            yes_no: ['Yes/No', 'Yes No'],
                            integer: ['Integer'],
                            true_false: ['True/False', 'True False'],
                            requested_for: ['Reference'],
                        };

                        var labels = desiredLabels[typeKey] || desiredLabels.single_line_text;
                        var choices = new GlideRecord('sys_choice');
                        choices.addQuery('name', 'item_option_new');
                        choices.addQuery('element', 'type');
                        choices.addQuery('inactive', false);
                        choices.query();

                        while (choices.next()) {
                            var label = trim(choices.getValue('label'));
                            for (var i = 0; i < labels.length; i++) {
                                if (label === labels[i]) {
                                    return choices.getValue('value');
                                }
                            }
                        }

                        var fallback = {
                            single_line_text: '1',
                            multi_line_text: '2',
                            reference: '8',
                            select_box: '5',
                            yes_no: '6',
                            integer: '7',
                            true_false: '1',
                            requested_for: '8',
                        };
                        return fallback[typeKey] || fallback.single_line_text;
                    }

                    function createGeneratedItem(spec, ritmSysId, catalogId, categoryId, activateRequested) {
                        var created = {
                            itemSysId: '',
                            itemName: '',
                            variableCount: 0,
                            choiceCount: 0,
                            incomplete: false,
                            warnings: [],
                            createdVariableIds: [],
                            createdRefs: [],
                        };

                        var existing = findExistingGeneratedItem(ritmSysId);
                        if (existing) {
                            created.itemSysId = toStr(existing.getUniqueValue());
                            created.itemName = toStr(existing.getValue('name'));
                            created.warnings.push('Existing generated catalog item reused for retry protection.');
                            return created;
                        }

                        if (findDuplicateItemByName(spec.catalog_item.name)) {
                            throw 'Duplicate catalog item name exists: ' + spec.catalog_item.name;
                        }

                        var item = new GlideRecord('sc_cat_item');
                        item.initialize();
                        item.setValue('name', spec.catalog_item.name);
                        item.setValue('short_description', spec.catalog_item.short_description);
                        item.setValue('description', spec.catalog_item.description + '\\n\\n[generated_from_ritm:' + ritmSysId + ']');
                        item.setValue('active', activateRequested === true);
                        item.setValue('type', 'item');
                        var itemSysId = item.insert();
                        if (!itemSysId) {
                            throw 'Failed to create sc_cat_item record.';
                        }
                        created.createdRefs.push({ table: 'sc_cat_item', sys_id: itemSysId });

                        created.itemSysId = toStr(itemSysId);
                        created.itemName = spec.catalog_item.name;

                        var itemCatalog = new GlideRecord('sc_cat_item_catalog');
                        itemCatalog.initialize();
                        itemCatalog.setValue('sc_cat_item', itemSysId);
                        itemCatalog.setValue('sc_catalog', catalogId);
                        var itemCatalogSysId = itemCatalog.insert();
                        if (!itemCatalogSysId) {
                            throw 'Failed to create sc_cat_item_catalog mapping.';
                        }
                        created.createdRefs.push({ table: 'sc_cat_item_catalog', sys_id: itemCatalogSysId });

                        var itemCategory = new GlideRecord('sc_cat_item_category');
                        itemCategory.initialize();
                        itemCategory.setValue('sc_cat_item', itemSysId);
                        itemCategory.setValue('sc_category', categoryId);
                        var itemCategorySysId = itemCategory.insert();
                        if (!itemCategorySysId) {
                            throw 'Failed to create sc_cat_item_category mapping.';
                        }
                        created.createdRefs.push({ table: 'sc_cat_item_category', sys_id: itemCategorySysId });

                        for (var i = 0; i < spec.variables.length; i++) {
                            var v = spec.variables[i];
                            var variable = new GlideRecord('item_option_new');
                            variable.initialize();
                            variable.setValue('cat_item', itemSysId);
                            variable.setValue('name', v.variable_name);
                            variable.setValue('question_text', v.question);
                            variable.setValue('order', parseInt(v.order, 10));
                            variable.setValue('mandatory', toBoolean(v.mandatory));

                            var resolvedTypeKey = trim(v.type).toLowerCase();
                            variable.setValue('type', getItemOptionTypeValue(resolvedTypeKey));

                            if (!isEmpty(v.default_value)) {
                                variable.setValue('default_value', toStr(v.default_value));
                            }

                            if (trim(v.type).toLowerCase() === 'reference' && !isEmpty(v.reference_table)) {
                                variable.setValue('reference', toStr(v.reference_table));
                                if (!isEmpty(v.reference_qualifier)) {
                                    variable.setValue('reference_qual', toStr(v.reference_qualifier));
                                }
                            }

                            var varSysId = variable.insert();
                            if (!varSysId) {
                                throw 'Variable failed to create: ' + v.variable_name;
                            }

                            created.createdVariableIds.push(varSysId);
                            created.createdRefs.push({ table: 'item_option_new', sys_id: varSysId });
                            created.variableCount++;

                            if (trim(v.type).toLowerCase() === 'select_box' && Array.isArray(v.choices)) {
                                for (var c = 0; c < v.choices.length; c++) {
                                    var choice = v.choices[c] || {};
                                    var qc = new GlideRecord('question_choice');
                                    qc.initialize();
                                    qc.setValue('question', varSysId);
                                    qc.setValue('value', trim(choice.value));
                                    qc.setValue('text', trim(choice.label));
                                    qc.setValue('sequence', parseInt(choice.sequence, 10) || (c + 1));
                                    var qcSysId = qc.insert();
                                    if (!qcSysId) {
                                        throw 'Choice failed to create for variable: ' + v.variable_name;
                                    }
                                    created.createdRefs.push({ table: 'question_choice', sys_id: qcSysId });
                                    created.choiceCount++;
                                }
                            }
                        }

                        return created;
                    }

                    function buildMarkdown(spec, created, ritmSysId) {
                        var lines = [];
                        lines.push('# Generated Catalog Design');
                        lines.push('');
                        lines.push('## Source');
                        lines.push('- RITM: ' + ritmSysId);
                        lines.push('- Skill: ' + SKILL_NAME);
                        lines.push('');
                        lines.push('## Catalog Item');
                        lines.push('- Name: ' + spec.catalog_item.name);
                        lines.push('- Short Description: ' + spec.catalog_item.short_description);
                        lines.push('- Description: ' + spec.catalog_item.description);
                        lines.push('- Active: ' + spec.catalog_item.active);
                        lines.push('- Catalog: ' + spec.catalog_item.catalog_name);
                        lines.push('- Category: ' + spec.catalog_item.category_name);
                        lines.push('- Created Item Sys ID: ' + created.itemSysId);
                        lines.push('');
                        lines.push('## Variables');
                        for (var i = 0; i < spec.variables.length; i++) {
                            var v = spec.variables[i];
                            lines.push('### ' + v.variable_name);
                            lines.push('- Question: ' + v.question);
                            lines.push('- Type: ' + v.type);
                            lines.push('- Mandatory: ' + v.mandatory);
                            lines.push('- Order: ' + v.order);
                            lines.push('- Default Value: ' + toStr(v.default_value));
                            lines.push('- Reference Table: ' + toStr(v.reference_table));
                            if (Array.isArray(v.choices) && v.choices.length > 0) {
                                lines.push('- Choices:');
                                for (var c = 0; c < v.choices.length; c++) {
                                    var ch = v.choices[c] || {};
                                    lines.push('  - ' + toStr(ch.value) + ' => ' + toStr(ch.label));
                                }
                            }
                            lines.push('');
                        }
                        if (spec.warnings.length > 0) {
                            lines.push('## Warnings');
                            for (var w = 0; w < spec.warnings.length; w++) lines.push('- ' + spec.warnings[w]);
                            lines.push('');
                        }
                        if (spec.errors.length > 0) {
                            lines.push('## Errors');
                            for (var e = 0; e < spec.errors.length; e++) lines.push('- ' + spec.errors[e]);
                        }
                        return lines.join('\\n');
                    }

                    function fluentType(v) {
                        var map = {
                            single_line_text: 'SingleLineTextVariable',
                            multi_line_text: 'MultiLineTextVariable',
                            reference: 'ReferenceVariable',
                            select_box: 'SelectBoxVariable',
                            yes_no: 'YesNoVariable',
                        };
                        return map[trim(v.type).toLowerCase()] || 'SingleLineTextVariable';
                    }

                    function buildFluentSource(spec) {
                        var lines = [];
                        var slug = trim(spec.catalog_item.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        if (isEmpty(slug)) {
                            slug = 'generated-catalog-item';
                        }
                        var generatedIdKey = 'generated-' + slug;

                        var typeSet = {
                            CatalogItem: true,
                        };
                        for (var i = 0; i < spec.variables.length; i++) {
                            typeSet[fluentType(spec.variables[i])] = true;
                        }

                        var imports = [];
                        for (var k in typeSet) {
                            if (typeSet.hasOwnProperty(k)) imports.push(k);
                        }
                        imports.sort();

                        lines.push("import { " + imports.join(', ') + " } from '@servicenow/sdk/core'");
                        lines.push('');
                        lines.push('export const generatedCatalogItem = CatalogItem({');
                        lines.push("    $id: Now.ID['" + generatedIdKey + "'],");
                        lines.push("    name: '" + spec.catalog_item.name.replace(/'/g, "\\'") + "',");
                        lines.push("    shortDescription: '" + spec.catalog_item.short_description.replace(/'/g, "\\'") + "',");
                        lines.push("    description: '" + spec.catalog_item.description.replace(/'/g, "\\'") + "',");
                        lines.push("    accessType: 'delegated',");
                        lines.push('    active: ' + (spec.catalog_item.active ? 'true' : 'false') + ',');
                        lines.push("    requestMethod: 'order',");
                        lines.push("    availability: 'both',");
                        lines.push('');
                        lines.push("    catalogs: [Now.ref('sc_catalog', { title: '" + spec.catalog_item.catalog_name.replace(/'/g, "\\'") + "' })],");
                        lines.push("    categories: [Now.ref('sc_category', { title: '" + spec.catalog_item.category_name.replace(/'/g, "\\'") + "' })],");
                        lines.push('');
                        lines.push('    variables: {');

                        for (var vIndex = 0; vIndex < spec.variables.length; vIndex++) {
                            var v = spec.variables[vIndex];
                            var fType = fluentType(v);
                            lines.push('        ' + v.variable_name + ': ' + fType + '({');
                            lines.push("            question: '" + toStr(v.question).replace(/'/g, "\\'") + "',");
                            lines.push('            mandatory: ' + (toBoolean(v.mandatory) ? 'true' : 'false') + ',');
                            lines.push('            order: ' + parseInt(v.order, 10) + ',');
                            if (!isEmpty(v.default_value)) {
                                lines.push("            defaultValue: '" + toStr(v.default_value).replace(/'/g, "\\'") + "',");
                            }
                            if (trim(v.type).toLowerCase() === 'reference' && !isEmpty(v.reference_table)) {
                                lines.push("            referenceTable: '" + toStr(v.reference_table).replace(/'/g, "\\'") + "',");
                            }
                            if (trim(v.type).toLowerCase() === 'select_box' && Array.isArray(v.choices)) {
                                lines.push('            choices: {');
                                for (var chIndex = 0; chIndex < v.choices.length; chIndex++) {
                                    var ch = v.choices[chIndex] || {};
                                    lines.push(
                                        "                " + toStr(ch.value).replace(/[^a-zA-Z0-9_]/g, '_')
                                        + ": { label: '" + toStr(ch.label).replace(/'/g, "\\'") + "', sequence: "
                                        + (parseInt(ch.sequence, 10) || (chIndex + 1)) + ' },'
                                    );
                                }
                                lines.push('            },');
                                lines.push('            includeNone: false,');
                            }
                            lines.push('        }),');
                        }

                        lines.push('    },');
                        lines.push('})');
                        return lines.join('\\n');
                    }

                    function attachContent(ritmRecord, fileName, contentType, content) {
                        var gsa = new GlideSysAttachment();
                        var attachmentSysId = gsa.write(ritmRecord, fileName, contentType, content);
                        if (!attachmentSysId) {
                            throw 'Failed to create attachment: ' + fileName;
                        }
                        return attachmentSysId;
                    }

                    try {
                        var created = null;
                        var ritmSysId = resolveRitmSysId();
                        if (isEmpty(ritmSysId)) {
                            return 'ICS Form Generator failed: unable to resolve trigger RITM sys_id.';
                        }

                        var ritm = new GlideRecord('sc_req_item');
                        if (!ritm.get(ritmSysId)) {
                            return 'ICS Form Generator failed: RITM not found for sys_id=' + ritmSysId;
                        }

                        var stateCfg = getRitmStateValues();

                        var docxAttachment = findDocxAttachment(ritmSysId);
                        if (!docxAttachment) {
                            closeRitm(
                                ritm,
                                stateCfg.failureState,
                                stateCfg.failureStage,
                                'DOCX extraction result: no DOCX attachment found on RITM.\\nSkill invocation skipped.'
                            );
                            return 'ICS Form Generator failed: DOCX attachment not found.';
                        }

                        var extraction = extractDocxContent(docxAttachment);
                        if (!extraction.capabilityAvailable) {
                            closeRitm(
                                ritm,
                                stateCfg.failureState,
                                stateCfg.failureStage,
                                'DOCX extraction result: failed.\\nReason: ' + extraction.detail
                            );
                            return 'ICS Form Generator failed: ' + extraction.detail;
                        }

                        if (isEmpty(extraction.documentText)) {
                            closeRitm(
                                ritm,
                                stateCfg.failureState,
                                stateCfg.failureStage,
                                'DOCX extraction result: succeeded but no readable document text was produced.'
                            );
                            return 'ICS Form Generator failed: extracted DOCX text is empty.';
                        }

                        var readiness = getSkillReadiness();
                        if (
                            !readiness.skillExists
                            || !readiness.skillActivePublished
                            || !readiness.aiProviderConfigured
                            || !readiness.modelConfigured
                            || !readiness.requiredSkillInputsPresent
                            || !readiness.requiredSkillOutputPresent
                            || !readiness.invocationConfigPresent
                        ) {
                            closeRitm(
                                ritm,
                                stateCfg.failureState,
                                stateCfg.failureStage,
                                'DOCX extraction result: success.\\n'
                                + 'skill name: ' + SKILL_NAME + '\\n'
                                + 'skill readiness result: failed\\n'
                                + 'readiness details: ' + readiness.messages.join(' | ')
                            );
                            return 'ICS Form Generator failed: skill readiness checks did not pass.';
                        }

                        var requestedItemStatus = trim(ritm.getDisplayValue('state')) || 'Requested';
                        var optionalPrefix = 'Generated - ';
                        var additionalInstructions =
                            'Return strict JSON only. Do not invent sys_ids, catalogs, categories, or reference tables. If unknown, use warnings/errors.';

                        var controlledTestResult = invokeSkill(
                            readiness.capabilityId,
                            'Catalog Item Name: Controlled Test Item\\nShort Description: Controlled test\\nDescription: Controlled test description\\nCatalog: Service Catalogue\\nCategory: IT for IT\\nVariable: requested_for (reference sys_user)',
                            requestedItemStatus,
                            optionalPrefix,
                            additionalInstructions
                        );

                        if (!controlledTestResult.ok) {
                            closeRitm(
                                ritm,
                                stateCfg.failureState,
                                stateCfg.failureStage,
                                'DOCX extraction result: success.\\n'
                                + 'skill name: ' + SKILL_NAME + '\\n'
                                + 'skill readiness result: passed\\n'
                                + 'controlled skill test result: failed\\n'
                                + 'error: ' + controlledTestResult.message
                            );
                            return 'ICS Form Generator failed: controlled skill test failed.';
                        }

                        var controlledValidation = validateSpec(controlledTestResult.parsedJson);
                        if (!controlledValidation.valid) {
                            closeRitm(
                                ritm,
                                stateCfg.failureState,
                                stateCfg.failureStage,
                                'DOCX extraction result: success.\\n'
                                + 'skill name: ' + SKILL_NAME + '\\n'
                                + 'skill readiness result: passed\\n'
                                + 'controlled skill test result: invalid schema\\n'
                                + 'errors: ' + controlledValidation.errors.join(' | ')
                            );
                            return 'ICS Form Generator failed: controlled skill test output schema invalid.';
                        }

                        var skillResult = invokeSkill(
                            readiness.capabilityId,
                            extraction.documentText,
                            requestedItemStatus,
                            optionalPrefix,
                            additionalInstructions
                        );

                        if (!skillResult.ok) {
                            closeRitm(
                                ritm,
                                stateCfg.failureState,
                                stateCfg.failureStage,
                                'DOCX extraction result: success.\\n'
                                + 'skill name: ' + SKILL_NAME + '\\n'
                                + 'skill readiness result: passed\\n'
                                + 'skill invocation result: failed\\n'
                                + 'error: ' + skillResult.message
                            );
                            return 'ICS Form Generator failed: skill invocation failed.';
                        }

                        var validation = validateSpec(skillResult.parsedJson);
                        if (!validation.valid) {
                            closeRitm(
                                ritm,
                                stateCfg.failureState,
                                stateCfg.failureStage,
                                'DOCX extraction result: success.\\n'
                                + 'skill name: ' + SKILL_NAME + '\\n'
                                + 'skill readiness result: passed\\n'
                                + 'skill invocation result: success\\n'
                                + 'validation result: failed\\n'
                                + 'validation errors: ' + validation.errors.join(' | ')
                            );
                            return 'ICS Form Generator failed: validation failed.';
                        }

                        var spec = validation.normalized;

                        var catalogResult = findActiveCatalogByName(spec.catalog_item.catalog_name);
                        if (catalogResult.status === 'none') {
                            throw 'Catalog not found or inactive: ' + spec.catalog_item.catalog_name;
                        }
                        if (catalogResult.status === 'multiple') {
                            throw 'Multiple active catalogs found for name: ' + spec.catalog_item.catalog_name;
                        }
                        var catalog = catalogResult.record;

                        var categoryResult = findActiveCategoryByName(spec.catalog_item.category_name);
                        if (categoryResult.status === 'none') {
                            throw 'Category not found or inactive: ' + spec.catalog_item.category_name;
                        }
                        if (categoryResult.status === 'multiple') {
                            throw 'Multiple active categories found for name: ' + spec.catalog_item.category_name;
                        }
                        var category = categoryResult.record;

                        if (!validateCategoryInCatalog(category.getUniqueValue(), catalog.getUniqueValue())) {
                            throw 'Category does not belong to specified catalog.';
                        }

                        for (var tv = 0; tv < spec.variables.length; tv++) {
                            var variableDef = spec.variables[tv];
                            if (trim(variableDef.type).toLowerCase() === 'reference' && !tableExists(trim(variableDef.reference_table))) {
                                throw 'Reference table does not exist: ' + trim(variableDef.reference_table);
                            }
                        }

                        var activateRequested = isActivationRequested(ritmSysId);
                        created = createGeneratedItem(
                            spec,
                            ritmSysId,
                            catalog.getUniqueValue(),
                            category.getUniqueValue(),
                            activateRequested
                        );

                        var markdown = buildMarkdown(spec, created, ritmSysId);
                        var fluentSource = buildFluentSource(spec);
                        attachContent(ritm, GENERATED_MARKDOWN_FILE, 'text/markdown', markdown);
                        attachContent(ritm, GENERATED_FLUENT_FILE, 'text/plain', fluentSource);

                        var itemUrl = gs.getProperty('glide.servlet.uri') + 'sc_cat_item.do?sys_id=' + created.itemSysId;
                        var workNotes = [
                            'DOCX extraction result: success',
                            'skill name: ' + SKILL_NAME,
                            'skill readiness result: passed',
                            'controlled skill test result: passed',
                            'skill invocation result: success (' + skillResult.source + ')',
                            'validation result: passed',
                            'generated catalog item name: ' + created.itemName,
                            'generated catalog item sys_id: ' + created.itemSysId,
                            'generated catalog item URL: ' + itemUrl,
                            'variable count: ' + created.variableCount,
                            'choice count: ' + created.choiceCount,
                            'generated attachment names: ' + GENERATED_MARKDOWN_FILE + ', ' + GENERATED_FLUENT_FILE,
                        ].join('\\n');

                        if (created.incomplete) {
                            workNotes += '\\nwarning: partial variable creation occurred; generated item left inactive for review.';
                        }

                        closeRitm(ritm, stateCfg.successState, stateCfg.successStage, workNotes);
                        return 'ICS Form Generator completed successfully. Item sys_id=' + created.itemSysId;
                    } catch (e) {
                        var errMsg = toStr(e && e.message ? e.message : e);
                        try {
                            if (created && created.createdRefs && created.createdRefs.length > 0) {
                                cleanupCreatedRecords(created.createdRefs);
                            }
                            var fallbackRitmId = resolveRitmSysId();
                            if (!isEmpty(fallbackRitmId)) {
                                var ritmFallback = new GlideRecord('sc_req_item');
                                if (ritmFallback.get(fallbackRitmId)) {
                                    var stateFallback = getRitmStateValues();
                                    closeRitm(
                                        ritmFallback,
                                        stateFallback.failureState,
                                        stateFallback.failureStage,
                                        'ICS Form Generator failure: ' + errMsg
                                    );
                                }
                            }
                        } catch (ignoreClose) {}

                        return 'ICS Form Generator failed with error: ' + errMsg;
                    }
                })()`),
            }
        )
    }
)
