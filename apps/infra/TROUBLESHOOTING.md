# Evidara Infrastructure Troubleshooting

Common issues and solutions for the Evidara platform infrastructure.

## Table of Contents

- [CDK Issues](#cdk-issues)
- [Deployment Failures](#deployment-failures)
- [EC2 Issues](#ec2-issues)
- [Networking Issues](#networking-issues)
- [Authentication Issues](#authentication-issues)
- [Performance Issues](#performance-issues)
- [Cost Issues](#cost-issues)

---

## CDK Issues

### Error: "Need to perform AWS calls for account"

**Symptom**:
```
Error: Need to perform AWS calls for account 123456789012, but no credentials have been configured
```

**Cause**: AWS credentials not configured

**Solution**:
```bash
# Configure AWS CLI
aws configure

# Or use environment variables
export AWS_ACCESS_KEY_ID=your-key
export AWS_SECRET_ACCESS_KEY=your-secret
export AWS_DEFAULT_REGION=ap-south-1

# Verify
aws sts get-caller-identity
```

---

### Error: "This stack uses assets, so the toolkit stack must be deployed"

**Symptom**:
```
Error: This stack uses assets, so the toolkit stack must be deployed to the environment
```

**Cause**: CDK not bootstrapped in target region

**Solution**:
```bash
# Get your account ID
aws sts get-caller-identity --query Account --output text

# Bootstrap primary region
cdk bootstrap aws://ACCOUNT_ID/ap-south-1

# Bootstrap WAF region
cdk bootstrap aws://ACCOUNT_ID/us-east-1
```

---

### Error: "Resolution error: Cannot use resource in a cross-environment fashion"

**Symptom**:
```
Resolution error: Cannot use resource 'EvidaraWafStack/WebAcl' in a cross-environment fashion
```

**Cause**: Missing `cross_region_references=True`

**Solution**:
```python
# In app.py - ensure these stacks have cross_region_references=True
waf_stack = EvidaraWafStack(
    app,
    "EvidaraWafStack",
    env=env_waf,
    cross_region_references=True,  # ✅ Add this
    ...
)

cloudfront_stack = EvidaraCloudFrontStack(
    app,
    "EvidaraCloudFrontStack",
    ...
    cross_region_references=True,  # ✅ Add this
    ...
)
```

---

## Deployment Failures

### Error: "Invalid CIDR block 0.0.0.0/32"

**Symptom**:
```
CREATE_FAILED | AWS::EC2::SecurityGroup
Invalid CIDR block: 0.0.0.0/32 is not a valid CIDR block
```

**Cause**: Placeholder IP in config

**Solution**:
```json
// config.json - replace with actual IP
{
  "security": {
    "ssh_allowed_ips": [
      "YOUR_ACTUAL_IP/32"  // ✅ Replace 0.0.0.0/32
    ]
  }
}
```

Find your IP:
```bash
curl https://checkip.amazonaws.com
```

---

### Error: "Certificate must be in us-east-1"

**Symptom**:
```
CREATE_FAILED | AWS::CloudFront::Distribution
The certificate must be in region us-east-1
```

**Cause**: ACM certificate in wrong region

**Solution**:
```bash
# Request certificate in us-east-1
aws acm request-certificate \
  --domain-name app.evidara.com \
  --validation-method DNS \
  --region us-east-1  # ✅ Must be us-east-1

# Get certificate ARN
aws acm list-certificates --region us-east-1
```

---

### Error: "Resource limit exceeded"

**Symptom**:
```
CREATE_FAILED | AWS::EC2::Instance
You have exceeded the maximum number of instances for your account
```

**Cause**: AWS account limits

**Solution**:
```bash
# Check current limits
aws service-quotas list-service-quotas \
  --service-code ec2 \
  --query 'Quotas[?QuotaName==`Running On-Demand Standard instances`]'

# Request increase
aws service-quotas request-service-quota-increase \
  --service-code ec2 \
  --quota-code L-1216C47A \
  --desired-value 10
```

Or use AWS Console: Service Quotas → EC2 → Request increase

---

### Stack stuck in "UPDATE_ROLLBACK_FAILED"

**Symptom**:
```
Stack EvidaraEc2Stack is in UPDATE_ROLLBACK_FAILED state
```

**Cause**: Resource failed to rollback

**Solution**:
```bash
# Continue rollback (skip failed resources)
aws cloudformation continue-update-rollback \
  --stack-name EvidaraEc2Stack \
  --resources-to-skip FailedResourceLogicalId

# Or delete and redeploy
cdk destroy EvidaraEc2Stack
cdk deploy EvidaraEc2Stack
```

---

## EC2 Issues

### Cannot SSH into EC2 instance

**Symptom**:
```
ssh: connect to host X.X.X.X port 22: Connection refused
```

**Diagnosis**:
```bash
# 1. Check instance is running
aws ec2 describe-instances \
  --instance-ids i-1234567890abcdef0 \
  --query 'Reservations[0].Instances[0].State.Name'

# 2. Check security group
aws ec2 describe-security-groups \
  --group-ids sg-abc123 \
  --query 'SecurityGroups[0].IpPermissions'

# 3. Verify your current IP
curl https://checkip.amazonaws.com
```

**Solutions**:

**Solution 1**: Your IP changed
```json
// Update config.json with new IP
{
  "security": {
    "ssh_allowed_ips": ["NEW_IP/32"]
  }
}
```
```bash
cdk deploy EvidaraEc2Stack
```

**Solution 2**: Use SSM Session Manager (no SSH key needed)
```bash
aws ssm start-session --target i-1234567890abcdef0
```

**Solution 3**: Add IP temporarily via console
```bash
aws ec2 authorize-security-group-ingress \
  --group-id sg-abc123 \
  --protocol tcp \
  --port 22 \
  --cidr YOUR_IP/32
```

---

### Docker not running on EC2

**Symptom**:
```
Cannot connect to the Docker daemon
```

**Diagnosis**:
```bash
# SSH to instance
ssh ubuntu@X.X.X.X

# Check Docker status
sudo systemctl status docker
```

**Solution**:
```bash
# Start Docker
sudo systemctl start docker

# Enable on boot
sudo systemctl enable docker

# Check logs
sudo journalctl -u docker -n 50
```

---

### EC2 out of disk space

**Symptom**:
```
No space left on device
```

**Diagnosis**:
```bash
# Check disk usage
df -h

# Check Docker disk usage
docker system df
```

**Solution**:
```bash
# Clean up Docker
docker system prune -a --volumes

# Increase EBS volume size
aws ec2 modify-volume \
  --volume-id vol-abc123 \
  --size 50  # Increase from 30GB to 50GB

# Extend filesystem (SSH to instance)
sudo growpart /dev/xvda 1
sudo resize2fs /dev/xvda1
```

---

## Networking Issues

### API returns "502 Bad Gateway"

**Symptom**:
```
GET /api/health → 502 Bad Gateway
```

**Diagnosis**:
```bash
# Check API Gateway endpoint
curl https://abc123.execute-api.ap-south-1.amazonaws.com/api/health

# SSH to EC2 and check API
curl http://localhost:8000/api/health

# Check Docker logs
docker compose logs api
```

**Solutions**:

**Solution 1**: API not running
```bash
cd /opt/evidara
docker compose up -d
```

**Solution 2**: Port 8000 blocked
```bash
# Verify security group allows API Gateway
aws ec2 describe-security-groups --group-ids sg-abc123
```

**Solution 3**: API Gateway integration incorrect
```bash
# Check API Gateway logs
aws logs tail /aws/apigateway/evidara-api --follow
```

---

### CloudFront returns "403 Forbidden"

**Symptom**:
```
GET https://d123abc.cloudfront.net/ → 403 Forbidden
```

**Diagnosis**:
```bash
# Check CloudFront distribution status
aws cloudfront get-distribution --id E123ABC

# Check WAF rules
aws wafv2 get-web-acl \
  --scope CLOUDFRONT \
  --id abc123 \
  --region us-east-1
```

**Solutions**:

**Solution 1**: Distribution still deploying
```bash
# Wait for status: Deployed
aws cloudfront get-distribution \
  --id E123ABC \
  --query 'Distribution.Status'
```

**Solution 2**: WAF blocking requests
```bash
# Check WAF logs
aws logs tail /aws/wafv2/cloudfront --follow

# Temporarily disable WAF rule
aws wafv2 update-web-acl \
  --scope CLOUDFRONT \
  --id abc123 \
  --region us-east-1 \
  --lock-token <token> \
  --rules <modified-rules>
```

---

### Amplify build fails

**Symptom**:
```
Amplify build failed with exit code 1
```

**Diagnosis**:
```bash
# Check build logs in Amplify console
# Or via CLI
aws amplify get-job \
  --app-id d123abc \
  --branch-name main \
  --job-id 1
```

**Solutions**:

**Solution 1**: Missing environment variables
```bash
# Add in Amplify console:
# Amplify → App → Environment variables
NEXT_PUBLIC_API_URL=https://...
```

**Solution 2**: Wrong build path
```bash
# Verify in Amplify build settings
# Should be: apps/frontend
```

**Solution 3**: Node version mismatch
```
# In amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 20  # Force Node 20
        - yarn install
```

---

## Authentication Issues

### JWT token invalid

**Symptom**:
```
GET /api/review → 401 Unauthorized
{"message": "Unauthorized"}
```

**Diagnosis**:
```bash
# Decode JWT token
echo "YOUR_TOKEN" | jq -R 'split(".") | .[1] | @base64d | fromjson'

# Check token expiry
# Check audience matches WebClientId
# Check issuer matches Cognito User Pool
```

**Solutions**:

**Solution 1**: Token expired
```javascript
// Frontend: Refresh token
const newToken = await Auth.currentSession()
```

**Solution 2**: Wrong audience
```python
# API Gateway authorizer expects:
# aud = <WebClientId>
# iss = https://cognito-idp.ap-south-1.amazonaws.com/<UserPoolId>
```

**Solution 3**: User not in correct group
```bash
# Add user to group
aws cognito-idp admin-add-user-to-group \
  --user-pool-id <UserPoolId> \
  --username user@example.com \
  --group-name evidara-admin
```

---

### Cannot create Cognito user

**Symptom**:
```
An error occurred (InvalidPasswordException): Password did not conform with policy
```

**Solution**:
```bash
# Password must be:
# - At least 12 characters
# - Contain uppercase letter
# - Contain lowercase letter
# - Contain number
# - Contain special character

# Example strong password
openssl rand -base64 16
```

---

### MFA not working

**Symptom**:
```
Code mismatch and fail enable Software Token MFA
```

**Solutions**:

**Solution 1**: Time drift
```bash
# Ensure server/phone time is synced
# Use NTP server
```

**Solution 2**: Wrong secret scanned
```bash
# Generate new MFA secret
aws cognito-idp associate-software-token \
  --session <session>
```

---

## Performance Issues

### High EC2 CPU usage

**Diagnosis**:
```bash
# SSH to instance
top

# Check specific processes
docker stats

# CloudWatch metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/EC2 \
  --metric-name CPUUtilization \
  --dimensions Name=InstanceId,Value=i-abc123 \
  --start-time 2026-03-23T00:00:00Z \
  --end-time 2026-03-23T23:59:59Z \
  --period 3600 \
  --statistics Average
```

**Solutions**:

**Solution 1**: Increase instance size
```python
# In ec2_stack.py
instance_type=ec2.InstanceType("t3.xlarge"),  # Upgrade from t3.large
```

**Solution 2**: Scale horizontally
```bash
# Add Auto Scaling Group
# Or migrate to ECS/Fargate
```

---

### Slow API responses

**Diagnosis**:
```bash
# Check API response time
time curl https://d123abc.cloudfront.net/api/health

# Check database performance
docker compose exec postgres psql -U evidara -c "SELECT * FROM pg_stat_activity;"

# Check Redis
docker compose exec redis redis-cli info stats
```

**Solutions**:

**Solution 1**: Add database indexes
```sql
CREATE INDEX idx_sessions_tenant ON evidara_sessions(tenant_id);
CREATE INDEX idx_sessions_status ON evidara_sessions(status);
```

**Solution 2**: Enable CloudFront caching for static assets
```python
# Already configured for /_next/static/*
# Add more paths if needed
```

**Solution 3**: Optimize Bedrock calls
```python
# Cache embedding results in DynamoDB
# Reduce max_tokens for faster responses
```

---

### DynamoDB throttling

**Symptom**:
```
ProvisionedThroughputExceededException
```

**Diagnosis**:
```bash
# Check throttled requests
aws cloudwatch get-metric-statistics \
  --namespace AWS/DynamoDB \
  --metric-name UserErrors \
  --dimensions Name=TableName,Value=evidara-sessions \
  --start-time 2026-03-23T00:00:00Z \
  --end-time 2026-03-23T23:59:59Z \
  --period 3600 \
  --statistics Sum
```

**Solution**:
```python
# Already using on-demand mode ✅
# If using provisioned:
billing_mode=dynamodb.BillingMode.PROVISIONED,
read_capacity=10,  # Increase
write_capacity=10,  # Increase
auto_scaling=True
```

---

## Cost Issues

### Unexpected charges

**Diagnosis**:
```bash
# Check cost by service
aws ce get-cost-and-usage \
  --time-period Start=2026-03-01,End=2026-03-31 \
  --granularity MONTHLY \
  --metrics UnblendedCost \
  --group-by Type=DIMENSION,Key=SERVICE

# Enable Cost Explorer in console
```

**Common causes**:

1. **CloudFront data transfer** - Cache more aggressively
2. **NAT Gateway** - Remove if using default VPC
3. **DynamoDB reads/writes** - Review access patterns
4. **Bedrock token usage** - Cache results, reduce max_tokens
5. **EC2 running 24/7** - Consider stopping in dev

**Solutions**:

```bash
# Set up billing alerts
aws cloudwatch put-metric-alarm \
  --alarm-name HighBillingAlert \
  --alarm-description "Alert when bill exceeds $100" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 21600 \
  --threshold 100 \
  --comparison-operator GreaterThanThreshold

# Set up budget
aws budgets create-budget \
  --account-id <account-id> \
  --budget file://budget.json
```

---

## Getting Help

### Enable Debug Logging

```python
# CDK
export CDK_DEBUG=true
cdk deploy --all --verbose

# CloudFormation
aws cloudformation describe-stack-events \
  --stack-name EvidaraEc2Stack \
  --max-items 50
```

### Collect Diagnostic Info

```bash
#!/bin/bash
# collect-diagnostics.sh

echo "=== CDK Version ==="
cdk --version

echo "=== AWS CLI Version ==="
aws --version

echo "=== AWS Identity ==="
aws sts get-caller-identity

echo "=== Stack Status ==="
aws cloudformation list-stacks \
  --query "StackSummaries[?contains(StackName, 'Evidara')].{Name:StackName,Status:StackStatus}"

echo "=== EC2 Instances ==="
aws ec2 describe-instances \
  --filters "Name=tag:aws:cloudformation:stack-name,Values=EvidaraEc2Stack" \
  --query "Reservations[].Instances[].{ID:InstanceId,State:State.Name,IP:PublicIpAddress}"

echo "=== API Gateway ==="
aws apigatewayv2 get-apis \
  --query "Items[?contains(Name, 'evidara')].{Name:Name,Endpoint:ApiEndpoint}"
```

### Contact Support

- **GitHub Issues**: https://github.com/your-org/evidara/issues
- **AWS Support**: https://console.aws.amazon.com/support/
- **Internal Team**: #evidara-infra Slack channel

---

## Next Steps

- [README.md](README.md) - Infrastructure overview
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [CONFIGURATION.md](CONFIGURATION.md) - Configuration reference
- [SECURITY.md](SECURITY.md) - Security best practices
