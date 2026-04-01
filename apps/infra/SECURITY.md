# Evidara Infrastructure Security

Security best practices and hardening guide for the Evidara platform.

## Security Architecture

### Defense in Depth

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 1: Network Security                                   │
│ - WAF (rate limiting, SQL injection, XSS)                   │
│ - CloudFront (DDoS protection via AWS Shield)               │
│ - Security Groups (restricted ingress/egress)               │
└─────────────────────────────────────────────────────────────┘
            ▼
┌─────────────────────────────────────────────────────────────┐
│ Layer 2: Authentication & Authorization                     │
│ - Cognito JWT tokens with MFA                               │
│ - API Gateway JWT validator                                 │
│ - Role-based access control (RBAC)                          │
└─────────────────────────────────────────────────────────────┘
            ▼
┌─────────────────────────────────────────────────────────────┐
│ Layer 3: Application Security                               │
│ - Tenant isolation via JWT claims                           │
│ - IAM least privilege policies                              │
│ - Input validation at API level                             │
└─────────────────────────────────────────────────────────────┘
            ▼
┌─────────────────────────────────────────────────────────────┐
│ Layer 4: Data Security                                      │
│ - Encryption at rest (S3, DynamoDB, EBS)                    │
│ - Encryption in transit (TLS 1.2+)                          │
│ - Secure secret management                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Network Security

### WAF (Web Application Firewall)

**Current Protection**:
- ✅ AWS Managed Common Rule Set
- ✅ SQL Injection protection
- ✅ Known Bad Inputs blocking
- ✅ Rate limiting: 2000 req/5min per IP
- ✅ IP reputation list

**Production Enhancements**:

```python
# Add custom rate limiting per tenant
wafv2.CfnWebACL.RuleProperty(
    name="TenantRateLimit",
    priority=1,
    action=wafv2.CfnWebACL.RuleActionProperty(block={}),
    statement=wafv2.CfnWebACL.StatementProperty(
        rate_based_statement=wafv2.CfnWebACL.RateBasedStatementProperty(
            limit=1000,  # 1000 requests per 5 minutes per tenant
            aggregate_key_type="CUSTOM_KEYS",
            custom_keys=[
                wafv2.CfnWebACL.RateBasedStatementCustomKeyProperty(
                    header=wafv2.CfnWebACL.RateLimitHeaderProperty(
                        name="X-Tenant-Id",
                        text_transformations=[
                            wafv2.CfnWebACL.TextTransformationProperty(
                                priority=0,
                                type="NONE"
                            )
                        ]
                    )
                )
            ]
        )
    ),
    visibility_config=wafv2.CfnWebACL.VisibilityConfigProperty(
        sampled_requests_enabled=True,
        cloud_watch_metrics_enabled=True,
        metric_name="TenantRateLimit"
    )
)
```

### Security Groups

**Current Rules**:
```
EC2 Security Group:
├─ SSH (22): From configured IPs only
├─ HTTP (80): CloudFront prefix list only
├─ HTTPS (443): CloudFront prefix list only
└─ API (8000): Open (PoC) ⚠️
```

**Production Hardening**:

1. **Remove public port 8000**:
```python
# Delete this rule:
security_group.add_ingress_rule(
    ec2.Peer.any_ipv4(),
    ec2.Port.tcp(8000),
    "..."
)
```

2. **Add VPC Link**:
```python
# API Gateway with VPC Link
vpc_link = apigwv2.VpcLink(
    self, "VpcLink",
    vpc=vpc,
    subnets=ec2.SubnetSelection(subnet_type=ec2.SubnetType.PRIVATE)
)

# Update integration to use VPC Link
integration = apigwv2_integrations.HttpNlbIntegration(
    "EC2Integration",
    listener=nlb_listener,
    vpc_link=vpc_link
)
```

3. **Move EC2 to private subnet**:
```python
vpc_subnets=ec2.SubnetSelection(subnet_type=ec2.SubnetType.PRIVATE)
```

### CloudFront

