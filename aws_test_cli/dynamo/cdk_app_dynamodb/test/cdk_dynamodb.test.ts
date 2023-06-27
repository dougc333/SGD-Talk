 import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
 import * as CdkDynamodb from '../lib/cdk_dynamodb-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk_dynamodb-stack.ts
test('Dynamodb putitem', () => {
   const app = new cdk.App();
   console.log("app:",app)
   const stack = new CdkDynamodb.CdkDynamodbStack(app, 'MyTestStack');
//    
//   const template = Template.fromStack(stack);

//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
});
