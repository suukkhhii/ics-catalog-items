# ICS Catalog Items Design Document

## 1) Purpose
This document defines how catalog item development will be structured so updates remain clean, isolated, and scalable.

Initial scope:
- 1 catalog item: **ICS Request Laptop**

Next approved scope:
- 1 additional catalog item: **ICS Cloud Request**
- 1 additional catalog item: **Disaster Recovery SAN Failover [Automated]**
- 1 additional catalog item: **ICS Form Generator**

Future scope:
- Many additional catalog items, each following the same structure and standards.

## 2) Design Goals
- Keep implementation isolated per catalog item.
- Avoid shared logic unless intentionally placed in a common layer.
- Make updates easy to review, test, and deploy.
- Reduce regression risk when adding or changing catalog items.

## 3) Core Principle: Item-Level Separation
Each catalog item must have its own folder and dedicated artifacts.

For every catalog item, keep these components separate:
- Catalog item definition
- Variables and variable sets
- Catalog client scripts
- UI policies
- Workflows/Flows and subflows
- Approvals and tasks
- Script Includes specific to that item
- Tests and test data
- Documentation and release notes

No cross-item direct dependencies unless explicitly approved and documented.

## 4) Proposed Repository Structure

```
ics-catalog-items/
  docs/
    ics-catalog-items-design-document.md
    catalog-items/
      ics-request-laptop/
        design.md
        release-notes.md
      ics-cloud-request/
        design.md
        release-notes.md
        instance-build-checklist.md
      dr-san-failover-automated/
        design.md
        release-notes.md
      ics-form-generator/
        design.md
        release-notes.md
  src/
    fluent/
      catalog-items/
        ics-request-laptop/
          request-laptop.now.ts
        ics-cloud-request/
          request-cloud.now.ts
        dr-san-failover-automated/
          dr-san-failover-automated.now.ts
        ics-form-generator/
          request-form-generator.now.ts
      catalog-client-scripts/
        ics-request-laptop-client-scripts.now.ts
        ics-cloud-request-client-scripts.now.ts
        dr-san-failover-automated-client-scripts.now.ts
      flows/
        ics-request-laptop-fulfillment-flow.now.ts
        ics-cloud-request-fulfillment-flow.now.ts
        dr-san-failover-automated-fulfillment-flow.now.ts
        ics-form-generator-fulfillment-flow.now.ts
      now-assist-skills/
        ics-form-generator-skill.now.ts
    catalog-items/
      ics-request-laptop/
        (design/config scaffolding and supporting documentation assets)
```

## 5) Naming Conventions
Use deterministic, searchable names.

- Catalog item display name: `ICS Request Laptop`
- Internal key/slug: `ics-request-laptop`
- Prefix all related artifacts: `ICS Request Laptop - <Artifact Name>`

Examples:
- Variable Set: `ICS Request Laptop - Requester Details`
- Flow: `ICS Request Laptop - Fulfillment Flow`
- Script Include: `ICSRequestLaptopHandler`
- Notification: `ICS Request Laptop - Approval Requested`

## 6) ICS Request Laptop - Initial Functional Design

### 6.1 Business Objective
Provide a standard request path for users to request a new laptop with required approval and fulfillment tracking.

### 6.2 Suggested Variables
- Requested For (reference: sys_user)
- First Name (single line text)
- Reason (multi-line text)

### 6.3 Form Behavior
- Mandatory checks for all three variables.
- Ensure `Requested For` points to a valid `sys_user`.
- Default `First Name` from logged-in user on form load when empty.
- Auto-update `First Name` when `Requested For` changes.

### 6.4 Workflow / Flow
Recommended flow stages:
1. Submit request
2. Validate required data
3. Line manager approval (based on `requested_for`)
4. Create catalog task for assignment group `BUS-AU-Aurora Technology Risk`
5. Request closure notification

Implemented using Fluent:
- Catalog item definition: `src/fluent/catalog-items/ics-request-laptop/request-laptop.now.ts`
- Fulfillment flow: `src/fluent/flows/ics-request-laptop-fulfillment-flow.now.ts`
- Association method: catalog item `flow` property via `Now.ref('sys_hub_flow', 'ics-request-laptop-fulfillment-flow')`

Current deployment mapping:
- Catalog (`sc_catalog`) sys_id: `e0d08b13c3330100c8b837659bba8fb4`
- Category (`sc_category`) sys_id: `0461fc66974c3d948ed23d46f053af72`
- Access type: `delegated`
- Visibility intent: open to all users (no user-criteria restrictions configured in source)

### 6.5 Approvals
- Default: requester’s manager approval.
- Optional additional approval based on cost threshold.

### 6.6 Fulfillment Tasks
- Create a catalog task after approval.
- Assign catalog task to `BUS-AU-Aurora Technology Risk`.

### 6.7 Notifications
- Request submitted
- Approval requested
- Approval outcome
- Fulfillment completed

## 7) Shared vs Item-Specific Code Rules

### Allowed shared layer
Only place code in shared/common if it is reusable by 2+ catalog items.

### Required item-specific layer
Keep item-specific logic in the item folder:
- Validation rules
- Variable behavior
- Workflow branching
- Notification templates

Decision rule:
- If logic references `ICS Request Laptop` directly, it must stay in `ics-request-laptop`.

## 8) Update & Release Process
1. Create branch for the catalog item change.
2. Update only the item folder and required shared components.
3. Run build/transform/deploy checks.
4. Execute ATF tests for the affected catalog item.
5. Update item-level release notes.
6. Submit PR with evidence of test results.

