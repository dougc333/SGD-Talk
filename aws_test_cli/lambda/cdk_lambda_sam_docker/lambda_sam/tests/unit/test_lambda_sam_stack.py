import aws_cdk as core
import aws_cdk.assertions as assertions

from lambda_sam.lambda_sam_stack import LambdaSamStack

# example tests. To run these tests, uncomment this file along with the example
# resource in lambda_sam/lambda_sam_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = LambdaSamStack(app, "lambda-sam")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
