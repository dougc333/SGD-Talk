import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'

export class CdkBucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3Bucket = new s3.Bucket(this,'lecture_first_bucket',{
      bucketName:"lecture-first-bucket-hedaaff",
      publicReadAccess:false,
      autoDeleteObjects:true,
      removalPolicy:cdk.RemovalPolicy.DESTROY
    })
    //autoDeleteObjects requires removalPolisy.DESTROY
    //s3Bucket.grantPublicAccess() same as publicReadAccess from docs(not tested)
    //s3Bucket.grantRead(new iam.AccountPrincipal())
    new s3deploy.BucketDeployment(this, 'DeployFiles', {
      sources: [s3deploy.Source.asset('./deploy_data/')], 
      destinationBucket: s3Bucket,
    });
    


  }
}
