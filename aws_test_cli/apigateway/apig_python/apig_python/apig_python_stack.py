from aws_cdk import (
    Stack,
    aws_lambda as _lambda,
    aws_apigateway as apigw,
    aws_dynamodb as dynamodb
)
""" from aws_cdk.aws_dynamodb import (
    Table,
    Attribute,
    AttributeType,
    StreamViewType,
    BillingMode
)
 """
from constructs import Construct


class ApigPythonStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # CREATE DYNAMODB TABLE
        table = dynamodb.Table(self, id="cdkid", table_name="CDKTable",
                               partition_key=dynamodb.Attribute(
                                   name="UserId", type=dynamodb.AttributeType.STRING),
                               stream=dynamodb.StreamViewType.NEW_AND_OLD_IMAGES
                               )
        # add sort key after table created, not in ctor.

        # APIGATEWAY. this is V1
        api = apigw.RestApi(self, "userapi")
        # Do I need ANY first? The webinterface doesnt need ANY first
        # api.root.add_method("ANY")
        user = api.root.add_resource("user")
        user.add_method("GET")
        user.add_method("POST")
