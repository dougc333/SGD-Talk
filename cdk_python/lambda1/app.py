#!/usr/bin/env python3

import aws_cdk as cdk

from lambda1.lambda1_stack import Lambda1Stack


app = cdk.App()
Lambda1Stack(app, "lambda1")

app.synth()