**Security Headers** (already configured):
- ✅ `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `Content-Security-Policy`

**Additional Headers**:
```python
# Add to cloudfront_stack.py
response_headers_policy = cloudfront.ResponseHeadersPolicy(
    self, "SecurityHeaders",
    security_headers_behavior=cloudfront.ResponseSecurityHeadersBehavior(
        strict_transport_security=cloudfront.ResponseHeadersStrictTransportSecurity(
            access_control_max_age=Duration.seconds(31536000),
            include_subdomains=True,
            preload=True
        ),
        content_type_options=cloudfront.ResponseHeadersContentTypeOptions(
            override=True
        ),
        frame_options=cloudfront.ResponseHeadersFrameOptions(
            frame_option=cloudfront.HeadersFrameOption.DENY,
            override=True
        ),
        xss_protection=cloudfront.ResponseHeadersXSSProtection(
            protection=True,
            mode_block=True,
            override=True
        ),
        referrer_policy=cloudfront.ResponseHeadersReferrerPolicy(
            referrer_policy=cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
            override=True
        )
    )
)
```

---

## Authentication & Authorization

### Cognito Security

**Current Configuration**:
- ✅ Email-only sign-in
- ✅ MFA optional (TOTP)
- ✅ 12+ char complex passwords
- ✅ Self sign-up disabled

**Production Hardening**:

1. **Enforce MFA for admins**:
```bash
# Enable MFA requirement for admin group
aws cognito-idp set-user-mfa-preference \
  --username admin@evidara.com \
  --software-token-mfa-settings Enabled=true,PreferredMfa=true \
  --user-pool-id <UserPoolId>
```

2. **Advanced security features**:
```python
# In cognito_stack.py
user_pool = cognito.UserPool(
    self, "UserPool",
    # ... existing config ...
    advanced_security_mode=cognito.AdvancedSecurityMode.ENFORCED,  # Add this
)
```

3. **Password rotation policy**:
```python
password_policy=cognito.PasswordPolicy(
    min_length=14,  # Increase from 12
    require_lowercase=True,
    require_uppercase=True,
    require_digits=True,
    require_symbols=True,
    temp_password_validity=Duration.days(3),  # Reduce from 7
)
```

### JWT Token Security

**Validation** (already configured):
- ✅ Signature verification
- ✅ Audience check
- ✅ Expiry check (1 hour)
- ✅ Issuer verification

**Token Storage**:
```typescript
// Frontend best practices (Next.js)

