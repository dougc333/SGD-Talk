from aws_cdk import (
    Stack,
    aws_lambda as _lambda, 
    aws_lambda_python_alpha as _alambda
)
from constructs import Construct

class ExternalLibLambdaSamStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        initiator = _alambda.PythonFunction(
          self, 
          "initializer",
          entry = './lambda',
          runtime = _lambda.Runtime.PYTHON_3_9,
          index="initiator.py",
          handler="handle"
        )
