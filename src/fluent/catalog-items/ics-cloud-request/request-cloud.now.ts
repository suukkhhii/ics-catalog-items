import {
    CatalogItem,
    RequestedForVariable,
    SelectBoxVariable,
    SingleLineTextVariable,
} from '@servicenow/sdk/core'

export const icsCloudRequest = CatalogItem({
    $id: Now.ID['ics-cloud-request'],
    name: 'ICS Cloud Request',
    shortDescription: 'Request for ICS Cloud Infra',
    description: 'Request for ICS Cloud Infra, here. This will go through approval process though.',
    accessType: 'delegated',
    active: true,
    requestMethod: 'order',
    availability: 'both',
    flow: Now.ref('sys_hub_flow', 'ics-cloud-request-fulfillment-flow'),

    owner: Now.ref('sys_user', { name: 'Abel Tuter' }),
    catalogs: [Now.ref('sc_catalog', 'e0d08b13c3330100c8b837659bba8fb4')],
    categories: [Now.ref('sc_category', '0461fc66974c3d948ed23d46f053af72')],

    variables: {
        requested_for: RequestedForVariable({
            question: 'Requested For',
            mandatory: true,
            order: 100,
        }),
        email_id: SingleLineTextVariable({
            question: 'Email id',
            mandatory: false,
            order: 200,
        }),
        cloud_platform: SelectBoxVariable({
            question: 'Cloud Platform',
            mandatory: true,
            order: 300,
            choices: {
                aws: { label: 'AWS', sequence: 1 },
                gcp: { label: 'GCP', sequence: 2 },
                azure: { label: 'Azure', sequence: 3 },
            },
            includeNone: false,
        }),
    },
})