## 9) Versioning Strategy
- Semantic version per app release.
- Item-level changelog in:
  - `docs/catalog-items/ics-request-laptop/release-notes.md`

Suggested changelog format:
- Added
- Changed
- Fixed
- Removed

## 10) Quality Gates
Before deployment, each catalog item must pass:
- Fluent build validation
- Script lint/static checks
- ATF happy-path test
- ATF approval-path test
- ATF rejection-path test

## 11) Future Catalog Item Onboarding Template
For each new catalog item:
1. Copy `src/fluent/catalog-items/ics-request-laptop` as a template.
2. Copy/update `src/fluent/flows/ics-request-laptop-fulfillment-flow.now.ts` for item-specific fulfillment.
3. Associate the item with the flow using the catalog item `flow` property.
4. (Optional) Maintain parallel design/config assets under `src/catalog-items/<new-item>/`.
5. Rename folder and artifact names.
6. Replace variables/flows/scripts with item-specific implementation.
7. Add `docs/catalog-items/<new-item>/design.md` and `release-notes.md`.
8. Add tests under that item’s `tests/` folder.

## 12) Open Decisions
- Cost threshold value for second-level approval.
- SLA targets by request priority.

## 13) New Item Intake (Current)

### 13.1 Catalog Item
- Name: `ICS Cloud Request`
- Owner: `Abel Tuter`
- Short Description: `Request for ICS Cloud Infra`
- Description: `Request for ICS Cloud Infra, here. This will go through approval process though.`
- Catalog: `Service Catalogue`
- Category: `IT for IT`

### 13.2 Variables
- `requested_for` (reference to `sys_user`)
- `email_id` (single line text, read-only/disabled, auto-populated from `requested_for.email`)
- `cloud_platform` (dropdown choices: `AWS`, `GCP`, `Azure`)

### 13.3 Workflow Behavior
- Approval routed to line manager of `requested_for`
- If approved: close RITM
- If rejected: cancel RITM

### 13.4 Planned Build Sequence
1. Update design docs for `ics-cloud-request`.
2. Create Fluent catalog item definition.
3. Create catalog client scripts for `email_id` auto-population and read-only behavior.
4. Create Fluent fulfillment flow with manager approval and RITM state handling.
5. Associate flow to catalog item.
6. Build and deploy.
7. Validate behavior (variables, approval routing, RITM end states, cross-scope checks).

### 13.5 Current Status
- Stages 1-4 implementation completed in source.
- Build/deploy completed.
- Runtime validation pending in instance.

## 14) Lessons Learned (Build, Deploy, Execution)

### 14.1 Build Lessons
- A successful `npm run build` is required before every deploy; otherwise older artifacts may be deployed.
- `src/client` without a dedicated `tsconfig.json` triggers a non-blocking warning; build still succeeds with default options.
- Validate generated artifacts in `dist/app/update/` when troubleshooting (`sc_cat_item`, variable, flow, and client script records).

### 14.2 Deploy Lessons
- Deploy success (`npm run deploy` exit code 0) confirms package install, but runtime checks are still mandatory.
- Catalog/category references should use deterministic sys_ids when environment naming differs.
- If item fields appear blank after deploy (catalog/category/flow), verify generated XML values in `dist/app/update/` and instance references.

### 14.3 Execution Lessons
- Service Catalog access behavior can differ by `accessType`; `delegated` is required for reliable request-on-behalf scenarios.
- For dynamic variable behavior, implement explicit Catalog Client Scripts (onLoad/onChange) rather than relying on manual form updates.
- Approval and RITM end-state logic should be implemented in Flow Designer Fluent flow branches (`approved` vs `rejected`).

### 14.4 Cross-Scope Lessons
- Most catalog item/flow actions can run without extra privileges, but always verify `sys_restricted_caller_access` after first runtime tests.
- Add only minimum required privileges in `sys_scope_privilege` when blocks are observed.

### 14.5 Reusable Delivery Pattern for Future Items
1. Define catalog item in `src/fluent/catalog-items/<item>/`.
2. Define flow in `src/fluent/flows/`.
3. Define catalog client scripts in `src/fluent/catalog-client-scripts/` with JS under `src/client/catalog-items/<item>/`.
4. Build (`npm run build`) and verify artifacts in `dist/app/update/`.
5. Deploy (`npm run deploy`).
6. Execute runtime validation checklist (item metadata, variable behavior, approval routing, end states, cross-scope checks).

## 15) ICS Form Generator (Current)

### 15.1 Catalog Item
- Name: `ICS Form Generator`
- Catalog: `Service Catalogue`
- Category: `IT for IT`
- Input: mandatory design-document attachment

### 15.2 Automation Behavior
- Generates a draft catalog item from attached design document metadata.
- Writes readable design summary + generated catalog item sys_id to RITM work notes.
- Closes RITM on success.
- Cancels RITM on failure.

### 15.3 Source of Truth
- Item definition: `src/fluent/catalog-items/ics-form-generator/request-form-generator.now.ts`
- Skill definition: `src/fluent/now-assist-skills/ics-form-generator-skill.now.ts`
- Fulfillment flow: `src/fluent/flows/ics-form-generator-fulfillment-flow.now.ts`
- Item documentation: `docs/catalog-items/ics-form-generator/`

---

## Appendix A - Separation Checklist (Per Item)
- [ ] Dedicated folder under `src/catalog-items/<item-slug>/`
- [ ] Dedicated variables and variable sets
- [ ] Dedicated client scripts and UI policies
- [ ] Dedicated flow/workflow
- [ ] Dedicated approvals and tasks
- [ ] Dedicated notifications
- [ ] Dedicated test assets
- [ ] Dedicated documentation and release notes
