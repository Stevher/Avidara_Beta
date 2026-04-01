#!/usr/bin/env python3
"""
Evidara Platform - AWS CDK Infrastructure

Architecture:
- Frontend: Next.js on AWS Amplify + CloudFront
- Backend API: API Gateway (JWT auth) → EC2 (PoC) → Lambda (Production)
- Auth: Cognito User Pool with JWT tokens
- Database: PostgreSQL with pgvector (on EC2)
- Config: DynamoDB for tenants, rules, sessions, app config
- AI: Claude Sonnet 4 on Bedrock
- Storage: S3 for prompts, knowledge base, outputs
- Security: WAF + CloudFront + Cognito JWT + API Gateway, SSH restricted to specific IPs

Deployment Regions:
- WAF: us-east-1 (required for CloudFront)
- All other resources: Configurable via config.json (default: ap-south-1)
"""
import json
import os
from pathlib import Path

import aws_cdk as cdk
from stacks.amplify_stack import EvidaraAmplifyStack
from stacks.api_gateway_stack import EvidaraApiGatewayStack
from stacks.cloudfront_stack import EvidaraCloudFrontStack
from stacks.cognito_stack import EvidaraCognitoStack
from stacks.dynamodb_stack import EvidaraDynamoDbStack
from stacks.ec2_stack import EvidaraEc2Stack
from stacks.s3_stack import EvidaraS3Stack
from stacks.waf_stack import EvidaraWafStack

# Load configuration from config.json
config_path = Path(__file__).parent / "config.json"
with open(config_path) as f:
    config = json.load(f)

app = cdk.App()

# AWS Account
aws_account = os.environ.get("CDK_DEFAULT_ACCOUNT")

# Primary region from config (for most resources)
primary_region = config.get("aws", {}).get("region", "ap-south-1")
env_primary = cdk.Environment(account=aws_account, region=primary_region)

# WAF must be deployed in us-east-1 for CloudFront association
env_waf = cdk.Environment(account=aws_account, region="us-east-1")

# Configuration from config.json
github_config = config.get("github", {})
domain_config = config.get("domain", {})
security_config = config.get("security", {})

github_owner = github_config.get("owner", "your-org")
github_repo = github_config.get("repo", "evidara")
github_branch = github_config.get("branch", "main")

custom_domain = domain_config.get("custom_domain")
certificate_arn = domain_config.get("certificate_arn")

ssh_allowed_ips = security_config.get("ssh_allowed_ips", [])
# Filter out placeholder IPs
ssh_allowed_ips = [ip for ip in ssh_allowed_ips if ip != "0.0.0.0/32"]

# CloudFront prefix list ID (region-specific for EC2 security group)
cloudfront_prefix_list_id = security_config.get("cloudfront_prefix_list_id")

# =============================================================================
# WAF Stack - Web Application Firewall (MUST be in us-east-1 for CloudFront)
# =============================================================================
waf_stack = EvidaraWafStack(
    app,
    "EvidaraWafStack",
    env=env_waf,  # Always us-east-1
    cross_region_references=True,
    description="Evidara Platform - WAF Web ACL for CloudFront protection (us-east-1)",
)

# =============================================================================
# S3 Stack - Platform storage
# =============================================================================
s3_stack = EvidaraS3Stack(
    app,
    "EvidaraS3Stack",
    env=env_primary,
    description="Evidara Platform - S3 storage for prompts, knowledge base, outputs",
)

# =============================================================================
# DynamoDB Stack - App configuration, tenant settings, sessions, rules
# =============================================================================
dynamodb_stack = EvidaraDynamoDbStack(
    app,
    "EvidaraDynamoDbStack",
    env=env_primary,
    description="Evidara Platform - DynamoDB tables for config, tenants, sessions, rules",
)

# =============================================================================
# Cognito Stack - User authentication with JWT tokens and RBAC
# Roles: evidara-admin, {tenant_id}-user, {tenant_id}-viewer
# =============================================================================
cognito_stack = EvidaraCognitoStack(
    app,
    "EvidaraCognitoStack",
    platform_bucket_arn=s3_stack.bucket.bucket_arn,
    env=env_primary,
    description="Evidara Platform - Cognito User Pool with role-based access control",
)
cognito_stack.add_dependency(s3_stack)

# =============================================================================
# Amplify Stack - Next.js frontend hosting
# =============================================================================
amplify_stack = EvidaraAmplifyStack(
    app,
    "EvidaraAmplifyStack",
    github_owner=github_owner,
    github_repo=github_repo,
    github_branch=github_branch,
    env=env_primary,
    description="Evidara Platform - Amplify hosting for Next.js frontend",
)

# =============================================================================
# EC2 Stack - Backend API (PoC phase)
# SSH restricted to specific IPs from config.json
# HTTP/HTTPS only from CloudFront prefix list
# =============================================================================
ec2_stack = EvidaraEc2Stack(
    app,
    "EvidaraEc2Stack",
    bucket=s3_stack.bucket,
    ssh_allowed_ips=ssh_allowed_ips if ssh_allowed_ips else None,
    cloudfront_prefix_list_id=cloudfront_prefix_list_id,
    env=env_primary,
    description="Evidara Platform - EC2 backend API with Docker Compose",
)
ec2_stack.add_dependency(s3_stack)

# =============================================================================
# API Gateway Stack - HTTP API proxying to EC2
# JWT authentication via Cognito, throttling, and logging
# =============================================================================
api_gateway_stack = EvidaraApiGatewayStack(
    app,
    "EvidaraApiGatewayStack",
    ec2_instance=ec2_stack.instance,
    ec2_elastic_ip=ec2_stack.eip.ref,
    user_pool=cognito_stack.user_pool,
    user_pool_client=cognito_stack.app_client,
    env=env_primary,
    description="Evidara Platform - API Gateway with JWT auth proxying to EC2",
)
api_gateway_stack.add_dependency(ec2_stack)
api_gateway_stack.add_dependency(cognito_stack)

# =============================================================================
# CloudFront Stack - CDN fronting Amplify + API Gateway, protected by WAF
# Note: CloudFront is global but we deploy config in primary region
# WAF Web ACL is referenced cross-region from us-east-1
# =============================================================================
cloudfront_stack = EvidaraCloudFrontStack(
    app,
    "EvidaraCloudFrontStack",
    amplify_app_domain=f"main.{amplify_stack.amplify_app.default_domain}",
    api_domain=api_gateway_stack.api_domain,
    custom_domain=custom_domain,
    certificate_arn=certificate_arn,
    waf_web_acl_arn=waf_stack.web_acl.attr_arn,
    env=env_primary,
    cross_region_references=True,
    description="Evidara Platform - CloudFront CDN distribution with WAF",
)
cloudfront_stack.add_dependency(amplify_stack)
cloudfront_stack.add_dependency(api_gateway_stack)
cloudfront_stack.add_dependency(waf_stack)

app.synth()
