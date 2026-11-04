import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'b914539189dc41c7a6cf75f8e384e411'
                    }
                    'dr-san-failover-apm-ppm-onchange': {
                        table: 'catalog_script_client'
                        id: '36f3640433c84d6b9eb5c66aab90ce34'
                    }
                    'dr-san-failover-automated': {
                        table: 'sc_cat_item'
                        id: 'f64702ec16f5453bb4311b9f746ee5e6'
                    }
                    'dr-san-failover-automated-fulfillment-flow': {
                        table: 'sys_hub_flow'
                        id: 'bdad6209d8264acaa7c6bbfd72cdd398'
                    }
                    'dr-san-failover-automated-service-catalog-trigger': {
                        table: 'sys_hub_trigger_instance_v2'
                        id: 'a8ca06b11ac24a028ed5b7daea47c376'
                    }
                    'dr-san-failover-defaults-onload': {
                        table: 'catalog_script_client'
                        id: 'e4b6fbe834264b7d8cb9b1f5ca60576e'
                    }
                    'dr-san-failover-hybrid-cloud-approval': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'd7effa8f1c28432c872b60ff112512db'
                    }
                    'dr-san-failover-if-approved': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '61a1030acd0a495d858eacbcfb418d7d'
                    }
                    'dr-san-failover-lookup-hybrid-cloud-group': {
                        table: 'sys_hub_action_instance_v2'
                        id: '029a0839c7224f6d941fd090dea32cff'
                    }
                    'dr-san-failover-lookup-san-group': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'e2460c31689d48e180efc189f738b076'
                    }
                    'dr-san-failover-task-1-validation': {
                        table: 'sys_hub_action_instance_v2'
                        id: '4f052aded7b44c1b9b439fe6f6b420d6'
                    }
                    'dr-san-failover-task-2-execution': {
                        table: 'sys_hub_action_instance_v2'
                        id: '758447338bc54d4b82a23e526cda3765'
                    }
                    ics_catalog_design_interpreter_additional_instructions_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '5e3884482d044b47820eba2170943c3c'
                    }
                    ics_catalog_design_interpreter_catalog_specification_json_output: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'fc0f6deabdf74f248c8d6fce07693cc3'
                    }
                    ics_catalog_design_interpreter_document_text_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'a5982e55aeee493c9700563c6d6faa3c'
                    }
                    ics_catalog_design_interpreter_optional_name_prefix_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '9844e2e3a6de4e699c2f7558ca20f611'
                    }
                    ics_catalog_design_interpreter_prompt_v1: {
                        table: 'sys_generative_ai_config'
                        id: '9d64b8c5951a48308ba066c160aa81b0'
                    }
                    ics_catalog_design_interpreter_requested_item_status_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '44a15fcbf58045f2b2326d2dcd01d26f'
                    }
                    ics_catalog_design_interpreter_skill: {
                        table: 'sys_one_extend_capability'
                        id: 'cd08c8a463a24f85ac10b0367e3909ec'
                    }
                    ics_catalog_design_interpreter_skill__output_error: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'dff2b90c3caf44e4ac62eea62f92f110'
                    }
                    ics_catalog_design_interpreter_skill__output_errorcode: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'e9514ecd827f4cde98483e62104ea38b'
                    }
                    ics_catalog_design_interpreter_skill__output_provider: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '4fb4def5c6d246348319e265a3a20af6'
                    }
                    ics_catalog_design_interpreter_skill__output_response: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'a34be816a5604be9bfdfbda92c4b5b05'
                    }
                    ics_catalog_design_interpreter_skill__output_status: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '65c8f8a24cfa4368b4c2166dfa9f0b7a'
                    }
                    ics_catalog_design_interpreter_user_access: {
                        table: 'sys_security_acl'
                        id: 'e32a2a1e387245239cee13adbe242124'
                    }
                    ics_form_generator_attachment_input: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '16a54764e81a44c1834c87a361809eee'
                        deleted: true
                    }
                    ics_form_generator_prompt_v1: {
                        table: 'sys_generative_ai_config'
                        id: 'bb92af5adce2422b821ef7a2e430f270'
                        deleted: true
                    }
                    ics_form_generator_skill: {
                        table: 'sys_one_extend_capability'
                        id: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                        deleted: true
                    }
                    ics_form_generator_skill__output_error: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'ceb3821af6d14133850828a4959e943f'
                        deleted: true
                    }
                    ics_form_generator_skill__output_errorcode: {
                        table: 'sys_one_extend_definition_attribute'
                        id: '996480a0f9294909aa448030438681db'
                        deleted: true
                    }
                    ics_form_generator_skill__output_provider: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'ddfed6a348644ce7ae297421c25cac84'
                        deleted: true
                    }
                    ics_form_generator_skill__output_response: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'a3f1e8ca600c4d34a818e2b55923dde4'
                        deleted: true
                    }
                    ics_form_generator_skill__output_status: {
                        table: 'sys_one_extend_definition_attribute'
                        id: 'bf06db66e5d8473d9cf6d4a91e70b948'
                        deleted: true
                    }
                    ics_form_generator_user_access: {
                        table: 'sys_security_acl'
                        id: 'c7904544137949138f37d7d9f6cbde2c'
                        deleted: true
                    }
                    'ics-cloud-request': {
                        table: 'sc_cat_item'
                        id: 'ee746d61fe7748a99264394e19d322ca'
                    }
                    'ics-cloud-request-cancel-ritm': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'd62a8090a1b94ca88a43b084ea0b4ae9'
                    }
                    'ics-cloud-request-close-ritm': {
                        table: 'sys_hub_action_instance_v2'
                        id: '2606d85f4b2e43b3afa93036c7892d47'
                    }
                    'ics-cloud-request-email-id-onchange-requested-for': {
                        table: 'catalog_script_client'
                        id: '04e98b43cd814046b2a46c1e5f90fdca'
                    }
                    'ics-cloud-request-email-id-onload': {
                        table: 'catalog_script_client'
                        id: '39866c1b5fbc478faad15f6b2ba3efbd'
                    }
                    'ics-cloud-request-fulfillment-flow': {
                        table: 'sys_hub_flow'
                        id: '2045119c72d7420ebbba455a080c20de'
                    }
                    'ics-cloud-request-if-approved': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: 'f213acaa2e654c898ed326a822edf075'
                    }
                    'ics-cloud-request-if-rejected': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '72b388c5a1b748639e38651b2f9e7e85'
                    }
                    'ics-cloud-request-line-manager-approval': {
                        table: 'sys_hub_action_instance_v2'
                        id: '92a11bacafa1469a81d5d3cd399995cc'
                    }
                    'ics-cloud-request-service-catalog-trigger': {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '7a96a22005fc4de6aaa6d97d7a57ec84'
                    }
                    'ics-form-generator': {
                        table: 'sc_cat_item'
                        id: '1b904704480d4e1d847692475cf4edbe'
                    }
                    'ics-form-generator-fulfillment-flow': {
                        table: 'sys_hub_flow'
                        id: '60cb52e07f9b4538b220137b049d1a91'
                    }
                    'ics-form-generator-process-request': {
                        table: 'sys_hub_action_instance_v2'
                        id: '3a004371dced41d8b8da838ae37c3419'
                    }
                    'ics-form-generator-service-catalog-trigger': {
                        table: 'sys_hub_trigger_instance_v2'
                        id: 'f387d0d84d0c4e16b6143e9f2de056e6'
                    }
                    'ics-request-laptop': {
                        table: 'sc_cat_item'
                        id: 'e45c8b17b8124f67931baa55e4ccca56'
                    }
                    'ics-request-laptop-assignment-group-lookup': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'b262afbe186b4ba38cc35b9adb383d9b'
                    }
                    'ics-request-laptop-create-catalog-task': {
                        table: 'sys_hub_action_instance_v2'
                        id: 'bde4828354324a94a457b6c0ea71d837'
                    }
                    'ics-request-laptop-first-name-onchange-requested-for': {
                        table: 'catalog_script_client'
                        id: '9aa83350a1114d1e9afa2a68d6ca469e'
                    }
                    'ics-request-laptop-first-name-onload': {
                        table: 'catalog_script_client'
                        id: 'a77fabf759f94c399ee6805b90397e5c'
                    }
                    'ics-request-laptop-fulfillment-flow': {
                        table: 'sys_hub_flow'
                        id: 'f9d1148d98f045fc8f29052a93792f3a'
                    }
                    'ics-request-laptop-if-approved': {
                        table: 'sys_hub_flow_logic_instance_v2'
                        id: '9d5a79b9ea86498a8d784d4e62d4949a'
                    }
                    'ics-request-laptop-line-manager-approval': {
                        table: 'sys_hub_action_instance_v2'
                        id: '51ed611a3aed4067b3b2cdefc3eeb181'
                    }
                    'ics-request-laptop-service-catalog-trigger': {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '5da5dbe5452b40bba8e084f401b6a5fa'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'dae6e99a03834002a58d73cfb9c2f9a0'
                    }
                }
                composite: [
                    {
                        table: 'sc_cat_item_category'
                        id: '008055bedb534f58be86fbe5e5e798bd'
                        deleted: true
                        key: {
                            sc_cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            sc_category: '2fcb81ae224b4ca0a204e856443a271b'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: '0ba2c6702af24c079d6d5b1859dc0357'
                        key: {
                            sc_cat_item: '1b904704480d4e1d847692475cf4edbe'
                            sc_category: '0461fc66974c3d948ed23d46f053af72'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config_status'
                        id: '0ebb726c4a4b4aeaa524eea8f8ad5c36'
                        key: {
                            skill_config: {
                                id: '77520b024a2f484285a35d99bb5a0e7a'
                                key: {
                                    skill_id: 'cd08c8a463a24f85ac10b0367e3909ec'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_mapping'
                        id: '0f793447d0fb4b7f98e57fe0f7e83d06'
                        key: {
                            parent_capability: 'cd08c8a463a24f85ac10b0367e3909ec'
                            resource_capability: 'cd08c8a463a24f85ac10b0367e3909ec'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_attribute_mapping'
                        id: '0fe22f316a6f4c03a3cce26527bb0f2d'
                        deleted: true
                        key: {
                            resource_mapping: {
                                id: 'f24477810a31472ba82bf90cb2090a91'
                                key: {
                                    parent_capability: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                                    resource_capability: '51d095f77f211210210ca65c4d866591'
                                    resource_name: 'ParseAndCreateCatalogItem'
                                }
                            }
                            resource_attribute_name: 'a3911d3b7f211210210ca65c4d86651b'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config_var_set'
                        id: '1048848908e54ac9afbf8593dc0e9081'
                        deleted: true
                        key: {
                            name: 'View trigger'
                            skill_config: {
                                id: '524ec1ce327149a0971ef5c7861148bc'
                                key: {
                                    skill_id: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                                }
                            }
                            config_type: 'b89b1f0b7f821210076726d6ac86650e'
                        }
                    },
                    {
                        table: 'sys_gen_ai_strategy_mapping'
                        id: '14debf30be2f43b0b734572d9e8cf73f'
                        key: {
                            strategy: 'CAPABILITY_EXECUTION'
                            feature: {
                                id: 'e3c27ebace9147fb80917492da0276c7'
                                key: {
                                    feature_name: 'ICS Catalog Design Interpreter'
                                    document: 'cd08c8a463a24f85ac10b0367e3909ec'
                                }
                            }
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '1992a0ba5fae406599e6a4076f16c8bd'
                        key: {
                            sc_cat_item: 'e45c8b17b8124f67931baa55e4ccca56'
                            sc_catalog: 'e0d08b13c3330100c8b837659bba8fb4'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '1e4b3cc0210f4311b6879b9e0793728a'
                        key: {
                            question: {
                                id: '4c986403c56941f8ad9787c2a11e26e3'
                                key: {
                                    cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                                    variable_set: 'NULL'
                                    name: 'cost_center_type'
                                }
                            }
                            value: 'other'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '214a44dad5ef44ac875c73988adc0f35'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'application_name_replication_group'
                        }
                    },
                    {
                        table: 'sys_generative_ai_prompt_config'
                        id: '247a263da18b4624940650512a754640'
                        key: {
                            ai_config: '9d64b8c5951a48308ba066c160aa81b0'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '261b0e67692c43e7bb8a517a18a7dfd2'
                        key: {
                            sc_cat_item: 'ee746d61fe7748a99264394e19d322ca'
                            sc_catalog: 'e0d08b13c3330100c8b837659bba8fb4'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '27310899e5a845f995d669b3b633f0ff'
                        deleted: true
                        key: {
                            document_key: {
                                id: '1048848908e54ac9afbf8593dc0e9081'
                                key: {
                                    name: 'View trigger'
                                    skill_config: {
                                        id: '524ec1ce327149a0971ef5c7861148bc'
                                        key: {
                                            skill_id: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                                        }
                                    }
                                    config_type: 'b89b1f0b7f821210076726d6ac86650e'
                                }
                            }
                            variable: '5c5623df7f025210076726d6ac8665f9'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '29b8220897974f68bacf0c3564b8aa90'
                        key: {
                            cat_item: 'ee746d61fe7748a99264394e19d322ca'
                            variable_set: 'NULL'
                            name: 'requested_for'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_mapping'
                        id: '2bac500c2b3c46d9b435db36259d297b'
                        deleted: true
                        key: {
                            parent_capability: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                            resource_capability: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: '30758a9aae6e4a94932a31bd774eec30'
                        deleted: true
                        key: {
                            sc_cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            sc_category: 'cc30296b41fc4c62bb5dc7029b661d98'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '384b1cb561c14ee39f835c516e15a808'
                        deleted: true
                        key: {
                            sc_cat_item: 'e45c8b17b8124f67931baa55e4ccca56'
                            sc_catalog: '09f25d44eae84b6791b4d8317e5d8896'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config_status'
                        id: '3a5e987c1d774c5baedcd101952e6de2'
                        deleted: true
                        key: {
                            skill_config: {
                                id: '524ec1ce327149a0971ef5c7861148bc'
                                key: {
                                    skill_id: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                                }
                            }
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '3e7c8a7c030b4dc7a69b3e8b285d8ed2'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'change_record'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '3ee4639e78584a4db580ebb418756921'
                        key: {
                            question: {
                                id: 'e641ea104cb445908d5742684344385b'
                                key: {
                                    cat_item: 'ee746d61fe7748a99264394e19d322ca'
                                    variable_set: 'NULL'
                                    name: 'cloud_platform'
                                }
                            }
                            value: 'gcp'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '414def376e7644d5b9ba07c5efd8a8b6'
                        key: {
                            question: {
                                id: 'f94084162e604c2e95ba12a43803f7e2'
                                key: {
                                    cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                                    variable_set: 'NULL'
                                    name: 'sub_domain'
                                }
                            }
                            value: 'to_be_defined'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '485df4bffb0b4305b7d57fcdade863d2'
                        key: {
                            question: {
                                id: '650ec8982caf493a98f6acec1f1df294'
                                key: {
                                    cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                                    variable_set: 'NULL'
                                    name: 'is_project_funded'
                                }
                            }
                            value: 'no'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '4c986403c56941f8ad9787c2a11e26e3'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'cost_center_type'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '4f5405b961bb4c7ba66509aaa75ee4bb'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'business_application'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '4f7f72ab1f214af3bfdd8e07615c6001'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'requestor_role'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config'
                        id: '524ec1ce327149a0971ef5c7861148bc'
                        deleted: true
                        key: {
                            skill_id: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_attribute_mapping'
                        id: '528d4bbc9d744a9dbea7f8b373b3932f'
                        deleted: true
                        key: {
                            resource_mapping: {
                                id: 'f24477810a31472ba82bf90cb2090a91'
                                key: {
                                    parent_capability: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                                    resource_capability: '51d095f77f211210210ca65c4d866591'
                                    resource_name: 'ParseAndCreateCatalogItem'
                                }
                            }
                            resource_attribute_name: '0bd1117b7f211210210ca65c4d8665ed'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '52b087d9fab2436f8e09e25cae02ac09'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'hyperv_cluster_name'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: '5439c864251d4807aa449e5bcad0f3a2'
                        key: {
                            sc_cat_item: 'ee746d61fe7748a99264394e19d322ca'
                            sc_category: '0461fc66974c3d948ed23d46f053af72'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '5763d676eef44845bfc02fd898520c52'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'active_theme_admin_details'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '62a7d367455b46c7921978a3ee44982f'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'requestor_anz_email'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: '64825d1584f84a40a027fc71a4b74f9c'
                        key: {
                            sc_cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            sc_category: '92a397c4863b42beb1c7a56ef3addbe7'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '650ec8982caf493a98f6acec1f1df294'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'is_project_funded'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '67f3ae31a0264414916ee7dacaadd67a'
                        deleted: true
                        key: {
                            sc_cat_item: 'e45c8b17b8124f67931baa55e4ccca56'
                            sc_catalog: '142604a748c54edb8cd9234bec85f5f6'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '68b94b62bc8c4a7ea064d0d5bfafd090'
                        key: {
                            cat_item: 'ee746d61fe7748a99264394e19d322ca'
                            variable_set: 'NULL'
                            name: 'email_id'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: '6a2ddbf4afb241b38c47245b67295a27'
                        deleted: true
                        key: {
                            sc_cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            sc_catalog: 'ea20926203794ce88fd27ca95ee7fe7d'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '6b7184d1acad4d77be2854e76d902e36'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'apm_id'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '6db1031fa89c49c391d918244c639ead'
                        key: {
                            question: {
                                id: '650ec8982caf493a98f6acec1f1df294'
                                key: {
                                    cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                                    variable_set: 'NULL'
                                    name: 'is_project_funded'
                                }
                            }
                            value: 'yes'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '6f6dbba6aa6f498ead55bd4b74fdeea8'
                        key: {
                            question: {
                                id: 'e641ea104cb445908d5742684344385b'
                                key: {
                                    cat_item: 'ee746d61fe7748a99264394e19d322ca'
                                    variable_set: 'NULL'
                                    name: 'cloud_platform'
                                }
                            }
                            value: 'aws'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config_var_set'
                        id: '6f93aef25036498a8cde55934b76fb0c'
                        key: {
                            name: 'View trigger'
                            skill_config: {
                                id: '77520b024a2f484285a35d99bb5a0e7a'
                                key: {
                                    skill_id: 'cd08c8a463a24f85ac10b0367e3909ec'
                                }
                            }
                            config_type: 'b89b1f0b7f821210076726d6ac86650e'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_configuration'
                        id: '75861cf456194b29834a526742f91923'
                        key: {
                            agent: '77520b024a2f484285a35d99bb5a0e7a'
                        }
                    },
                    {
                        table: 'sn_nowassist_skill_config'
                        id: '77520b024a2f484285a35d99bb5a0e7a'
                        key: {
                            skill_id: 'cd08c8a463a24f85ac10b0367e3909ec'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: '7763662eedc84e4c8f112f515347c537'
                        deleted: true
                        key: {
                            sc_cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            sc_category: '28590a69068f43448a4312e6b51be357'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '7ab51ec0bd0244a0980adb6b38b09860'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'project_name'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '7b4929a58388492e955e67fe81d812b8'
                        key: {
                            cat_item: 'e45c8b17b8124f67931baa55e4ccca56'
                            variable_set: 'NULL'
                            name: 'reason'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_configuration'
                        id: '7ebcc3fe1afa4dffadb1dabf21504831'
                        deleted: true
                        key: {
                            agent: '524ec1ce327149a0971ef5c7861148bc'
                        }
                    },
                    {
                        table: 'sys_generative_ai_prompt_config'
                        id: '80376fff1cf348cbba3de0e1928517d6'
                        deleted: true
                        key: {
                            ai_config: 'bb92af5adce2422b821ef7a2e430f270'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '80e4e217a15e4de39332cd4c66be43bf'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'request_summary'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '8265eb6690774b1aa9ce2ea9d374db7d'
                        key: {
                            question: {
                                id: 'dca7a62c28a145dd85fc24002c15ed04'
                                key: {
                                    cat_item: '1b904704480d4e1d847692475cf4edbe'
                                    variable_set: 'NULL'
                                    name: 'make_generated_item_active'
                                }
                            }
                            value: 'no'
                        }
                    },
                    {
                        table: 'sys_gen_ai_strategy_mapping'
                        id: '8901626bd4934f53990c080ab780df7e'
                        deleted: true
                        key: {
                            strategy: 'CAPABILITY_EXECUTION'
                            feature: {
                                id: 'fd9cc806f9294cafa902b8fc7def1328'
                                key: {
                                    feature_name: 'ICS Form Generator Skill'
                                    document: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                                }
                            }
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '8b335cce4b42421283a7eb62898e03f1'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'requested_for'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '8f135841bc2a488e957c5e889767d274'
                        key: {
                            question: {
                                id: '9d54ab42d1234e738d0d08fb724615da'
                                key: {
                                    cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                                    variable_set: 'NULL'
                                    name: 'requestor_domain'
                                }
                            }
                            value: 'to_be_defined'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_mapping'
                        id: '9496a6b2d06e45b59a5c0532dc794ceb'
                        key: {
                            agent_access_config: {
                                id: '75861cf456194b29834a526742f91923'
                                key: {
                                    agent: '77520b024a2f484285a35d99bb5a0e7a'
                                }
                            }
                            role: {
                                id: '237738e0499c47f09c50659a81869a19'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'question_choice'
                        id: '9abb0cd679fa4637899ebbddb5adbf80'
                        key: {
                            question: {
                                id: 'dca7a62c28a145dd85fc24002c15ed04'
                                key: {
                                    cat_item: '1b904704480d4e1d847692475cf4edbe'
                                    variable_set: 'NULL'
                                    name: 'make_generated_item_active'
                                }
                            }
                            value: 'yes'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '9d54ab42d1234e738d0d08fb724615da'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'requestor_domain'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: '9fa6ad047ef44298a2eed4f96916b790'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'other_cost_center'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'a25c7cc3ef7d49fb8e7360bce89e0b26'
                        key: {
                            cat_item: '1b904704480d4e1d847692475cf4edbe'
                            variable_set: 'NULL'
                            name: 'attach_your_design_document'
                        }
                    },
                    {
                        table: 'sys_one_extend_definition_config'
                        id: 'a5a4bf0175424a168f2d2efb43b283cb'
                        deleted: true
                        key: {
                            definition: {
                                id: 'aa293713cae44f0293e44cfd3333e49a'
                                key: {
                                    capability: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                                    api: '936e514a53b3b110f028ddeeff7b128c'
                                }
                            }
                            capability: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'a61d1e816a824bb9b372e4a8554c551e'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'ppm_id'
                        }
                    },
                    {
                        table: 'sys_one_extend_capability_definition'
                        id: 'aa293713cae44f0293e44cfd3333e49a'
                        deleted: true
                        key: {
                            capability: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                            api: '936e514a53b3b110f028ddeeff7b128c'
                        }
                    },
                    {
                        table: 'sys_agent_access_role_mapping'
                        id: 'ad3cd33da27a4d64a9fe490b2cd445bc'
                        deleted: true
                        key: {
                            agent_access_config: {
                                id: '7ebcc3fe1afa4dffadb1dabf21504831'
                                key: {
                                    agent: '524ec1ce327149a0971ef5c7861148bc'
                                }
                            }
                            role: {
                                id: 'e8c55505e14848f182535fa788961afa'
                                key: {
                                    name: 'admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: 'b29f4ad784824a02b33779678ea01138'
                        deleted: true
                        key: {
                            sc_cat_item: 'e45c8b17b8124f67931baa55e4ccca56'
                            sc_category: '8b6d3c796d564ada85f4cb702d69651f'
                        }
                    },
                    {
                        table: 'sys_one_extend_definition_config'
                        id: 'b3798171ca5243c892cb1e0c9cc0b060'
                        key: {
                            definition: {
                                id: 'ff1582c8a83543149631a9b44197a7b3'
                                key: {
                                    capability: 'cd08c8a463a24f85ac10b0367e3909ec'
                                    api: '936e514a53b3b110f028ddeeff7b128c'
                                }
                            }
                            capability: 'cd08c8a463a24f85ac10b0367e3909ec'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: 'b76871a9277341029adcd53453f449c4'
                        key: {
                            sc_cat_item: 'e45c8b17b8124f67931baa55e4ccca56'
                            sc_category: '0461fc66974c3d948ed23d46f053af72'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'b933ea5f854a429cacc0ed0dc84262b7'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'requestor_department'
                        }
                    },
                    {
                        table: 'sc_cat_item_category'
                        id: 'bfbd8bbab0554b36ad832422351b2f12'
                        deleted: true
                        key: {
                            sc_cat_item: 'e45c8b17b8124f67931baa55e4ccca56'
                            sc_category: '8e6a55293ff34f46b1fdce6032c86fe1'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_edge'
                        id: 'c22a408ed12b49bdbe93cefb9054ac4a'
                        deleted: true
                        key: {
                            internal_name: 'ParseAndCreateCatalogItem__ICS Form Generator Skill'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: 'c48ad7bbe26e474cbe28fda03965a111'
                        deleted: true
                        key: {
                            sc_cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            sc_catalog: '59a6ecc0238f4078b2b3e0186da2a9e9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'c5b44c34b43d4d489eb259997245d670'
                        key: {
                            document_key: {
                                id: '6f93aef25036498a8cde55934b76fb0c'
                                key: {
                                    name: 'View trigger'
                                    skill_config: {
                                        id: '77520b024a2f484285a35d99bb5a0e7a'
                                        key: {
                                            skill_id: 'cd08c8a463a24f85ac10b0367e3909ec'
                                        }
                                    }
                                    config_type: 'b89b1f0b7f821210076726d6ac86650e'
                                }
                            }
                            variable: '5c5623df7f025210076726d6ac8665f9'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'c7ac30db505d4bba8c59f0e34c3f77b3'
                        key: {
                            cat_item: 'e45c8b17b8124f67931baa55e4ccca56'
                            variable_set: 'NULL'
                            name: 'requested_for'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'c8271065ad024b2fbddd16d7a5d19276'
                        key: {
                            question: {
                                id: '4c986403c56941f8ad9787c2a11e26e3'
                                key: {
                                    cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                                    variable_set: 'NULL'
                                    name: 'cost_center_type'
                                }
                            }
                            value: 'bsb_cc'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: 'd488c0326fa5481b8c4d7ec71aba0d1d'
                        key: {
                            sc_cat_item: '1b904704480d4e1d847692475cf4edbe'
                            sc_catalog: 'e0d08b13c3330100c8b837659bba8fb4'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'da0beef991f34c32a25153ca58d3bdc0'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'request_description'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'db87763eb4e449c498cc21978a78c8f9'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'bsb_cc'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'dca7a62c28a145dd85fc24002c15ed04'
                        key: {
                            cat_item: '1b904704480d4e1d847692475cf4edbe'
                            variable_set: 'NULL'
                            name: 'make_generated_item_active'
                        }
                    },
                    {
                        table: 'question_choice'
                        id: 'e1a00d10e30d4b5aa1a4c4ec2100c903'
                        key: {
                            question: {
                                id: 'e641ea104cb445908d5742684344385b'
                                key: {
                                    cat_item: 'ee746d61fe7748a99264394e19d322ca'
                                    variable_set: 'NULL'
                                    name: 'cloud_platform'
                                }
                            }
                            value: 'azure'
                        }
                    },
                    {
                        table: 'sys_gen_ai_feature_mapping'
                        id: 'e3c27ebace9147fb80917492da0276c7'
                        key: {
                            feature_name: 'ICS Catalog Design Interpreter'
                            document: 'cd08c8a463a24f85ac10b0367e3909ec'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'e641ea104cb445908d5742684344385b'
                        key: {
                            cat_item: 'ee746d61fe7748a99264394e19d322ca'
                            variable_set: 'NULL'
                            name: 'cloud_platform'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'e9c966164a1d4c2aa1907cb0695af1aa'
                        key: {
                            cat_item: 'e45c8b17b8124f67931baa55e4ccca56'
                            variable_set: 'NULL'
                            name: 'first_name'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: 'ef2daf6b2c1241689f206eeb34c8b203'
                        key: {
                            sc_cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            sc_catalog: 'b4b917fff58d42968318b6706be99d44'
                        }
                    },
                    {
                        table: 'sys_one_extend_resource_mapping'
                        id: 'f24477810a31472ba82bf90cb2090a91'
                        deleted: true
                        key: {
                            parent_capability: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                            resource_capability: '51d095f77f211210210ca65c4d866591'
                            resource_name: 'ParseAndCreateCatalogItem'
                        }
                    },
                    {
                        table: 'item_option_new'
                        id: 'f94084162e604c2e95ba12a43803f7e2'
                        key: {
                            cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            variable_set: 'NULL'
                            name: 'sub_domain'
                        }
                    },
                    {
                        table: 'sc_cat_item_catalog'
                        id: 'fbb137c751574ba7a78ffbc29ad4de60'
                        deleted: true
                        key: {
                            sc_cat_item: 'f64702ec16f5453bb4311b9f746ee5e6'
                            sc_catalog: 'f6629eee0da3474497ae585f81ffad83'
                        }
                    },
                    {
                        table: 'sys_gen_ai_feature_mapping'
                        id: 'fd9cc806f9294cafa902b8fc7def1328'
                        deleted: true
                        key: {
                            feature_name: 'ICS Form Generator Skill'
                            document: '8e60a178e9104bcb9c8ebf76cdfee6bb'
                        }
                    },
                    {
                        table: 'sys_one_extend_capability_definition'
                        id: 'ff1582c8a83543149631a9b44197a7b3'
                        key: {
                            capability: 'cd08c8a463a24f85ac10b0367e3909ec'
                            api: '936e514a53b3b110f028ddeeff7b128c'
                        }
                    },
                ]
            }
        }
    }
}
