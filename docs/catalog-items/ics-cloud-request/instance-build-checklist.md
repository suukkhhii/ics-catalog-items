# ICS Cloud Request - Instance Build Checklist

## 1) Metadata Verification
- [ ] Name = ICS Cloud Request
- [ ] Catalog = Service Catalog
- [ ] Category = IT for IT
- [ ] Owner = Abel Tuter
- [ ] Flow = ICS Cloud Request - Fulfillment Flow

## 2) Variable Verification
- [ ] `requested_for` exists and references `sys_user`
- [ ] `email_id` exists and is read-only in runtime
- [ ] `cloud_platform` exists with choices AWS, GCP, Azure

## 3) Client Script Verification
- [ ] OnLoad script is active
- [ ] OnChange script is active for `requested_for`
- [ ] `email_id` auto-populates from `requested_for.email`

## 4) Workflow Verification
- [ ] Approval is assigned to line manager of `requested_for`
- [ ] Approved path closes RITM
- [ ] Rejected path cancels RITM

## 5) Build & Deploy Verification
- [ ] `npm run build` succeeded
- [ ] `npm run deploy` succeeded
- [ ] Generated update records include catalog item, variables, client scripts, and flow

## 6) Cross-Scope Verification
- [ ] No blocking records in `sys_restricted_caller_access` for this execution path
- [ ] No additional `sys_scope_privilege` grants required (or minimum grants documented)

## 7) Evidence Capture
- [ ] Catalog item form screenshot
- [ ] Variable behavior screenshot/video
- [ ] Approval record screenshot
- [ ] RITM closed state evidence (approved case)
- [ ] RITM cancelled state evidence (rejected case)
- [ ] Cross-scope check evidence
