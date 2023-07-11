import {aws_lambda, aws_s3 as S3} from 'aws-cdk-lib';
import { Construct } from "constructs";

class MyLambda extends Construct{
  constructor(scope:Construct,id:string){
    super(scope,id);
    const bucket = new S3.Bucket(this, "BucketYoutubeVideo")
    const handler = new aws_lambda.Function(this,"handler",{
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      code: aws_lambda.Code.fromAsset("resources"),
      handler: "lambda.main", //file is lambda.ts exported fn is main
      environment: {
        BUCKET:bucket.bucketName
      }
    })
    bucket.grantReadWrite(handler)
  }

}

export default MyLambda
