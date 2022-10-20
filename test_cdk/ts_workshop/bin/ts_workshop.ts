#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TsWorkshopStack } from '../lib/ts_workshop-stack';

const app = new cdk.App();
new TsWorkshopStack(app, 'TsWorkshopStack');
