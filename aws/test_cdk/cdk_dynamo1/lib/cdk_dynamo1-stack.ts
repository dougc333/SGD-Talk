import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {DynamoDashboard} from "./dynamoDashboard"
import * as dynamo from "aws-cdk-lib/aws-dynamodb"

export class CdkDynamo1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new DynamoDashboard(this,`DynamoDashboard`,{
      columnCount:2,
      title:"Dynamo_Dashboard",
      widgetHeight:6,
    });

    new dynamo.Table(this,`FirstTable`,{
      partitionKey:{
        name:"pk",
        type:dynamo.AttributeType.STRING,
      },
    });
    new dynamo.Table(this, `SecondTable`,{
      partitionKey:{
        name:"pk",
        type:dynamo.AttributeType.STRING,
      },
    });
  }
}
