swipl -g "['../../src/etalis.P'],set_etalis_flag(logging,off), compile_events('flower_specification.event'), load_static_rules('flower_specification_static_rules.P'), load_database('use_cases/flower_test_02.db'), flower_use_case_interface."

################################################################################
#sicstus --goal "['../../src/etalis.P'],set_etalis_flag(logging,off),set_etalis_flag(prolog_backend,sicstus), compile_events('flower_specification.event'), load_static_rules('flower_specification_static_rules.P'), load_database('use_cases/flower_test_02.db'), flower_use_case_interface."

################################################################################
#yappl -g "['../../src/etalis.P'],set_etalis_flag(logging,off),set_etalis_flag(prolog_backend,yap), compile_events('flower_specification.event'), load_static_rules('flower_specification_static_rules.P'), load_database('use_cases/flower_test_02.db'), flower_use_case_interface."

################################################################################
#xsb -e "cd('../../src'),['etalis.P'],cd('../examples/flower_delivery'),set_etalis_flag(logging,off),set_etalis_flag(prolog_backend,xsb), compile_events('flower_specification.event'), load_static_rules('flower_specification_static_rules.P'), load_database('use_cases/flower_test_02.db'), flower_use_case_interface."

################################################################################
rm -rf *.bin *.ctr
