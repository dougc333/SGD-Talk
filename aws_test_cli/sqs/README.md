sqs add message
API-Write-SQS used as: none
AWSLambdaBasicExecutionRole-xxx used as: none
Lambda-DynamoDBStreama-REad used as: permission policy
Lambda-Read-SQS used as: permission policy
Lambda-SNS-Publish used as: permission policy
Lambda-WRite-DynamoDB used as: permission policy

https://awswith.net/2021/08/01/creating-an-sqs-queue-and-an-sns-topic-and-subscription-using-the-aws-cli/

Send and receive same message:

aws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/669059827483/test-queue --message-body "send-message-awscli"
aws sqs receive-message --queue-url https://sqs.us-east-1.amazonaws.com/669059827483/test-queue

Use https://awspolicygen.s3.amazonaws.com/policygen.html
to generate policy for attributes.json.

attributes.json is supposed to hold the same default settings you see in the
web interface
