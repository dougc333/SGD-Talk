import {Stack,StackProps}  from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb'; 

export class Cdk2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new Table(this,"secondTable",{
      partitionKey: {
        name:"id",
        type:AttributeType.STRING
      },
      sortKey: {
        name:"sortname",
        type:AttributeType.STRING
      },
    })
  }
}
