'''
# Welcome to your CDK TypeScript Construct Library project

You should explore the contents of this project. It demonstrates a CDK Construct Library that includes a construct (`CdkJsii`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The construct defines an interface (`CdkJsiiProps`) to configure the visibility timeout of the queue.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
'''
import abc
import builtins
import datetime
import enum
import typing

import jsii
import publication
import typing_extensions

from typeguard import check_type

from ._jsii import *

import aws_cdk.aws_s3
import constructs


class CdkJsii(
    constructs.Construct,
    metaclass=jsii.JSIIMeta,
    jsii_type="cdk_jsii.CdkJsii",
):
    def __init__(self, scope: constructs.Construct, id: builtins.str) -> None:
        '''
        :param scope: -
        :param id: -
        '''
        if __debug__:
            def stub(scope: constructs.Construct, id: builtins.str) -> None:
                ...
            type_hints = typing.get_type_hints(stub)
            check_type(argname="argument scope", value=scope, expected_type=type_hints["scope"])
            check_type(argname="argument id", value=id, expected_type=type_hints["id"])
        jsii.create(self.__class__, self, [scope, id])

    @builtins.property
    @jsii.member(jsii_name="targetBucket")
    def target_bucket(self) -> aws_cdk.aws_s3.Bucket:
        return typing.cast(aws_cdk.aws_s3.Bucket, jsii.get(self, "targetBucket"))

    @builtins.property
    @jsii.member(jsii_name="targetKeyIdSsmParameterName")
    def target_key_id_ssm_parameter_name(self) -> builtins.str:
        return typing.cast(builtins.str, jsii.get(self, "targetKeyIdSsmParameterName"))


__all__ = [
    "CdkJsii",
]

publication.publish()
