from aws_cdk import aws_ec2 as ec2, aws_ssm as ssm
import aws_cdk as cdk
from constructs import Construct
​
​
app = cdk.App()
​
​
class Producer(cdk.Stack):
    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        vpc = ec2.Vpc(
            self,
            "vpc",
            max_azs=1,
            subnet_configuration=ec2.Vpc.DEFAULT_SUBNETS_NO_NAT,
            nat_gateways=0,
        )
​
        self.endpoint = ec2.InterfaceVpcEndpoint(
            self,
            "endpoint",
            vpc=vpc,
            service=ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
        )
​
​
class ConsumerSynthTimeError(cdk.Stack):
    def __init__(
        self, scope: Construct, id: str, vpc_endpoint_dns_entries: list[str], **kwargs
    ) -> None:
        super().__init__(scope, id, **kwargs)
​
        ssm.StringListParameter(
            self, "parameter", string_list_value=vpc_endpoint_dns_entries
        )
​
​
class ConsumerDeployTimeError(cdk.Stack):
    def __init__(
        self, scope: Construct, id: str, vpc_endpoint_dns_entry: str, **kwargs
    ) -> None:
        super().__init__(scope, id, **kwargs)
​
        ssm.StringParameter(self, "parameter", string_value=vpc_endpoint_dns_entry)
​
​
producer = Producer(app, "producer")
​
# ConsumerSynthTimeError(
#     app, "consumer", vpc_endpoint_dns_entries=producer.endpoint.vpc_endpoint_dns_entries
# )
ConsumerDeployTimeError(
    app,
    "consumer",
    vpc_endpoint_dns_entry=cdk.Fn.select(0, producer.endpoint.vpc_endpoint_dns_entries),
)
​
app.synth()