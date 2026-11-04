import { NowAssistSkillConfig } from '@servicenow/sdk/core'

export const icsCatalogDesignInterpreterSkill = NowAssistSkillConfig(
    {
        $id: Now.ID['ics_catalog_design_interpreter_skill'],
        name: 'ICS Catalog Design Interpreter',
        description:
            'Interprets extracted catalog design text and returns a governed JSON specification for catalog item generation.',
        shortDescription: 'Interpret catalog design text into structured JSON specification',
        inputs: [
            {
                $id: Now.ID['ics_catalog_design_interpreter_document_text_input'],
                name: 'document text',
                mandatory: true,
                dataType: 'string',
                testValues:
                    'Catalog Item Name: Example Access Request\nShort Description: Example\nDescription: Example detailed description\nVariables: requested_for, business_reason',
            },
            {
                $id: Now.ID['ics_catalog_design_interpreter_additional_instructions_input'],
                name: 'additional instructions',
                mandatory: false,
                dataType: 'string',
                testValues: 'Prefer concise variable questions and preserve explicit ordering from source.',
            },
            {
                $id: Now.ID['ics_catalog_design_interpreter_requested_item_status_input'],
                name: 'requested item status',
                mandatory: true,
                dataType: 'string',
                testValues: 'Requested',
            },
            {
                $id: Now.ID['ics_catalog_design_interpreter_optional_name_prefix_input'],
                name: 'optional name prefix',
                mandatory: false,
                dataType: 'string',
                testValues: 'Generated - ',
            },
        ],
        outputs: [
            {
                $id: Now.ID['ics_catalog_design_interpreter_catalog_specification_json_output'],
                name: 'catalog specification json',
                dataType: 'string',
                description:
                    'Strict JSON catalog specification containing item metadata, variables, choices, warnings, and errors.',
            },
        ],
        securityControls: {
            userAccess: {
                $id: Now.ID['ics_catalog_design_interpreter_user_access'],
                type: 'authenticated',
            },
            roleMap: ['admin'],
        },
        deploymentSettings: {
            flowAction: true,
        },
    },
    {
        providers: [
            {
                provider: 'Now LLM Service',
                prompts: [
                    {
                                                name: 'InterpretCatalogDesign',
                        versions: [
                            {
                                                                $id: Now.ID['ics_catalog_design_interpreter_prompt_v1'],
                                model: 'llm_generic_small_v2',
                                promptState: 'draft',
                                                                prompt: p => `You are a governed ServiceNow catalog design interpreter.

Use only the provided input content:
                                - document_text: ${p.input['document text']}
                                - additional_instructions: ${p.input['additional instructions']}
                                - requested_item_status: ${p.input['requested item status']}
                                - optional_name_prefix: ${p.input['optional name prefix']}

Return valid JSON only. Do not include markdown, prose, or code fences.

Required JSON schema:
{
    "catalog_item": {
        "name": "string",
        "short_description": "string",
        "description": "string",
        "active": false,
        "catalog_name": "string",
        "category_name": "string"
    },
    "variables": [
        {
            "variable_name": "string",
            "question": "string",
            "type": "string",
            "mandatory": true,
            "order": 100,
            "default_value": "string",
            "reference_table": "string|null",
            "choices": [
                {
                    "value": "string",
                    "label": "string",
                    "sequence": 1
                }
            ]
        }
    ],
    "warnings": ["string"],
    "errors": ["string"]
}

Rules:
1) Do not invent sys_ids.
2) Do not invent catalogs, categories, reference tables, groups, roles, scripts, flows, approvals, ACLs, or integrations.
3) If information is missing, add a clear message in warnings or errors instead of fabricating values.
4) Limit variables to 50 maximum.
5) Keep variable names and orders unique.
6) Output must be deterministic and JSON-parseable.
7) Always include warnings and errors arrays (can be empty).`,
                            },
                        ],
                    },
                ],
            },
        ],
    }
)
