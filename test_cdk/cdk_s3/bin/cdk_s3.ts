#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkS3Stack } from '../lib/cdk_s3-stack';
//import {SdkProvider} from 'aws-cdk/lib/api/aws-auth'
//import {AwsCliCompatible} from 'aws-cdk/lib/api/aws-auth/awscli-compatible'
const app = new cdk.App();

//const sdkOptions = parseHttpOptions(options.httpOptions ?? {});
//const chain =  AwsCliCompatible.credentialChain({
//          profile: options.profile,
//          ec2instance: options.ec2creds,
//          containerCreds: options.containerCreds,
//         
//        });

//const region = AwsCliCompatible.region({
//          profile: options.profile,
//          ec2instance: options.ec2creds
// });


//new SdkProvider();


new CdkS3Stack(app, 'CdkS3Stack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  //env: { account: '669059827483', region: 'us-west-2' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});