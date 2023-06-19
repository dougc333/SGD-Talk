 aws sns create-topic --name foobar
 aws sns list-topics
 

 aws sns subscribe --topic-arn arn:aws:sns:us-east-1:669059827483:sns-test --protocol sqs --notification-endpoint arn:aws:sqs:us-east-1:669059827483:test-queue --attributes RawMessageDelivery=true

aws sns publish --topic-arn arn:aws:sns:us-east-1:669059827483:sns-test --message "a message from batm
an"

