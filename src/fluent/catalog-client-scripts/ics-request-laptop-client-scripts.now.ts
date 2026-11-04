import { CatalogClientScript } from '@servicenow/sdk/core'
import { icsRequestLaptop } from '../catalog-items/ics-request-laptop/request-laptop.now'

CatalogClientScript({
    $id: Now.ID['ics-request-laptop-first-name-onload'],
    name: 'ICS Request Laptop - First Name Default OnLoad',
    type: 'onLoad',
    catalogItem: icsRequestLaptop,
    script: Now.include('../../client/catalog-items/ics-request-laptop/first-name-onload.js'),
    active: true,
    appliesOnCatalogItemView: true,
})

CatalogClientScript({
    $id: Now.ID['ics-request-laptop-first-name-onchange-requested-for'],
    name: 'ICS Request Laptop - First Name From Requested For',
    type: 'onChange',
    catalogItem: icsRequestLaptop,
    variableName: icsRequestLaptop.variables.requested_for,
    script: Now.include('../../client/catalog-items/ics-request-laptop/first-name-onchange-requested-for.js'),
    active: true,
    appliesOnCatalogItemView: true,
})
