from aws_cdk import (
    # Duration,
    Stack,
    aws_s3,
    # aws_sqs as sqs,
)

from constructs import Construct

class CdkBucketStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        aws_s3.Bucket(
            self,
            "cdk_bucket",
            bucket_name = "asdfbucket"
        )
    
