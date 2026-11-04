# ICS Form Generator - Release Notes

## 0.1.0 - 2026-11-02

### Added
- Initial Fluent catalog item implementation for `ICS Form Generator`.
- Mandatory attachment variable `attach_your_design_document`.
- `ICS Form Generator Skill` definition with flow-action deployment enabled.
- Fulfillment flow `ICS Form Generator - Fulfillment Flow` to:
  - process design document attachment,
  - create draft catalog item,
  - write readable design summary and created `catalog_item_sys_id` to RITM work notes,
  - close request on success and cancel on error.
- Item-level design documentation.
