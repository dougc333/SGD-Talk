#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TestAwsAuthStack } from '../lib/test_aws_auth-stack';
import {SdkProvider} from  '../node_modules/aws-cdk/lib/api/aws-auth/sdk-provider'

console.log("hello everybody!!!");

//const sdkOptions = parseHttpOptions(options.httpOptions ?? {});
//const chain = await AwsCliCompatible.credentialChain({
//          profile: options.profile,
//          ec2instance: options.ec2creds,
//          containerCreds: options.containerCreds,
//          httpOptions: sdkOptions.httpOptions
//        });

//const region = AwsCliCompatible.region({
//          profile: options.profile,
//          ec2instance: options.ec2creds
// });

//var sdk =   new SdkProvider(chain, region, sdkOptions);
//const app = new cdk.App();
//new TestAwsAuthStack(app, 'TestAwsAuthStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
//});
