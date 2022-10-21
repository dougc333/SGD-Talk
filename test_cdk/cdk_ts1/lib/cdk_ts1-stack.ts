import * as cdk from 'aws-cdk-lib';
import { Construct, ConstructOrder } from 'constructs';
import { HelloWorld } from './hello-world';




export class CdkTs1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new HelloWorld(this,"hello-world")    
  }
}
