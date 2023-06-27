import aws_cdk as core
import aws_cdk.assertions as assertions

from external_lib_sam.external_lib_sam_stack import ExternalLibSamStack

# example tests. To run these tests, uncomment this file along with the example
# resource in external_lib_sam/external_lib_sam_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = ExternalLibSamStack(app, "external-lib-sam")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
