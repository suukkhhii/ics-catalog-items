import { action, Flow, trigger, wfa } from '@servicenow/sdk/automation'

export const icsRequestLaptopFulfillmentFlow = Flow(
    {
        $id: Now.ID['ics-request-laptop-fulfillment-flow'],
        name: 'ICS Request Laptop - Fulfillment Flow',
        runAs: 'system',
    },
    wfa.trigger(
        trigger.application.serviceCatalog,
        { $id: Now.ID['ics-request-laptop-service-catalog-trigger'] },
        { run_flow_in: 'background' }
    ),
    params => {
        const assignmentGroup = wfa.action(
            action.core.lookUpRecord,
            { $id: Now.ID['ics-request-laptop-assignment-group-lookup'] },
            {
                table: 'sys_user_group',
                conditions: 'name=BUS-AU-Aurora Technology Risk',
                if_multiple_records_are_found_action: 'use_first_record',
            }
        )

        const approval = wfa.action(
            action.core.askForApproval,
            { $id: Now.ID['ics-request-laptop-line-manager-approval'] },
            {
                record: wfa.dataPill(params.trigger.request_item, 'reference'),
                table: 'sc_req_item',
                approval_reason: 'Line manager approval required for ICS Request Laptop.',
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
                                        users: [
                                            wfa.dataPill(
                                                params.trigger.request_item.requested_for.manager,
                                                'reference'
                                            ),
                                        ],
                                        groups: [],
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
                $id: Now.ID['ics-request-laptop-if-approved'],
                condition: `${wfa.dataPill(approval.approval_state, 'choice')}=approved`,
            },
            () => {
                wfa.action(
                    action.core.createCatalogTask,
                    { $id: Now.ID['ics-request-laptop-create-catalog-task'] },
                    {
                        ah_requested_item: wfa.dataPill(params.trigger.request_item, 'reference'),
                        ah_short_description: 'Process ICS Request Laptop fulfillment',
                        ah_fields: TemplateValue({
                            assignment_group: wfa.dataPill(assignmentGroup.Record, 'reference'),
                        }),
                        ah_wait: false,
                    }
                )
            }
        )
    }
)
