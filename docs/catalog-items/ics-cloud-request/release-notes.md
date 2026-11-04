# ICS Cloud Request - Release Notes

## 0.1.1 - 2026-11-02

### Added
- Detailed build/deploy/execution runbook in item design document.
- Lessons learned section for future catalog item implementation.
- Dedicated instance build checklist for runtime validation and evidence capture.

### Changed
- Item design updated to complete implemented-state documentation.

## 0.1.0 - 2026-11-02

### Added
- Initial Fluent catalog item definition for `ICS Cloud Request`.
- Variables:
  - `requested_for` (Requested For)
  - `email_id` (Email id)
  - `cloud_platform` (AWS, GCP, Azure)
- Catalog mapping to Service Catalog and IT for IT category.
- Delegated access model for request-on-behalf support.

### Added
- Catalog client scripts for `email_id` behavior:
  - Read-only enforcement.
  - Auto-populate from selected `requested_for.email` on load and on change.

### Added
- Fulfillment flow `ICS Cloud Request - Fulfillment Flow`:
  - Line manager approval from `requested_for.manager`.
  - Approved branch closes RITM.
  - Rejected branch cancels RITM.

### Changed
- Item-level design document updated from planned to implemented state.
