import { action, Flow, trigger, wfa } from '@servicenow/sdk/automation'

export const drSanFailoverAutomatedFulfillmentFlow = Flow(
    {
        $id: Now.ID['dr-san-failover-automated-fulfillment-flow'],
        name: 'Disaster Recovery SAN Failover [Automated] - Fulfillment Flow',
        runAs: 'system',
    },
    wfa.trigger(
        trigger.application.serviceCatalog,
        { $id: Now.ID['dr-san-failover-automated-service-catalog-trigger'] },
        { run_flow_in: 'background' }
    ),
    params => {
        const hybridCloudGroup = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['dr-san-failover-lookup-hybrid-cloud-group'] },
            {
                table: 'sys_user_group',
                conditions: 'name=TECH-GLOBAL-ICS-ECCS-CC-HYBRID CLOUD',
                if_multiple_records_are_found_action: 'use_first_record',
            }
        )

        const sanGroup = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['dr-san-failover-lookup-san-group'] },
            {
                table: 'sys_user_group',
                conditions:
                    'name=TECH-GLOBAL-CDIS - Infrastructure Services - Enterprise Compute – SAN',
                if_multiple_records_are_found_action: 'use_first_record',
            }
        )

        const approval = wfa.action(
            action.core.askForApproval,
            { $id: Now.ID['dr-san-failover-hybrid-cloud-approval'] },
            {
                record: wfa.dataPill(params.trigger.request_item, 'reference'),
                table: 'sc_req_item',
                approval_reason:
                    'Approval required from TECH-GLOBAL-ICS-ECCS-CC-HYBRID CLOUD before SAN DR failover execution.',
                approval_conditions: wfa.approvalRules({
                    conditionType: 'OR',
                    ruleSets: [
                        {
                            action: 'ApprovesRejects',
                            conditionType: 'AND',
                            rules: [
                                [
                                    {
                                        ruleType: 'Any',
                                        users: [],
                                        groups: [wfa.dataPill(hybridCloudGroup.Record, 'reference')],
                                        manual: false,
                                    },
                                ],
                            ],
                        },
                    ],
                }),
            }
        )

        wfa.flowLogic.if(
            {
                $id: Now.ID['dr-san-failover-if-approved'],
                condition: `${wfa.dataPill(approval.approval_state, 'choice')}=approved`,
            },
            () => {
                wfa.action(
                    action.core.createCatalogTask,
                    { $id: Now.ID['dr-san-failover-task-1-validation'] },
                    {
                        ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                        ah_short_description: 'Consistency Group Validation',
                        ah_fields: TemplateValue({
                            assignment_group: wfa.dataPill(hybridCloudGroup.Record, 'reference'),
                            description:
                                'By approving this task you confirm Disk IDs, replication mode/state, CG readiness, and change implementation alignment.',
                        }),
                        ah_wait: true,
                    }
                )

                wfa.action(
                    action.core.createCatalogTask,
                    { $id: Now.ID['dr-san-failover-task-2-execution'] },
                    {
                        ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                        ah_short_description: 'Failover Execution',
                        ah_fields: TemplateValue({
                            assignment_group: wfa.dataPill(sanGroup.Record, 'reference'),
                            description:
                                'Execute SAN failover automation after validation task completion. Update replication state and disk conditions before closure.',
                        }),
                        ah_wait: false,
                    }
                )
            }
        )
    }
)
