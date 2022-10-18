import aws_cdk as core
import aws_cdk.assertions as assertions

from test_lambda.test_lambda_stack import TestLambdaStack

# example tests. To run these tests, uncomment this file along with the example
# resource in test_lambda/test_lambda_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = TestLambdaStack(app, "test-lambda")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
