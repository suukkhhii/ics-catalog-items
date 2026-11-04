import { AttachmentVariable, CatalogItem, SelectBoxVariable } from '@servicenow/sdk/core'

export const icsFormGenerator = CatalogItem({
    $id: Now.ID['ics-form-generator'],
    name: 'ICS Form Generator',
    shortDescription: 'Please create catalog items',
    description: 'Please create catalog items from scratch.',
    accessType: 'delegated',
    active: true,
    requestMethod: 'order',
    availability: 'both',
    flow: Now.ref('sys_hub_flow', 'ics-form-generator-fulfillment-flow'),

    catalogs: [Now.ref('sc_catalog', 'e0d08b13c3330100c8b837659bba8fb4')],
    categories: [Now.ref('sc_category', '0461fc66974c3d948ed23d46f053af72')],

    variables: {
        attach_your_design_document: AttachmentVariable({
            question: 'Attach your design document',
            mandatory: true,
            order: 100,
        }),
        make_generated_item_active: SelectBoxVariable({
            question: 'Set generated catalog item active?',
            mandatory: true,
            order: 200,
            includeNone: false,
            choices: {
                no: { label: 'No', sequence: 1 },
                yes: { label: 'Yes', sequence: 2 },
            },
        }),
    },
})
