# Evidara Infrastructure Deployment Guide

Complete guide to deploying the Evidara platform infrastructure on AWS.

## Prerequisites

### Required Tools

1. **AWS CLI** (v2.x)
   ```bash
   aws --version
   # aws-cli/2.x.x
   ```

2. **Python 3.11+**
   ```bash
   python --version
   # Python 3.11.x or higher
   ```

3. **Node.js 20+** (for CDK CLI)
   ```bash
   node --version
   # v20.x.x or higher
   ```

4. **AWS CDK CLI**
   ```bash
   npm install -g aws-cdk
   cdk --version
   # 2.x.x or higher
   ```

### AWS Account Setup

1. **AWS Credentials**
   ```bash
   aws configure
   # AWS Access Key ID: YOUR_ACCESS_KEY
   # AWS Secret Access Key: YOUR_SECRET_KEY
   # Default region: ap-south-1
   # Default output format: json
   ```

2. **Required Permissions**
   Your AWS user/role needs permissions to create:
   - CloudFormation stacks
   - IAM roles and policies
   - EC2 instances, security groups, VPCs
   - S3 buckets
   - DynamoDB tables
   - Cognito User Pools
   - API Gateway
   - CloudFront distributions
   - WAF Web ACLs
   - Amplify apps

---

## First-Time Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-org/evidara.git
cd evidara/apps/infra
```

### 2. Create Python Virtual Environment

```bash
# Create virtual environment
python -m venv .venv

# Activate (Linux/Mac)
source .venv/bin/activate

# Activate (Windows)
.venv\Scripts\activate
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Deployment

```bash
# Copy configuration template
cp config.example.json config.json

# Edit with your values
nano config.json  # or vim, code, etc.
```

See [CONFIGURATION.md](CONFIGURATION.md) for detailed config options.

### 5. Bootstrap CDK

Bootstrap CDK in both regions (required once per account/region):

```bash
# Get your AWS account ID
aws sts get-caller-identity --query Account --output text

# Bootstrap primary region (ap-south-1)
cdk bootstrap aws://YOUR_ACCOUNT_ID/ap-south-1

# Bootstrap WAF region (us-east-1 - required for CloudFront)
cdk bootstrap aws://YOUR_ACCOUNT_ID/us-east-1
```

---

## Deployment

### Preview Changes

Before deploying, preview what will be created:

```bash
# View all changes
cdk diff --all

# View specific stack changes
cdk diff EvidaraEc2Stack
```

### Deploy All Stacks

```bash
# Interactive deployment (asks for approval)
cdk deploy --all

# Auto-approve (CI/CD mode)
cdk deploy --all --require-approval never
```

**Expected deployment time**: 15-25 minutes

### Deploy Individual Stacks

Deploy in dependency order:

```bash
# 1. WAF (us-east-1)
cdk deploy EvidaraWafStack

# 2. Storage & Config
cdk deploy EvidaraS3Stack
cdk deploy EvidaraDynamoDbStack

# 3. Authentication
cdk deploy EvidaraCognitoStack

# 4. Frontend & Backend
cdk deploy EvidaraAmplifyStack
cdk deploy EvidaraEc2Stack

# 5. API & CDN
cdk deploy EvidaraApiGatewayStack
cdk deploy EvidaraCloudFrontStack
```

### Monitor Deployment

Watch CloudFormation progress in AWS Console:
```
https://console.aws.amazon.com/cloudformation/
```

Or use CDK output for real-time progress.

---

## Post-Deployment Setup

### 1. Collect Stack Outputs

```bash
# Get all outputs
aws cloudformation describe-stacks \
  --stack-name EvidaraEc2Stack \
  --query 'Stacks[0].Outputs' \
  --output table

# Save key values:
# - ElasticIP
# - InstanceId
# - UserPoolId (from Cognito stack)
# - WebClientId (from Cognito stack)
# - BucketName (from S3 stack)
# - DistributionUrl (from CloudFront stack)
```

### 2. Configure EC2 Instance

SSH into the instance:

```bash
ssh -i ~/.ssh/your-key.pem ubuntu@<ElasticIP>
```

Or use SSM Session Manager (no SSH key needed):

```bash
aws ssm start-session --target <InstanceId>
```

**Setup Docker Compose**:

```bash
# Create app directory
sudo mkdir -p /opt/evidara
cd /opt/evidara

# Create docker-compose.yml (see docker/ directory in repo)
sudo nano docker-compose.yml

# Create .env file with secrets
sudo nano .env

# Start services
docker compose up -d

# Check status
docker compose ps
docker compose logs -f
```

### 3. Create First Admin User

```bash
# Create admin user in Cognito
aws cognito-idp admin-create-user \
  --user-pool-id <UserPoolId> \
  --username steven@evidara.com \
  --user-attributes \
    Name=email,Value=steven@evidara.com \
    Name=given_name,Value=Steven \
    Name=family_name,Value=Admin \
    Name=custom:tenant_id,Value=evidara \
    Name=custom:organization,Value="Evidara Inc" \
    Name=custom:tenant_role,Value=admin \
  --desired-delivery-mediums EMAIL

# Add to admin group
aws cognito-idp admin-add-user-to-group \
  --user-pool-id <UserPoolId> \
  --username steven@evidara.com \
  --group-name evidara-admin
```

