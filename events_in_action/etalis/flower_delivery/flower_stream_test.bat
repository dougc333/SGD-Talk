swipl -g "['../../src/etalis.P'],set_etalis_flag(logging,off), compile_events('flower_specification.event'), load_static_rules('flower_specification_static_rules.P'), load_database('use_cases/flower_test_01.db'), execute_event_stream_file('use_cases/flower_test_01.stream')."

################################################################################
#sicstus --goal "['../../src/etalis.P'],set_etalis_flag(logging,off),set_etalis_flag(prolog_backend,sicstus), compile_events('flower_specification.event'), load_static_rules('flower_specification_static_rules.P'), load_database('use_cases/flower_test_01.db'), execute_event_stream_file('use_cases/flower_test_01.stream')."

################################################################################
#yappl -g "['../../src/etalis.P'],set_etalis_flag(logging,off),set_etalis_flag(prolog_backend,yap), compile_events('flower_specification.event'), load_static_rules('flower_specification_static_rules.P'), load_database('use_cases/flower_test_01.db'), execute_event_stream_file('use_cases/flower_test_01.stream')."

################################################################################
#xsb -e "cd('../../src'),['etalis.P'],cd('../examples/flower_delivery'),set_etalis_flag(logging,off),set_etalis_flag(prolog_backend,xsb), compile_events('flower_specification.event'), load_static_rules('flower_specification_static_rules.P'), load_database('use_cases/flower_test_01.db'), execute_event_stream_file('use_cases/flower_test_01.stream')."

################################################################################
rm -rf *.bin *.ctr
