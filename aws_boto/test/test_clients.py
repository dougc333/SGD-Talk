#boto works starts with clients. Can we find billable from client level? 
#unclear 

import boto3




my_session = boto3.session.Session()
my_region = my_session.region_name
print("region of current user:", my_region)


client_us_west1 = boto3.client("autoscaling", region='us-west-1')
client_us_west2 = boto3.client("autoscaling", region='us-west-1')

client_us_east1 = boto3.client("autoscaling", region='us-eest-1')
client_us_east2 = boto3.client("autoscaling", region='us-eest-2')

clients=[client_us_west1, client_us_west2, client_us_east1, client_us_east2]

#for x in client:
#    boto3.{x}("ec2")


#IAM, S3, CloudWatch, API Gateway, Lambda, DynamoDB, ECS, EKS, EventBridge,
#BillingService

ec2_client = boto3.client("ec2")
#print(dir(ec2_client))
print(ec2_client.desc)
print("--------------------------------")
sqs_client = boto3.client("sqs")
print(dir(sqs_client))

print("--------------------------------")
sns_client = boto3.client("sns")
print(dir(sns_client))