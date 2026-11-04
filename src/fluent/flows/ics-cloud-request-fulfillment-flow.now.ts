import { action, Flow, trigger, wfa } from '@servicenow/sdk/automation'

export const icsCloudRequestFulfillmentFlow = Flow(
    {
        $id: Now.ID['ics-cloud-request-fulfillment-flow'],
        name: 'ICS Cloud Request - Fulfillment Flow',
        runAs: 'system',
    },
    wfa.trigger(
        trigger.application.serviceCatalog,
        { $id: Now.ID['ics-cloud-request-service-catalog-trigger'] },
        { run_flow_in: 'background' }
    ),
    params => {
        const approval = wfa.action(
            action.core.askForApproval,
            { $id: Now.ID['ics-cloud-request-line-manager-approval'] },
            {
                record: wfa.dataPill(params.trigger.request_item, 'reference'),
                table: 'sc_req_item',
                approval_reason: 'Line manager approval required for ICS Cloud Request.',
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
                $id: Now.ID['ics-cloud-request-if-approved'],
                condition: `${wfa.dataPill(approval.approval_state, 'choice')}=approved`,
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['ics-cloud-request-close-ritm'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            state: '3',
                            stage: 'complete',
                        }),
                    }
                )
            }
        )

        wfa.flowLogic.elseIf(
            {
                $id: Now.ID['ics-cloud-request-if-rejected'],
                condition: `${wfa.dataPill(approval.approval_state, 'choice')}=rejected`,
            },
            () => {
                wfa.action(
                    action.core.updateRecord,
                    { $id: Now.ID['ics-cloud-request-cancel-ritm'] },
                    {
                        table_name: 'sc_req_item',
                        record: wfa.dataPill(params.trigger.request_item, 'reference'),
                        values: TemplateValue({
                            state: '4',
                            stage: 'cancelled',
                        }),
                    }
                )
            }
        )
    }
)
