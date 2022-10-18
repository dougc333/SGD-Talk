from aws_cdk import CfnOutput, Stack
from static_site import StaticSitePrivateS3, StaticSitePublicS3


class StaticSiteStack(Stack):
    def __init__(
        self,
        scope, 
        construct_id,
        props, 
        **kwargs
        ):
        site_domain_name = props["domain_name"]
        if props["sub_domain_name"]:
            site_domain_name = (
                f'{props["sub_domain_name"]}.{props["domain_name"]}'
            )

        if props["enable_s3_website_endpoint"]:
            site = StaticSitePublicS3(
                self,
                f"{props['namespace']}-construct",
                site_domain_name = site_domain_name,
                domain_certificate_arn = props["domain_certificate_arn"],
                origin_referer_header_parameter_name=props[
                    "origin_custom_header_parameter_name"
                ],
               hosted_zone_id = props["hosted_zone_id"],
               hosted_zone_name = props["hosted_zone_name"], 
            )
        else:
            site = StaticSitePrivateS3(
                self,
                f"{props['namespace']}-construct",
                site_domain_name = site_domain_name,
                domain_certificate_arn = props["domain_certificate_arn"],
                hosted_zone_id = props["hosted_zone_id"],
                hosted_zone_name = props["hosted_zone_name"]
            )

            CfnOutput(
                self,
                "SiteBucketName",
                value = site.bucket.bucket_name
            )
            CfnOutput(
                self,
                "DistributionId",
                value = site.distribution.distribution_id
            )
            CfnOutput(
                self,
                "CertificateArn",
                value = site.certificate.certificate_arn
            )

