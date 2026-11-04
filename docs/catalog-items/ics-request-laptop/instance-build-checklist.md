# ICS Request Laptop - Instance Build Checklist

## Purpose
Step-by-step checklist to implement and validate the catalog item directly in a ServiceNow dev instance.

## 1) Prerequisites
- [ ] You are in the correct application scope: `ICS Catalog Items (x_anzb_ics_cat)`.
- [ ] Group `BUS-AU-Aurora Technology Risk` exists.
- [ ] Test users exist with `Manager` populated on user records.

## 2) Create Catalog Item
Navigation: Service Catalog > Catalog Definitions > Maintain Items

- [ ] Click **New**.
- [ ] Name = `ICS Request Laptop`.
- [ ] Short description = `Request laptop for Cloud Domain.`
- [ ] Description = `Request laptop for Cloud Domain. Please note you need approval.`
- [ ] Catalog = `Service Catalogue`.
- [ ] Category = `IT for IT`.
- [ ] Active = true.
- [ ] Owner = `Abel Tuter` (or mapped owner user record).
- [ ] Save.

Reference source: `src/fluent/catalog-items/ics-request-laptop/request-laptop.now.ts`

## 3) Add Icon
Navigation: Open created catalog item record

- [ ] Upload/select icon based on `src/catalog-items/ics-request-laptop/assets/icons/ics-request-laptop.svg`.
- [ ] Save.

## 4) Create Variables
Navigation: Open catalog item > Related Lists > Variables

### Variable A
- [ ] Type = `Reference`
- [ ] Question = `Requested For`
- [ ] Name = `requested_for`
- [ ] Reference table = `sys_user`
- [ ] Mandatory = true
- [ ] Order = 100
- [ ] Save

### Variable B
- [ ] Type = `Single Line Text`
- [ ] Question = `First Name`
- [ ] Name = `first_name`
- [ ] Mandatory = true
- [ ] Order = 200
- [ ] Save

### Variable C
- [ ] Type = `Multi Line Text`
- [ ] Question = `Reason`
- [ ] Name = `reason`
- [ ] Mandatory = true
- [ ] Order = 300
- [ ] Save

Reference source: `src/fluent/catalog-items/ics-request-laptop/request-laptop.now.ts`

## 5) Build Approval + Task Flow (Flow Designer)
Navigation: Process Automation > Flow Designer

- [ ] Create flow: `ICS Request Laptop - Fulfillment Flow`.
- [ ] Trigger: Requested Item created for catalog item `ICS Request Laptop`.
- [ ] Add step: Resolve Requested For user from variable `requested_for`.
- [ ] Add step: Lookup manager for Requested For user.
- [ ] Add approval step: Approver = manager from previous step.
- [ ] Configure reject path: set request state to rejected/closed.
- [ ] Configure approve path: create catalog task.

Catalog task on approve path:
- [ ] Short description = `Process ICS Request Laptop fulfillment`
- [ ] Description = `Fulfill approved laptop request for Cloud Domain user.`
- [ ] Assignment group = `BUS-AU-Aurora Technology Risk`
- [ ] Priority = `3 - Moderate`

Reference source: `src/fluent/flows/ics-request-laptop-fulfillment-flow.now.ts`

## 5.1) Verify Workflow Association on Catalog Item
Navigation: Open catalog item record > Process Engine/Flow section

- [ ] Flow = `ICS Request Laptop - Fulfillment Flow`
- [ ] Flow reference is populated after deployment.

Reference source: `src/fluent/catalog-items/ics-request-laptop/request-laptop.now.ts`

## 5.2) Configure Catalog Client Scripts (First Name behavior)
Navigation: Service Catalog > Catalog Administration > Catalog Client Scripts

- [ ] OnLoad script exists: `ICS Request Laptop - First Name Default OnLoad`
- [ ] OnChange script exists: `ICS Request Laptop - First Name From Requested For`
- [ ] OnChange script variable = `requested_for`

Reference source: `src/fluent/catalog-client-scripts/ics-request-laptop-client-scripts.now.ts`

## 6) Configure Notifications
Navigation: System Notification > Email > Notifications (or your event pipeline)

- [ ] Create/confirm event: `request_submitted`
- [ ] Create/confirm event: `approval_requested`
- [ ] Create/confirm event: `approval_approved`
- [ ] Create/confirm event: `approval_rejected`
- [ ] Create/confirm event: `catalog_task_created`

- [ ] Notification: `ICS Request Laptop - Request Submitted` (to requested_for/opened_by)
- [ ] Notification: `ICS Request Laptop - Approval Requested` (to line manager)
- [ ] Notification: `ICS Request Laptop - Approval Approved` (to requested_for/opened_by)
- [ ] Notification: `ICS Request Laptop - Approval Rejected` (to requested_for/opened_by)
- [ ] Notification: `ICS Request Laptop - Catalog Task Created` (to assignment group)

Reference config: `src/catalog-items/ics-request-laptop/notifications/notifications.json`

## 7) Run Functional Test (Manual)

### Approval Path
- [ ] Submit request with all 3 variables populated.
- [ ] Verify `first_name` defaults to logged-in user's first name on initial form load.
- [ ] Change `requested_for` and verify `first_name` auto-updates to selected user's first name.
- [ ] Verify approval assigned to manager of `requested_for`.
- [ ] Approve as manager.
- [ ] Verify catalog task created.
- [ ] Verify assignment group = `BUS-AU-Aurora Technology Risk`.

### Rejection Path
- [ ] Submit request with all 3 variables populated.
- [ ] Reject as manager.
- [ ] Verify request is closed/rejected.
- [ ] Verify no catalog task was created.

## 8) Run ATF (if enabled)
Reference tests: `src/catalog-items/ics-request-laptop/tests/atf/ics-request-laptop.atf.json`

- [ ] Execute `ICS Request Laptop - Approval and Task Creation`
- [ ] Execute `ICS Request Laptop - Rejection Path`
- [ ] Capture result evidence.

## 9) Evidence for Sign-off
- [ ] Request submitted screenshot.
- [ ] Approval record screenshot.
- [ ] Catalog task screenshot with assignment group.
- [ ] Notification/event evidence.
- [ ] ATF execution results (if applicable).

## 10) Deployment Readiness Gate
- [ ] All checks passed.
- [ ] No critical defects.
- [ ] Release notes updated.
- [ ] Ready for promotion to next environment.

## 11) Cross-Scope Verification
Navigation: System Definition > Cross-Scope Access

- [ ] Check `sys_restricted_caller_access` for blocked entries related to scope `x_anzb_ics_cat`.
- [ ] Check `sys_scope_privilege` for pending/required privileges related to the new flow execution path.
- [ ] If any cross-scope block exists, allow only the minimum required privilege and rerun functional tests.
- [ ] Capture evidence of final cross-scope status.
