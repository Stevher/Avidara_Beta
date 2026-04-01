"""
Evidara WAF Stack
AWS WAF Web ACL for CloudFront and ALB protection
"""
from aws_cdk import (
    Stack,
    CfnOutput,
    aws_wafv2 as wafv2,
)
from constructs import Construct


class EvidaraWafStack(Stack):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # WAF Web ACL for CloudFront (must be in us-east-1)
        self.web_acl = wafv2.CfnWebACL(
            self,
            "EvidaraWebAcl",
            name="evidara-web-acl",
            scope="CLOUDFRONT",  # CLOUDFRONT for CloudFront, REGIONAL for ALB/API Gateway
            default_action=wafv2.CfnWebACL.DefaultActionProperty(allow={}),
            visibility_config=wafv2.CfnWebACL.VisibilityConfigProperty(
                cloud_watch_metrics_enabled=True,
                metric_name="evidara-waf-metrics",
                sampled_requests_enabled=True,
            ),
            rules=[
                # AWS Managed Rules - Common Rule Set
                wafv2.CfnWebACL.RuleProperty(
                    name="AWS-AWSManagedRulesCommonRuleSet",
                    priority=1,
                    override_action=wafv2.CfnWebACL.OverrideActionProperty(none={}),
                    statement=wafv2.CfnWebACL.StatementProperty(
                        managed_rule_group_statement=wafv2.CfnWebACL.ManagedRuleGroupStatementProperty(
                            vendor_name="AWS",
                            name="AWSManagedRulesCommonRuleSet",
                        )
                    ),
                    visibility_config=wafv2.CfnWebACL.VisibilityConfigProperty(
                        cloud_watch_metrics_enabled=True,
                        metric_name="AWS-AWSManagedRulesCommonRuleSet",
                        sampled_requests_enabled=True,
                    ),
                ),
                # AWS Managed Rules - Known Bad Inputs
                wafv2.CfnWebACL.RuleProperty(
                    name="AWS-AWSManagedRulesKnownBadInputsRuleSet",
                    priority=2,
                    override_action=wafv2.CfnWebACL.OverrideActionProperty(none={}),
                    statement=wafv2.CfnWebACL.StatementProperty(
                        managed_rule_group_statement=wafv2.CfnWebACL.ManagedRuleGroupStatementProperty(
                            vendor_name="AWS",
                            name="AWSManagedRulesKnownBadInputsRuleSet",
                        )
                    ),
                    visibility_config=wafv2.CfnWebACL.VisibilityConfigProperty(
                        cloud_watch_metrics_enabled=True,
                        metric_name="AWS-AWSManagedRulesKnownBadInputsRuleSet",
                        sampled_requests_enabled=True,
                    ),
                ),
                # AWS Managed Rules - SQL Injection
                wafv2.CfnWebACL.RuleProperty(
                    name="AWS-AWSManagedRulesSQLiRuleSet",
                    priority=3,
                    override_action=wafv2.CfnWebACL.OverrideActionProperty(none={}),
                    statement=wafv2.CfnWebACL.StatementProperty(
                        managed_rule_group_statement=wafv2.CfnWebACL.ManagedRuleGroupStatementProperty(
                            vendor_name="AWS",
                            name="AWSManagedRulesSQLiRuleSet",
                        )
                    ),
                    visibility_config=wafv2.CfnWebACL.VisibilityConfigProperty(
                        cloud_watch_metrics_enabled=True,
                        metric_name="AWS-AWSManagedRulesSQLiRuleSet",
                        sampled_requests_enabled=True,
                    ),
                ),
                # AWS Managed Rules - Linux OS
                wafv2.CfnWebACL.RuleProperty(
                    name="AWS-AWSManagedRulesLinuxRuleSet",
                    priority=4,
                    override_action=wafv2.CfnWebACL.OverrideActionProperty(none={}),
                    statement=wafv2.CfnWebACL.StatementProperty(
                        managed_rule_group_statement=wafv2.CfnWebACL.ManagedRuleGroupStatementProperty(
                            vendor_name="AWS",
                            name="AWSManagedRulesLinuxRuleSet",
                        )
                    ),
                    visibility_config=wafv2.CfnWebACL.VisibilityConfigProperty(
                        cloud_watch_metrics_enabled=True,
                        metric_name="AWS-AWSManagedRulesLinuxRuleSet",
                        sampled_requests_enabled=True,
                    ),
                ),
                # Rate limiting - 2000 requests per 5 minutes per IP
                wafv2.CfnWebACL.RuleProperty(
                    name="RateLimitRule",
                    priority=5,
                    action=wafv2.CfnWebACL.RuleActionProperty(block={}),
                    statement=wafv2.CfnWebACL.StatementProperty(
                        rate_based_statement=wafv2.CfnWebACL.RateBasedStatementProperty(
                            limit=2000,
                            aggregate_key_type="IP",
                        )
                    ),
                    visibility_config=wafv2.CfnWebACL.VisibilityConfigProperty(
                        cloud_watch_metrics_enabled=True,
                        metric_name="RateLimitRule",
                        sampled_requests_enabled=True,
                    ),
                ),
                # Block requests from known bad IP reputation list
                wafv2.CfnWebACL.RuleProperty(
                    name="AWS-AWSManagedRulesAmazonIpReputationList",
                    priority=6,
                    override_action=wafv2.CfnWebACL.OverrideActionProperty(none={}),
                    statement=wafv2.CfnWebACL.StatementProperty(
                        managed_rule_group_statement=wafv2.CfnWebACL.ManagedRuleGroupStatementProperty(
                            vendor_name="AWS",
                            name="AWSManagedRulesAmazonIpReputationList",
                        )
                    ),
                    visibility_config=wafv2.CfnWebACL.VisibilityConfigProperty(
                        cloud_watch_metrics_enabled=True,
                        metric_name="AWS-AWSManagedRulesAmazonIpReputationList",
                        sampled_requests_enabled=True,
                    ),
                ),
                # Block anonymous/bot traffic
                wafv2.CfnWebACL.RuleProperty(
                    name="AWS-AWSManagedRulesAnonymousIpList",
                    priority=7,
                    override_action=wafv2.CfnWebACL.OverrideActionProperty(none={}),
                    statement=wafv2.CfnWebACL.StatementProperty(
                        managed_rule_group_statement=wafv2.CfnWebACL.ManagedRuleGroupStatementProperty(
                            vendor_name="AWS",
                            name="AWSManagedRulesAnonymousIpList",
                        )
                    ),
                    visibility_config=wafv2.CfnWebACL.VisibilityConfigProperty(
                        cloud_watch_metrics_enabled=True,
                        metric_name="AWS-AWSManagedRulesAnonymousIpList",
                        sampled_requests_enabled=True,
                    ),
                ),
            ],
        )

        # Outputs
        CfnOutput(
            self,
            "WebAclArn",
            value=self.web_acl.attr_arn,
            description="WAF Web ACL ARN",
        )
        CfnOutput(
            self,
            "WebAclId",
            value=self.web_acl.attr_id,
            description="WAF Web ACL ID",
        )
