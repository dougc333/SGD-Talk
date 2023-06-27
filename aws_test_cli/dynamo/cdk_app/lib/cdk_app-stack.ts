import {Stack,StackProps,RemovalPolicy} from 'aws-cdk-lib';
import {Table,AttributeType} from 'aws-cdk-lib/aws-dynamodb'

import { Construct } from 'constructs';

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
     new Table(this,"doesntWorkTable",{
      partitionKey:{
        name:'id',
        type:AttributeType.STRING
      },
      sortKey:{
        name:'date',
        type:AttributeType.STRING
      }
     })
  }
}
