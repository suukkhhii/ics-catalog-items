import { CatalogClientScript } from '@servicenow/sdk/core'
import { drSanFailoverAutomated } from '../catalog-items/dr-san-failover-automated/dr-san-failover-automated.now'

CatalogClientScript({
    $id: Now.ID['dr-san-failover-defaults-onload'],
    name: 'DR SAN Failover - Requestor Defaults OnLoad',
    type: 'onLoad',
    catalogItem: drSanFailoverAutomated,
    script: Now.include('../../client/catalog-items/dr-san-failover-automated/requestor-defaults-onload.js'),
    active: true,
    appliesOnCatalogItemView: true,
})

CatalogClientScript({
    $id: Now.ID['dr-san-failover-apm-ppm-onchange'],
    name: 'DR SAN Failover - APM/PPM Auto Populate',
    type: 'onChange',
    catalogItem: drSanFailoverAutomated,
    variableName: drSanFailoverAutomated.variables.business_application,
    script: Now.include('../../client/catalog-items/dr-san-failover-automated/apm-ppm-onchange.js'),
    active: true,
    appliesOnCatalogItemView: true,
})
