sqs add message	
API-Write-SQS  used as: none
AWSLambdaBasicExecutionRole-xxx  used as: none
Lambda-DynamoDBStreama-REad  used as: permission policy
Lambda-Read-SQS  used as: permission policy
Lambda-SNS-Publish  used as: permission policy
Lambda-WRite-DynamoDB  used as: permission policy


Send and receive same message: 

aws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/669059827483/test-queue --message-body "send-message-awscli"
aws sqs receive-message --queue-url https://sqs.us-east-1.amazonaws.com/669059827483/test-queue



