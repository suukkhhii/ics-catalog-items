# ICS Request Laptop - Deployment Mapping

## Purpose
This document maps the local item artifacts to ServiceNow target records for application update execution.

## Scope
- Catalog item: ICS Request Laptop
- Key: `ics-request-laptop`
- Scope: `x_anzb_ics_cat`

## Source-to-Target Mapping

### 1) Catalog Item
- Source: `src/fluent/catalog-items/ics-request-laptop/request-laptop.now.ts`
- Target table: `sc_cat_item`
- Key fields:
  - `name` = ICS Request Laptop
  - `short_description` = Request laptop for Cloud Domain.
  - `description` = Request laptop for Cloud Domain. Please note you need approval.
  - `catalog` = Service Catalogue
  - `category` = IT for IT
  - `flow_designer_flow` = ICS Request Laptop - Fulfillment Flow
  - `icon` = local SVG asset path

### 2) Variables
- Source: `src/fluent/catalog-items/ics-request-laptop/request-laptop.now.ts`
- Target table: `item_option_new`
- Mappings:
  - `requested_for` -> Reference (`sys_user`)
  - `first_name` -> Single Line Text
  - `reason` -> Multi Line Text

### 3) Workflow / Approval / Catalog Task
- Source: `src/fluent/flows/ics-request-laptop-fulfillment-flow.now.ts`
- Target implementation: Flow Designer objects
- Target tables (platform-managed):
  - `sys_hub_flow`
  - related flow action/step records
- Expected behavior:
  1. Trigger on request submission.
  2. Resolve line manager from `requested_for`.
  3. Create approval record for resolved manager.
  4. On approval, create catalog task assigned to `BUS-AU-Aurora Technology Risk`.

### 4) Catalog Client Scripts
- Source: `src/fluent/catalog-client-scripts/ics-request-laptop-client-scripts.now.ts`
- Script files:
  - `src/client/catalog-items/ics-request-laptop/first-name-onload.js`
  - `src/client/catalog-items/ics-request-laptop/first-name-onchange-requested-for.js`
- Target table: `catalog_script_client`
- Expected behavior:
  - On load: default `first_name` from logged-in user.
  - On change `requested_for`: set `first_name` from selected user's `first_name`.

### 5) Notifications
- Source: Implemented per flow/event strategy
- Target table: `sysevent_email_action` (or notification records used by deployment pipeline)
- Events:
  - request_submitted
  - approval_requested
  - approval_approved
  - approval_rejected
  - catalog_task_created

### 6) Tests
- Source: `src/catalog-items/ics-request-laptop/tests/atf/ics-request-laptop.atf.json`
- Target tables: ATF records (`sys_atf_test`, step tables)

## Deployment Validation Checklist

### Pre-deployment
- [ ] Assignment group `BUS-AU-Aurora Technology Risk` exists in target instance.
- [ ] Users in test set have manager populated on `sys_user`.
- [ ] Catalog `Service Catalogue` exists.
- [ ] Category `IT for IT` exists and is available in the selected catalog.
- [ ] Catalog item visibility is confirmed.

### Cross-scope verification
- [ ] Confirm no unexpected blocked cross-scope operations in `sys_restricted_caller_access` for scope `x_anzb_ics_cat`.
- [ ] Confirm no additional explicit grants are required in `sys_scope_privilege` for this catalog item flow path.
- [ ] If blocked entries exist after runtime testing, approve only required operations and retest.

### Post-deployment functional checks
- [ ] Catalog item is visible and orderable.
- [ ] `requested_for` resolves to `sys_user` records.
- [ ] `first_name` and `reason` are mandatory and save correctly.
- [ ] `first_name` defaults from logged-in user's first name on initial load.
- [ ] Changing `requested_for` auto-populates `first_name` from selected user.
- [ ] Catalog item `flow` field is set to `ICS Request Laptop - Fulfillment Flow`.
- [ ] Approval is routed to line manager of `requested_for`.
- [ ] Approval reject path closes request without catalog task creation.
- [ ] Approval approve path creates catalog task.
- [ ] Catalog task assignment group = `BUS-AU-Aurora Technology Risk`.
- [ ] Notifications fire for all defined events.

### Evidence to capture
- [ ] Request number screenshot (submitted state).
- [ ] Approval record screenshot (pending + decision).
- [ ] Catalog task screenshot with assignment group.
- [ ] Notification/event log evidence.
- [ ] Cross-scope evidence (no blocked calls, or approved grants + retest outcome).

## Rollback Notes
- Disable/deactivate catalog item if critical issue found.
- Deactivate flow and notifications for `ics-request-laptop`.
- Remove test artifacts only if required by release policy.