// ✅ Store in httpOnly cookie
res.setHeader('Set-Cookie', [
  `access_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
]);

// ❌ Don't store in localStorage
localStorage.setItem('token', token); // VULNERABLE TO XSS
```

### Role-Based Access Control

**Current Groups**:
- `evidara-admin` - Full access
- `{tenant_id}-user` - Tenant-scoped read/write
- `{tenant_id}-viewer` - Tenant-scoped read-only

**Enforce tenant isolation in API**:

```python
# FastAPI middleware
async def verify_tenant_access(
    request: Request,
    token: str = Depends(oauth2_scheme)
):
    payload = jwt.decode(token, ...)
    tenant_id = payload.get("custom:tenant_id")
    requested_tenant = request.path_params.get("tenant_id")

    # Admins can access all tenants
    if "evidara-admin" in payload.get("cognito:groups", []):
        return payload

    # Non-admins must match tenant
    if tenant_id != requested_tenant:
        raise HTTPException(status_code=403, detail="Forbidden")

    return payload
```

---

## Data Security

### Encryption at Rest

**Current State**:
- ✅ S3: AES-256 (SSE-S3)
- ✅ DynamoDB: AWS managed keys
- ✅ EBS: Encrypted volumes

**Production Enhancement (CMK)**:

```python
from aws_cdk import aws_kms as kms

# Create customer-managed key
encryption_key = kms.Key(
    self, "EvidaraKey",
    description="Evidara platform encryption key",
    enable_key_rotation=True,
    removal_policy=RemovalPolicy.RETAIN
)

# Use in S3
bucket = s3.Bucket(
    self, "Bucket",
    encryption=s3.BucketEncryption.KMS,
    encryption_key=encryption_key
)

# Use in DynamoDB
table = dynamodb.Table(
    self, "Table",
    encryption=dynamodb.TableEncryption.CUSTOMER_MANAGED,
    encryption_key=encryption_key
)

# Use in EBS
ec2.BlockDevice(
    device_name="/dev/sda1",
    volume=ec2.BlockDeviceVolume.ebs(
        volume_size=30,
        encrypted=True,
        kms_key=encryption_key  # Add this
    )
)
```

### Encryption in Transit

**Current**:
- ✅ TLS 1.2+ enforced (CloudFront)
- ✅ HTTPS required for all API calls
- ✅ Internal communication unencrypted ⚠️

**Production**:

```python
# Enforce TLS for PostgreSQL
# In docker-compose.yml
environment:
  PGSSLMODE: require

# Enforce TLS for Redis
# In redis.conf
tls-port 6380
tls-cert-file /path/to/redis.crt
tls-key-file /path/to/redis.key
```

### Secrets Management

**Current** (Environment Variables):
- ⚠️ Secrets in `.env` files
- ⚠️ No rotation
- ⚠️ Manual management

**Production (AWS Secrets Manager)**:

```python
from aws_cdk import aws_secretsmanager as secretsmanager

# Create secret
db_secret = secretsmanager.Secret(
    self, "DatabaseSecret",
    description="PostgreSQL credentials",
    generate_secret_string=secretsmanager.SecretStringGenerator(
        secret_string_template=json.dumps({"username": "evidara"}),
        generate_string_key="password",
        exclude_characters="\"@/\\"
    )
)

# Grant EC2 access
db_secret.grant_read(ec2_role)

# Retrieve in application
import boto3
client = boto3.client('secretsmanager')
secret = client.get_secret_value(SecretId='DatabaseSecret')
credentials = json.loads(secret['SecretString'])
```

---

## IAM Security

### Least Privilege

**Current EC2 Role Permissions**:
```python
# Bedrock - specific models only
actions=["bedrock:InvokeModel"],
resources=[
    "arn:aws:bedrock:*:*:foundation-model/anthropic.claude-sonnet-4-*",
    "arn:aws:bedrock:*:*:foundation-model/amazon.titan-embed-text-v1"
]

# S3 - single bucket only
bucket.grant_read_write(role)

# DynamoDB - evidara-* tables only
resources=["arn:aws:dynamodb:*:*:table/evidara-*"]
```

**Production Refinement**:

```python
# Restrict S3 to specific prefixes per service
role.add_to_policy(
    iam.PolicyStatement(
        effect=iam.Effect.ALLOW,
        actions=["s3:GetObject", "s3:PutObject"],
        resources=[
            f"{bucket.bucket_arn}/prompts/*",  # API can read prompts
            f"{bucket.bucket_arn}/uploads/*",  # API can write uploads
        ]
    )
)

# Worker can read/write outputs only
worker_role.add_to_policy(
    iam.PolicyStatement(
        effect=iam.Effect.ALLOW,
        actions=["s3:GetObject", "s3:PutObject"],
        resources=[f"{bucket.bucket_arn}/outputs/*"]
    )
)
```

### Service Control Policies

For organization-wide enforcement:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": [
        "ec2:RunInstances"
      ],
      "Resource": "arn:aws:ec2:*:*:instance/*",
      "Condition": {
        "StringNotEquals": {
          "ec2:InstanceType": [
            "t3.large",
            "t3.xlarge"
          ]
        }
      }
    },
    {
      "Effect": "Deny",
      "Action": [
        "s3:PutObject"
      ],
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": [
            "AES256",
            "aws:kms"
          ]
        }
      }
    }
  ]
}
```

---

## Monitoring & Auditing

### CloudTrail

Enable for all regions:

```python
from aws_cdk import aws_cloudtrail as cloudtrail

trail = cloudtrail.Trail(
    self, "EvidaraTrail",
    is_multi_region_trail=True,
    include_global_service_events=True,
    management_events=cloudtrail.ReadWriteType.ALL,
    s3_bucket_name="evidara-cloudtrail-logs"
)

