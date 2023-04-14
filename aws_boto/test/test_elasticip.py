import boto3

ec2 = boto3.client('ec2')
filters = [
    {'Name': 'domain', 'Values': ['vpc']}
]


response = ec2.describe_addresses(Filters=filters)
print("elastic addresses across all zones are")
print("--------------------------------")

print(response['Addresses'])