User will receive a temporary password via email.

### 4. Seed Knowledge Base

```bash
# Upload regulatory documents to S3
aws s3 cp ./regulatory-docs/ s3://<BucketName>/kb/ --recursive

# SSH to EC2 and run embeddings
ssh -i ~/.ssh/your-key.pem ubuntu@<ElasticIP>
cd /opt/evidara
python scripts/seed_kb.py
```

### 5. Configure Frontend Environment

Update Amplify environment variables in AWS Console:

```
NEXT_PUBLIC_API_URL=https://<DistributionUrl>
NEXT_PUBLIC_ENVIRONMENT=production
COGNITO_USER_POOL_ID=<UserPoolId>
COGNITO_CLIENT_ID=<WebClientId>
COGNITO_CLIENT_SECRET=<from console>
```

### 6. Test Deployment

Access the application:

```bash
# Frontend
https://<DistributionUrl>

# Health check (public)
https://<DistributionUrl>/api/health
```

---

## Updates & Re-deployment

### Update Infrastructure Code

```bash
# Pull latest changes
git pull origin main

# View changes
cdk diff --all

# Deploy updates
cdk deploy --all
```

### Update Single Stack

```bash
# Example: Update EC2 configuration
cdk diff EvidaraEc2Stack
cdk deploy EvidaraEc2Stack
```

### Rollback

```bash
# Delete stack and redeploy
cdk destroy EvidaraEc2Stack
cdk deploy EvidaraEc2Stack
```

**Note**: Some resources have `RETAIN` policy and won't be deleted:
- Cognito User Pool
- DynamoDB tables
- S3 bucket (if versioning enabled)

---

## Disaster Recovery

### Backup Before Destructive Operations

```bash
# Backup DynamoDB tables
aws dynamodb create-backup \
  --table-name evidara-tenants \
  --backup-name tenants-backup-$(date +%Y%m%d)

# Backup S3 bucket
aws s3 sync s3://<BucketName> ./backup-$(date +%Y%m%d)/

# Export Cognito users
aws cognito-idp list-users \
  --user-pool-id <UserPoolId> \
  > cognito-users-backup-$(date +%Y%m%d).json
```

### Restore from Backup

```bash
# Restore DynamoDB
aws dynamodb restore-table-from-backup \
  --target-table-name evidara-tenants \
  --backup-arn <BackupArn>

# Restore S3
aws s3 sync ./backup-20260323/ s3://<BucketName>/
```

---

## Destroy Infrastructure

### Destroy All Stacks

```bash
# WARNING: This will delete most resources
cdk destroy --all
```

### Destroy Individual Stack

```bash
cdk destroy EvidaraEc2Stack
```

### Manual Cleanup (Retained Resources)

Some resources must be manually deleted:

```bash
# Delete Cognito User Pool
aws cognito-idp delete-user-pool --user-pool-id <UserPoolId>

# Delete DynamoDB tables
aws dynamodb delete-table --table-name evidara-tenants
aws dynamodb delete-table --table-name evidara-rules
# ... repeat for all tables

# Delete S3 bucket (must be empty)
aws s3 rm s3://<BucketName> --recursive
aws s3 rb s3://<BucketName>
```

---

## CI/CD Pipeline (GitHub Actions)

### Setup GitHub Secrets

Configure these secrets in your GitHub repository:

```
AWS_ROLE_ARN=arn:aws:iam::ACCOUNT_ID:role/GitHubActionsRole
AWS_REGION=ap-south-1
```

### Automated Deployment

Workflows are triggered on:
- **infra.yml**: Push to `apps/infra/**` on `main`
- **frontend.yml**: Push to `apps/frontend/**` on `main`
- **deploy.yml**: Manual trigger for full deployment

View workflows: `.github/workflows/`

### Manual Trigger

```bash
# Via GitHub CLI
gh workflow run deploy.yml

# Via GitHub UI
Actions → Deploy → Run workflow
```

---

## Production Deployment Checklist

Before going to production:

- [ ] Configure real SSH IPs in `config.json`
- [ ] Set up custom domain with ACM certificate
- [ ] Enable MFA for all admin users
- [ ] Configure CloudWatch alarms with SNS notifications
- [ ] Set up AWS Backup for automated backups
- [ ] Enable CloudTrail for audit logging
- [ ] Review and tighten security group rules
- [ ] Configure EC2 Auto Scaling (or migrate to ECS)
- [ ] Move PostgreSQL to RDS Multi-AZ
- [ ] Set up monitoring dashboard
- [ ] Document runbooks for common operations
- [ ] Test disaster recovery procedures
- [ ] Review and optimize costs

---

## Next Steps

- [CONFIGURATION.md](CONFIGURATION.md) - Detailed configuration options
- [SECURITY.md](SECURITY.md) - Security hardening guide
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues and solutions
