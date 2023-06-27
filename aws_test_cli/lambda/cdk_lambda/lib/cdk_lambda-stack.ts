import {Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Function,Runtime}  from 'aws-cdk-lib/aws-lambda';

export class CdkLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lam = new Function(this,"Lambda",{
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code:
    })
  }
}
