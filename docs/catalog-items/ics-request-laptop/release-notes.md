# ICS Request Laptop - Release Notes

## 0.1.9 - 2026-11-02

### Changed
- Design documents updated with complete implemented details.
- Catalog and category entries documented with explicit sys_ids.
- Access model documented as `delegated` with open-user visibility intent.

## 0.1.8 - 2026-11-01

### Added
- Cross-scope verification section in deployment mapping checklist.
- Cross-scope verification stage in instance build checklist.

## 0.1.7 - 2026-11-01

### Changed
- Instance build checklist updated with explicit workflow association verification.
- Deployment mapping updated to Fluent deployable source paths.
- Post-deployment checks expanded for `first_name` default/onChange behavior.

## 0.1.6 - 2026-11-01

### Added
- Catalog client script to default `first_name` from logged-in user on form load.
- Catalog client script to auto-populate `first_name` when `requested_for` changes.
- Fluent source for deployable catalog client scripts.

## 0.1.5 - 2026-11-01

### Changed
- Design documents updated to reflect Fluent deployable sources.
- Workflow association documentation updated to reference `flow` linkage on catalog item.

## 0.1.4 - 2026-11-01

### Changed
- Catalog assignment set to `Service Catalogue`.
- Category assignment set to `IT for IT`.

## 0.1.3 - 2026-10-31

### Added
- Click-by-click ServiceNow instance build checklist.
- Manual and ATF execution checklist for approval and task flows.

## 0.1.2 - 2026-10-31

### Added
- Deployment mapping document for ServiceNow target records.
- Pre-deployment and post-deployment validation checklist.
- Rollback notes and evidence capture checklist.

## 0.1.1 - 2026-10-31

### Changed
- Variables aligned to final initial scope: `requested_for`, `first_name`, `reason`.
- Workflow updated to line manager approval sourced from `requested_for`.

### Added
- Post-approval catalog task configuration for group `BUS-AU-Aurora Technology Risk`.
- Notifications for approval outcomes and catalog task creation.
- ATF scenarios for approval/task creation and rejection path.

## 0.1.0 - 2026-10-31

### Added
- Initial scaffold for ICS Request Laptop catalog item.
- Item metadata with owner, summary, description, and icon path.
- Item-specific variables, workflow, client scripts, UI policy, notifications, and ATF placeholder.
