#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkBucketStack } from '../lib/cdk_bucket-stack';

const app = new cdk.App();
new CdkBucketStack(app, 'CdkBucketStack', {
  
});