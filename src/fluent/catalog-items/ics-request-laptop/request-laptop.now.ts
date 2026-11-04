import {
    CatalogItem,
    MultiLineTextVariable,
    RequestedForVariable,
    SingleLineTextVariable,
} from '@servicenow/sdk/core'

/**
 * Deployable ServiceNow Fluent definition for the catalog item.
 * This is the source that now-sdk build/install can package and deploy.
 */
export const icsRequestLaptop = CatalogItem({
    $id: Now.ID['ics-request-laptop'],
    name: 'ICS Request Laptop',
    shortDescription: 'Request laptop for Cloud Domain.',
    description: 'Request laptop for Cloud Domain. Please note you need approval.',
    accessType: 'delegated',
    availableFor: [],
    notAvailableFor: [],
    active: true,
    requestMethod: 'order',
    availability: 'both',
    flow: Now.ref('sys_hub_flow', 'ics-request-laptop-fulfillment-flow'),

    // Use existing instance records for placement in catalog navigation.
    // Verify titles in instance; if names differ, update these references.
    catalogs: [Now.ref('sc_catalog', 'e0d08b13c3330100c8b837659bba8fb4')],
    categories: [Now.ref('sc_category', '0461fc66974c3d948ed23d46f053af72')],

    variables: {
        requested_for: RequestedForVariable({
            question: 'Requested For',
            mandatory: true,
            order: 100,
        }),
        first_name: SingleLineTextVariable({
            question: 'First Name',
            mandatory: true,
            order: 200,
        }),
        reason: MultiLineTextVariable({
            question: 'Reason',
            mandatory: true,
            order: 300,
        }),
    },
})
