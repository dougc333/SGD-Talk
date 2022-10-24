#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TestSampleAppStack } from '../lib/test_sample_app-stack';

const app = new cdk.App();
new TestSampleAppStack(app, 'TestSampleAppStack');
