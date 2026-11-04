# Disaster Recovery SAN Failover [Automated] - Design

## Item Details
- Name: Disaster Recovery SAN Failover [Automated]
- Owner: Con Kagiaros
- Short Description: The SAN DR failover capability provides a controlled, auditable, and automated method for teams to trigger storage failovers without manual intervention from the storage team.
- Catalog: Technology
- Category: Infrastructure Support (CDIS)
- Access Type: delegated
- Key: dr-san-failover-automated

## Source Structure
- Deployable item definition: src/fluent/catalog-items/dr-san-failover-automated/dr-san-failover-automated.now.ts
- Deployable flow definition: src/fluent/flows/dr-san-failover-automated-fulfillment-flow.now.ts
- Deployable catalog client scripts: src/fluent/catalog-client-scripts/dr-san-failover-automated-client-scripts.now.ts
- Client script source: src/client/catalog-items/dr-san-failover-automated/

## Variables
- Common CDIS variables 1-17 implemented in source (requestor and funding context).
- Item-specific variables:
  - HyperV Cluster Name
  - Application Name/Replication Group
  - Change Record

## Approvals
- Type: Custom Approval Workflow
- Approver group: TECH-GLOBAL-ICS-ECCS-CC-HYBRID CLOUD
- Approval required before task execution sequence.

## Fulfilment
- Requested Item assignment group: TECH-GLOBAL-ICS-ECCS-CC-HYBRID CLOUD
- SCTASK 1: Consistency Group Validation (blocking)
- SCTASK 2: Failover Execution (after task 1 completion)

## Runtime Notes
- Group lookups are by group name in flow.
- Change Record reference is constrained to active records.
- Additional refinements can be added for strict "Implement" state validation and UI policy-driven conditional mandatory rules.
