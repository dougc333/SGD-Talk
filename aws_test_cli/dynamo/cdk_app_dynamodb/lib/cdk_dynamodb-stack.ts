import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RemovalPolicy } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';


export class CdkDynamodbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new Table(this, "cdk table",{
      partitionKey:{
        name:"userId",
        type: AttributeType.STRING
      },
      sortKey:{
        name:"date",
        type: AttributeType.STRING
      },
      tableName:"cdk table1",
      removalPolicy: RemovalPolicy.DESTROY
    })
  }
}
