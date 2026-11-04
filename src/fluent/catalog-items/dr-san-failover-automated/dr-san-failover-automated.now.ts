import {
    CatalogItem,
    MultiLineTextVariable,
    ReferenceVariable,
    RequestedForVariable,
    SelectBoxVariable,
    SingleLineTextVariable,
} from '@servicenow/sdk/core'

export const drSanFailoverAutomated = CatalogItem({
    $id: Now.ID['dr-san-failover-automated'],
    name: 'Disaster Recovery SAN Failover [Automated]',
    shortDescription:
        'The SAN DR failover capability provides a controlled, auditable, and automated method for teams to trigger storage failovers without manual intervention from the storage team.',
    description:
        'This automated DR failover capability delivers a safe and controlled self-service process with full visibility through ServiceNow and storage-driven validation for reliable disaster recovery operations.',
    accessType: 'delegated',
    active: true,
    requestMethod: 'order',
    availability: 'both',
    owner: Now.ref('sys_user', { name: 'Con Kagiaros' }),
    flow: Now.ref('sys_hub_flow', 'dr-san-failover-automated-fulfillment-flow'),

    // Provided by requirement text. Update to explicit sys_ids later if needed.
    catalogs: [Now.ref('sc_catalog', { title: 'Technology' })],
    categories: [Now.ref('sc_category', { title: 'Infrastructure Support' })],

    variables: {
        requested_for: RequestedForVariable({
            question: 'Requested for',
            mandatory: true,
            order: 100,
        }),
        requestor_anz_email: SingleLineTextVariable({
            question: 'Requestor ANZ Email',
            order: 200,
        }),
        requestor_role: SingleLineTextVariable({
            question: 'Requestor Role',
            order: 300,
        }),
        requestor_department: SingleLineTextVariable({
            question: 'Requestor Department',
            order: 400,
        }),
        request_summary: SingleLineTextVariable({
            question: 'Request Summary',
            mandatory: true,
            order: 500,
        }),
        request_description: MultiLineTextVariable({
            question: 'Request Description',
            mandatory: true,
            order: 600,
        }),
        requestor_domain: SelectBoxVariable({
            question: 'Requestor Divisional & Enterprise Domains',
            mandatory: true,
            order: 700,
            includeNone: true,
            choices: {
                to_be_defined: { label: 'To be defined', sequence: 1 },
            },
        }),
        sub_domain: SelectBoxVariable({
            question: 'Sub Domain',
            mandatory: true,
            order: 800,
            includeNone: true,
            choices: {
                to_be_defined: { label: 'To be defined', sequence: 1 },
            },
        }),
        business_application: ReferenceVariable({
            question: 'Please select Business Application',
            referenceTable: 'cmdb_ci_business_app',
            mandatory: true,
            order: 900,
        }),
        apm_id: SingleLineTextVariable({
            question: 'APM ID',
            order: 1000,
        }),
        is_project_funded: SelectBoxVariable({
            question: 'Is this a funded Project?',
            mandatory: true,
            order: 1100,
            includeNone: false,
            choices: {
                yes: { label: 'Yes', sequence: 1 },
                no: { label: 'No', sequence: 2 },
            },
        }),
        project_name: ReferenceVariable({
            question: 'Name of the Project',
            referenceTable: 'pm_project',
            order: 1200,
        }),
        ppm_id: SingleLineTextVariable({
            question: 'PPM ID',
            order: 1300,
        }),
        active_theme_admin_details: SingleLineTextVariable({
            question: 'Details of Active Theme Administrator/s against the selected Project',
            order: 1400,
        }),
        cost_center_type: SelectBoxVariable({
            question: 'Cost Center (BSBCC/Other)',
            mandatory: true,
            order: 1500,
            includeNone: false,
            choices: {
                bsb_cc: { label: 'BSB/CC', sequence: 1 },
                other: { label: 'Other', sequence: 2 },
            },
        }),
        bsb_cc: ReferenceVariable({
            question: 'BSB/CC',
            referenceTable: 'cmn_cost_center',
            order: 1600,
        }),
        other_cost_center: SingleLineTextVariable({
            question: 'Other',
            order: 1700,
        }),
        hyperv_cluster_name: SingleLineTextVariable({
            question: 'HyperV Cluster Name',
            mandatory: true,
            order: 1800,
        }),
        application_name_replication_group: SingleLineTextVariable({
            question: 'Application Name/Replication Group',
            mandatory: true,
            order: 1900,
        }),
        change_record: ReferenceVariable({
            question: 'Change Record',
            referenceTable: 'change_request',
            mandatory: true,
            order: 2000,
            referenceQualCondition: 'active=true',
        }),
    },
})
