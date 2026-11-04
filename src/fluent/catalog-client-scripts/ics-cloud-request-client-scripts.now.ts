import { CatalogClientScript } from '@servicenow/sdk/core'
import { icsCloudRequest } from '../catalog-items/ics-cloud-request/request-cloud.now'

CatalogClientScript({
    $id: Now.ID['ics-cloud-request-email-id-onload'],
    name: 'ICS Cloud Request - Email id OnLoad',
    type: 'onLoad',
    catalogItem: icsCloudRequest,
    script: Now.include('../../client/catalog-items/ics-cloud-request/email-id-onload.js'),
    active: true,
    appliesOnCatalogItemView: true,
})

CatalogClientScript({
    $id: Now.ID['ics-cloud-request-email-id-onchange-requested-for'],
    name: 'ICS Cloud Request - Email id From Requested For',
    type: 'onChange',
    catalogItem: icsCloudRequest,
    variableName: icsCloudRequest.variables.requested_for,
    script: Now.include('../../client/catalog-items/ics-cloud-request/email-id-onchange-requested-for.js'),
    active: true,
    appliesOnCatalogItemView: true,
})
