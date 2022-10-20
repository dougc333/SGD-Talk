[ERROR] ClientError: An error occurred (AccessDeniedException) when calling the Invoke operation: User: arn:aws:sts::669059827483:assumed-role/CdkWorkshopStack-HelloHitCounterHitCountHandlerSer-23HOGWYX5KWR/CdkWorkshopStack-HelloHitCounterHitCountHandler247-Sldrq84ILhXj is not authorized to perform: lambda:InvokeFunction on resource: arn:aws:lambda:us-west-2:669059827483:function:CdkWorkshopStack-HelloHandler2E4FBA4D-AzjB52rCMOo7 because no identity-based policy allows the lambda:InvokeFunction action
Traceback (most recent call last):
  File "/var/task/hitcount.py", line 21, in handler
    Payload=json.dumps(event),
  File "/var/runtime/botocore/client.py", line 391, in _api_call
    return self._make_api_call(operation_name, kwargs)
  File "/var/runtime/botocore/client.py", line 719, in _make_api_call
    raise error_class(parsed_response, operation_name)
[ERROR] ClientError: An error occurred (AccessDeniedException) when calling the Invoke operation: User: arn:aws:sts::669059827483:assumed-role/CdkWorkshopStack-HelloHitCounterHitCountHandlerSer-23HOGWYX5KWR/CdkWorkshopStack-HelloHitCounterHitCountHandler247-Sldrq84ILhXj is not authorized to perform: lambda:InvokeFunction on resource: arn:aws:lambda:us-west-2:669059827483:function:CdkWorkshopStack-HelloHandler2E4FBA4D-AzjB52rCMOo7 because no identity-based policy allows the lambda:InvokeFunction action Traceback (most recent call last):   File "/var/task/hitcount.py", line 21, in handler     Payload=json.dumps(event),   File "/var/runtime/botocore/client.py", line 391, in _api_call     return self._make_api_call(operation_name, kwargs)   File "/var/runtime/botocore/client.py", line 719, in _make_api_call     raise error_class(parsed_response, operation_name)

no work
cant tell how to set the roles/permissions

