#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkBucketStack } from '../lib/cdk_bucket-stack';

const app = new cdk.App();
//need to define this to get s3Deploy to upload files
const myEnv = {
  account:'669059827483',
  region:'us-west-2',
}
new CdkBucketStack(app, 'CdkBucketStack', {
  env:myEnv
});