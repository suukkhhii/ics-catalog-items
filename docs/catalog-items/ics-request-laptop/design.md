# ICS Request Laptop - Design

## Item Details
- Name: ICS Request Laptop
- Summary: Request laptop for Cloud Domain.
- Description: Request laptop for Cloud Domain. Please note you need approval.
- Owner: Abel Tuter
- Catalog: Service Catalog
- Catalog sys_id: e0d08b13c3330100c8b837659bba8fb4
- Category: IT for IT
- Category sys_id: 0461fc66974c3d948ed23d46f053af72
- Key: ics-request-laptop
- Access Type: delegated
- Visibility: open to all users (no allow/deny user-criteria restrictions in source)

## Source Structure
- Deployable item definition (Fluent): src/fluent/catalog-items/ics-request-laptop/request-laptop.now.ts
- Deployable workflow definition (Fluent): src/fluent/flows/ics-request-laptop-fulfillment-flow.now.ts
- Deployable catalog client scripts (Fluent): src/fluent/catalog-client-scripts/ics-request-laptop-client-scripts.now.ts
- Client script source: src/client/catalog-items/ics-request-laptop/
- Design/config scaffolding: src/catalog-items/ics-request-laptop/
- Documentation: docs/catalog-items/ics-request-laptop/
- Icon asset: src/catalog-items/ics-request-laptop/assets/icons/ics-request-laptop.svg

## Variables
- Requested For (reference: sys_user)
- First Name (single line text)
- Reason (multi line text)

## Client-Side Behavior
- On load, `first_name` defaults to logged-in user's first name when field is empty.
- On change of `requested_for`, `first_name` is auto-populated from selected user's `first_name`.
- Implemented with catalog client scripts:
	- `ICS Request Laptop - First Name Default OnLoad`
	- `ICS Request Laptop - First Name From Requested For`

## Request-on-behalf Behavior
- Users can request on behalf of other users via `requested_for`.
- Item uses `accessType: 'delegated'` to avoid the "Item is unavailable for this user" behavior during valid request-on-behalf usage.

## Workflow
- Approval type: Line manager approval
- Approval source: Manager of `requested_for`
- On approval: Create catalog task assigned to group `BUS-AU-Aurora Technology Risk`
- Workflow association is implemented from catalog item via `flow: Now.ref('sys_hub_flow', 'ics-request-laptop-fulfillment-flow')`

## Catalog Task Details
- Short description: Process ICS Request Laptop fulfillment
- Description: Fulfill approved laptop request for Cloud Domain user.
- Assignment group: BUS-AU-Aurora Technology Risk
- Priority: 3 - Moderate

## Notifications
- Request Submitted
- Approval Requested (to line manager)
- Approval Approved
- Approval Rejected
- Catalog Task Created (to assignment group)

## ATF Coverage
- Approval and task creation path
- Rejection path (no catalog task expected)

## Deployment
- Mapping and validation checklist: `docs/catalog-items/ics-request-laptop/deployment-mapping.md`
- Instance build checklist: `docs/catalog-items/ics-request-laptop/instance-build-checklist.md`

## Notes
- The icon has been added as an SVG asset based on the provided image style.
- This item is fully isolated to support future independent updates.
