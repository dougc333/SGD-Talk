import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import MyLamda from './MyLambda'

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myLambda = new MyLamda(this,"my-lambda")
  }
}
