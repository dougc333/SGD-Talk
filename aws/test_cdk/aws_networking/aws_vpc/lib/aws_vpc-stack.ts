import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsVpcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    //create VPC
    const vpc = new ec2.Vpc(this,'myVPC',{
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/26'),
      availabilityZones:['us-west-2a'],
      maxAzs:1,
    })

    //create IGW and ping

    //create subnets

    //
  }
}
