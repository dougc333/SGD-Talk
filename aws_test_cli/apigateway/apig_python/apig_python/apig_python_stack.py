from aws_cdk import (
		Stack,
		aws_lambda as _lambda,
		aws_apigateway as apigw
)

from constructs import Construct


class ApigPythonStack(Stack):
  def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
    super().__init__(scope, construct_id, **kwargs)
		api = apigw.RestApi(self, "booksapi")
		api.root.add_method("ANY")
		books = api.root.add_resource("books")
		books.add_method("GET")
    
