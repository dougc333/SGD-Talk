import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CdkApp from '../lib/cdk_app-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk_app-stack.ts
test('DynamoDB Created', () => {
   const app = new cdk.App();
//     // WHEN
   const stack = new CdkApp.CdkAppStack(app, 'MyTestStack');
//     // THEN
   const template = Template.fromStack(stack);
  console.log("template:",JSON.stringify(template))
  template.hasResourceProperties('AWS::DynamoDB::Table', {
     //VisibilityTimeout: 300
  });
});
