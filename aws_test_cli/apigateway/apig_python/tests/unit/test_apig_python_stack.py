import aws_cdk as core
import aws_cdk.assertions as assertions

from apig_python.apig_python_stack import ApigPythonStack

# example tests. To run these tests, uncomment this file along with the example
# resource in apig_python/apig_python_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = ApigPythonStack(app, "apig-python")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