# Monitor sensitive operations
trail.log_all_s3_data_events()
trail.log_all_lambda_data_events()
```

### CloudWatch Alarms

**Security-relevant alarms**:

```python
# Unauthorized API calls
cloudwatch.Alarm(
    self, "UnauthorizedApiCallsAlarm",
    metric=cloudwatch.Metric(
        namespace="AWS/ApiGateway",
        metric_name="4XXError",
        dimensions_map={"ApiId": api_gateway.api_id},
        statistic="Sum",
        period=Duration.minutes(5)
    ),
    threshold=10,  # >10 unauthorized attempts in 5 min
    evaluation_periods=1,
    alarm_description="Multiple unauthorized API access attempts"
)

# Root account usage
cloudwatch.Alarm(
    self, "RootAccountUsageAlarm",
    metric=cloudwatch.Metric(
        namespace="CloudTrailMetrics",
        metric_name="RootAccountUsage",
        statistic="Sum",
        period=Duration.minutes(1)
    ),
    threshold=1,
    evaluation_periods=1,
    alarm_description="Root account was used"
)

# IAM policy changes
cloudwatch.Alarm(
    self, "IAMPolicyChangesAlarm",
    metric=cloudwatch.Metric(
        namespace="CloudTrailMetrics",
        metric_name="IAMPolicyChanges",
        statistic="Sum",
        period=Duration.minutes(5)
    ),
    threshold=1,
    evaluation_periods=1,
    alarm_description="IAM policy was modified"
)
```

### GuardDuty

Enable AWS GuardDuty for threat detection:

```bash
aws guardduty create-detector \
  --enable \
  --finding-publishing-frequency FIFTEEN_MINUTES
```

---

## Incident Response

### Security Incident Playbook

**1. Detection**
- Monitor CloudWatch alarms
- Review GuardDuty findings
- Check WAF blocked requests

**2. Containment**
```bash
# Immediately block suspicious IP
aws wafv2 update-ip-set \
  --scope CLOUDFRONT \
  --id <IPSetId> \
  --addresses 203.0.113.0/24

# Disable compromised user
aws cognito-idp admin-disable-user \
  --user-pool-id <UserPoolId> \
  --username compromised@user.com

# Rotate secrets
aws secretsmanager rotate-secret \
  --secret-id DatabaseSecret
```

**3. Investigation**
```bash
# Review CloudTrail logs
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=Username,AttributeValue=compromised@user.com \
  --start-time 2026-03-23T00:00:00Z

# Check API Gateway logs
aws logs tail /aws/apigateway/evidara-api --follow
```

**4. Remediation**
- Patch vulnerabilities
- Update security groups
- Rotate all credentials
- Review and update WAF rules

**5. Post-Incident**
- Document lessons learned
- Update runbooks
- Improve monitoring

---

## Compliance

### HIPAA Considerations

If handling PHI (Protected Health Information):

1. **Business Associate Agreement** with AWS
2. **Encryption**: Already compliant ✅
3. **Access Logs**: Enable detailed logging
4. **Audit Trail**: CloudTrail enabled ✅
5. **Data Retention**: Configure lifecycle policies

### GDPR Considerations

If handling EU personal data:

1. **Data Residency**: Deploy in EU region (eu-west-1)
2. **Right to Erasure**: Implement data deletion workflows
3. **Data Portability**: Export functionality
4. **Breach Notification**: Alert system within 72 hours

---

## Security Checklist

### Pre-Production

- [ ] Remove placeholder SSH IPs (`0.0.0.0/32`)
- [ ] Enable MFA for all admin users
- [ ] Rotate all default credentials
- [ ] Enable CloudTrail in all regions
- [ ] Configure CloudWatch alarms
- [ ] Enable GuardDuty
- [ ] Review and tighten security group rules
- [ ] Implement CMK encryption
- [ ] Set up AWS Secrets Manager
- [ ] Configure WAF custom rules
- [ ] Enable AWS Config for compliance
- [ ] Set up SNS for security alerts
- [ ] Document incident response procedures

### Ongoing

- [ ] Weekly: Review GuardDuty findings
- [ ] Weekly: Audit CloudTrail for suspicious activity
- [ ] Monthly: Review and update security groups
- [ ] Monthly: Rotate credentials
- [ ] Quarterly: Penetration testing
- [ ] Quarterly: Security training for team
- [ ] Annually: Full security audit

---

## Next Steps

- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [CONFIGURATION.md](CONFIGURATION.md) - Configuration reference
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
