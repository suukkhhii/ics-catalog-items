# ICS Form Generator - Design

## Item Details
- Name: ICS Form Generator
- Short Description: Please create catalog items
- Description: Please create catalog items from scratch.
- Catalog: Service Catalog
- Catalog sys_id: e0d08b13c3330100c8b837659bba8fb4
- Category: IT for IT
- Category sys_id: 0461fc66974c3d948ed23d46f053af72
- Key: ics-form-generator
- Access Type: delegated

## Source Structure
- Deployable item definition: src/fluent/catalog-items/ics-form-generator/request-form-generator.now.ts
- Deployable skill definition: src/fluent/now-assist-skills/ics-form-generator-skill.now.ts
- Deployable flow definition: src/fluent/flows/ics-form-generator-fulfillment-flow.now.ts

## Variables
1. attach_your_design_document
   - Type: attachment
   - Mandatory: true

## Skill
- Skill name: ICS Form Generator Skill
- Input: documentAttachmentSysId
- Output contract: status, message, catalog_item_sys_id, readable_design
- Deployment setting: flowAction enabled

## Workflow Behavior
- Trigger: service catalog request item for ICS Form Generator
- Processing:
  - Validate request and attachment availability
  - Create draft catalog item in sc_cat_item
  - Map created item to Service Catalog and IT for IT category
  - Generate readable design summary text
  - Write status + output to RITM work notes
- End state:
  - Success: close RITM (state=3, stage=complete)
  - Failure: cancel RITM (state=4, stage=cancelled)

## Stage Status
- Stage 1 - Catalog Item: Completed
- Stage 2 - Skill: Completed
- Stage 3 - Fulfillment Flow: Completed
- Stage 4 - Documentation: Completed
