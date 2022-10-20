#!/usr/bin/env python3
import os

import aws_cdk as cdk

from static_site_python.static_site_python_stack import CdkWorkshopStack


app = cdk.App()
CdkWorkshopStack(app, "CdkWorkshopStack",
    #env=cdk.Environment(account=os.getenv('CDK_DEFAULT_ACCOUNT'), region=os.getenv('CDK_DEFAULT_REGION')),
    env=cdk.Environment(account='669059827483', region='us-west-2'),
    )

app.synth()
