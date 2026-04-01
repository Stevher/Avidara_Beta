"""
Evidara CloudFront Stack
CloudFront distribution fronting Amplify + API Gateway
"""
from aws_cdk import (
    Stack,
    CfnOutput,
    Duration,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    aws_certificatemanager as acm,
    aws_route53 as route53,
    aws_route53_targets as targets,
    aws_wafv2 as wafv2,
)
from constructs import Construct


class EvidaraCloudFrontStack(Stack):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        amplify_app_domain: str,
        api_domain: str | None = None,
        custom_domain: str | None = None,
        certificate_arn: str | None = None,
        waf_web_acl_arn: str | None = None,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Origin for Amplify app
        amplify_origin = origins.HttpOrigin(
            amplify_app_domain,
            protocol_policy=cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
        )

        # Cache policy for static assets
        static_cache_policy = cloudfront.CachePolicy(
            self,
            "StaticCachePolicy",
            cache_policy_name="evidara-static-cache",
            default_ttl=Duration.days(1),
            max_ttl=Duration.days(365),
            min_ttl=Duration.seconds(0),
            enable_accept_encoding_gzip=True,
            enable_accept_encoding_brotli=True,
            header_behavior=cloudfront.CacheHeaderBehavior.none(),
            query_string_behavior=cloudfront.CacheQueryStringBehavior.none(),
            cookie_behavior=cloudfront.CacheCookieBehavior.none(),
        )

        # Cache policy for dynamic content (Next.js SSR)
        dynamic_cache_policy = cloudfront.CachePolicy(
            self,
            "DynamicCachePolicy",
            cache_policy_name="evidara-dynamic-cache",
            default_ttl=Duration.seconds(0),
            max_ttl=Duration.days(1),
            min_ttl=Duration.seconds(0),
            enable_accept_encoding_gzip=True,
            enable_accept_encoding_brotli=True,
            header_behavior=cloudfront.CacheHeaderBehavior.allow_list(
                "Authorization",
                "Accept",
                "Accept-Language",
            ),
            query_string_behavior=cloudfront.CacheQueryStringBehavior.all(),
            cookie_behavior=cloudfront.CacheCookieBehavior.all(),
        )

        # Response headers policy for security
        response_headers_policy = cloudfront.ResponseHeadersPolicy(
            self,
            "SecurityHeadersPolicy",
            response_headers_policy_name="evidara-security-headers",
            security_headers_behavior=cloudfront.ResponseSecurityHeadersBehavior(
                content_type_options=cloudfront.ResponseHeadersContentTypeOptions(
                    override=True
                ),
                frame_options=cloudfront.ResponseHeadersFrameOptions(
                    frame_option=cloudfront.HeadersFrameOption.DENY,
                    override=True,
                ),
                referrer_policy=cloudfront.ResponseHeadersReferrerPolicy(
                    referrer_policy=cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
                    override=True,
                ),
                strict_transport_security=cloudfront.ResponseHeadersStrictTransportSecurity(
                    access_control_max_age=Duration.days(365),
                    include_subdomains=True,
                    preload=True,
                    override=True,
                ),
                xss_protection=cloudfront.ResponseHeadersXSSProtection(
                    protection=True,
                    mode_block=True,
                    override=True,
                ),
            ),
        )

        # Build distribution config
        distribution_props = {
            "default_behavior": cloudfront.BehaviorOptions(
                origin=amplify_origin,
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cache_policy=dynamic_cache_policy,
                response_headers_policy=response_headers_policy,
                allowed_methods=cloudfront.AllowedMethods.ALLOW_ALL,
                cached_methods=cloudfront.CachedMethods.CACHE_GET_HEAD,
            ),
            "additional_behaviors": {
                "/_next/static/*": cloudfront.BehaviorOptions(
                    origin=amplify_origin,
                    viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                    cache_policy=static_cache_policy,
                    response_headers_policy=response_headers_policy,
                ),
                "/static/*": cloudfront.BehaviorOptions(
                    origin=amplify_origin,
                    viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                    cache_policy=static_cache_policy,
                    response_headers_policy=response_headers_policy,
                ),
            },
            "price_class": cloudfront.PriceClass.PRICE_CLASS_100,
            "http_version": cloudfront.HttpVersion.HTTP2_AND_3,
            "minimum_protocol_version": cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
            "enable_logging": True,
        }

        # Add custom domain and certificate if provided
        if custom_domain and certificate_arn:
            certificate = acm.Certificate.from_certificate_arn(
                self, "Certificate", certificate_arn
            )
            distribution_props["domain_names"] = [custom_domain, f"www.{custom_domain}"]
            distribution_props["certificate"] = certificate

        # Add API origin if provided
        if api_domain:
            api_origin = origins.HttpOrigin(
                api_domain,
                protocol_policy=cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
            )
            distribution_props["additional_behaviors"]["/api/*"] = cloudfront.BehaviorOptions(
                origin=api_origin,
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cache_policy=cloudfront.CachePolicy.CACHING_DISABLED,
                origin_request_policy=cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
                allowed_methods=cloudfront.AllowedMethods.ALLOW_ALL,
            )

        # Attach WAF Web ACL if provided
        if waf_web_acl_arn:
            distribution_props["web_acl_id"] = waf_web_acl_arn

        # Create CloudFront distribution
        self.distribution = cloudfront.Distribution(
            self,
            "EvidaraDistribution",
            **distribution_props,
        )

        # Outputs
        CfnOutput(
            self,
            "DistributionId",
            value=self.distribution.distribution_id,
            description="CloudFront Distribution ID",
        )
        CfnOutput(
            self,
            "DistributionDomain",
            value=self.distribution.distribution_domain_name,
            description="CloudFront Distribution Domain",
        )
        CfnOutput(
            self,
            "DistributionUrl",
            value=f"https://{self.distribution.distribution_domain_name}",
            description="CloudFront Distribution URL",
        )
