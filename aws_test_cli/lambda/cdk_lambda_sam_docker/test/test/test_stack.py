from aws_cdk import (
    Stack,
    aws_lambda as _lambda,
)
from constructs import Construct

class TestStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        my_lambda = _lambda.Function(
          self,
          "Python_SAM_Example",
          runtime = _lambda.Runtime.PYTHON_3_8,
          code = _lambda.Code.from_asset('lambda_folder'),
          handler = 'handler.handle'
        )
        
