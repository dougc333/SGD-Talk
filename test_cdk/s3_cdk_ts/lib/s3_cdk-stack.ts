import * as cdk from 'aws-cdk-lib';
//https://www.youtube.com/watch?v=I_ftyDeHffE
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Bucket } from 'aws-cdk-lib/aws-s3';

export class S3CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const s = new Bucket(this, "MyBucket",{
      bucketName: "ascareadbaretreaff",
      publicReadAccess: true,
    })
  }
}
