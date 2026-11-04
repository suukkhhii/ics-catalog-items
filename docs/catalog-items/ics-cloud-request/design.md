# ICS Cloud Request - Design

## Item Details
- Name: ICS Cloud Request
- Owner: Abel Tuter
- Short Description: Request for ICS Cloud Infra
- Description: Request for ICS Cloud Infra, here. This will go through approval process though.
- Catalog: Service Catalog
- Catalog sys_id: e0d08b13c3330100c8b837659bba8fb4
- Category: IT for IT
- Category sys_id: 0461fc66974c3d948ed23d46f053af72
- Key: ics-cloud-request
- Access Type: delegated

## Source Structure
- Deployable item definition (Fluent): src/fluent/catalog-items/ics-cloud-request/request-cloud.now.ts
- Deployable workflow definition (Fluent): src/fluent/flows/ics-cloud-request-fulfillment-flow.now.ts
- Deployable catalog client scripts (Fluent): src/fluent/catalog-client-scripts/ics-cloud-request-client-scripts.now.ts
- Client script source: src/client/catalog-items/ics-cloud-request/
- Documentation: docs/catalog-items/ics-cloud-request/

## Variables
1. Requested For
   - Type: reference
   - Reference table: sys_user
   - Name: requested_for

2. Email id
   - Type: single line text
   - Name: email_id
   - Behavior: disabled/read-only on form
   - Data source: auto-populated from selected `requested_for.email`

3. Cloud Platform
   - Type: dropdown
   - Name: cloud_platform
   - Choices:
     - AWS
     - GCP
     - Azure

## Workflow
- Trigger: catalog request submitted
- Approval: line manager of `requested_for`
- If approved: close RITM
- If rejected: cancel RITM

Implemented flow behavior:
- Approval action: manager approval from `requested_for.manager`
- Approved branch: update `sc_req_item` to closed state (`state=3`, `stage=complete`)
- Rejected branch: update `sc_req_item` to cancelled state (`state=4`, `stage=cancelled`)

## Client-Side Behavior
- `email_id` is always read-only.
- On load, if `requested_for` is populated, `email_id` is populated from selected user's email.
- On change of `requested_for`, `email_id` is auto-populated from selected user's email.
- If `requested_for` is cleared, `email_id` is cleared.

## Implementation Status
- Stage 1 - Fluent Catalog Item: Completed
- Stage 2 - Client Behavior: Completed
- Stage 3 - Fulfillment Flow: Completed
- Stage 4 - Association + Validation: In progress (runtime validation pending in instance)

## Validation Checklist
- Item appears in Service Catalogue > IT for IT.
- `email_id` is read-only.
- `email_id` updates when `requested_for` changes.
- Approval goes to line manager of selected `requested_for`.
- Approved request closes RITM.
- Rejected request cancels RITM.

## Build, Deploy, Execution Runbook

### Build
- Run `npm run build` after every source change.
- Confirm build success before deploy.
- Verify relevant generated update records in `dist/app/update/`:
   - `sc_cat_item`
   - `item_option_new`
   - `catalog_script_client`
   - `sys_hub_flow`

### Deploy
- Run `npm run deploy` after successful build.
- Confirm terminal exit code is 0.
- Re-open catalog item in instance and verify:
   - Catalog/Category
   - Flow association
   - Variable list

### Execution Validation
- Test with multiple `requested_for` users.
- Verify `email_id` read-only and auto-population behavior.
- Verify approval goes to selected user's line manager.
- Verify approved path closes RITM.
- Verify rejected path cancels RITM.
- Verify no cross-scope blockers in `sys_restricted_caller_access`.

## Lessons Learned for Future Catalog Items
- Use explicit sys_ids for catalog/category references when environment naming is inconsistent.
- Configure `accessType` deliberately (`delegated` for request-on-behalf use cases).
- Implement variable population behavior through catalog client scripts (onLoad/onChange) for deterministic UX.
- Keep flow logic explicit for approval outcomes; do not rely on implicit default state transitions.
- Always validate generated artifacts in `dist/app/update/` when instance behavior differs from expectation.
