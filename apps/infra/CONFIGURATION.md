# Evidara Infrastructure Configuration

Detailed configuration reference for the Evidara platform.

## Configuration File

The main configuration file is `config.json` (gitignored). Copy from template:

```bash
cp config.example.json config.json
```

## Configuration Schema

```json
{
  "github": {
    "owner": "string",
    "repo": "string",
    "branch": "string"
  },
  "domain": {
    "custom_domain": "string | null",
    "certificate_arn": "string | null"
  },
  "security": {
    "ssh_allowed_ips": ["string"],
    "cloudfront_prefix_list_id": "string"
  },
  "aws": {
    "region": "string"
  }
}
```

---

## GitHub Configuration

### `github.owner`
- **Type**: `string`
- **Required**: Yes
- **Description**: GitHub organization or username
- **Example**: `"evidara-inc"`

### `github.repo`
- **Type**: `string`
- **Required**: Yes
- **Description**: Repository name
- **Example**: `"evidara"`

### `github.branch`
- **Type**: `string`
- **Required**: Yes
- **Description**: Branch for Amplify auto-deploy
- **Default**: `"main"`
- **Example**: `"main"` or `"production"`

---

## Domain Configuration

### `domain.custom_domain`
- **Type**: `string | null`
- **Required**: No
- **Description**: Custom domain for CloudFront distribution
- **Default**: `null` (uses CloudFront default domain)
- **Example**: `"app.evidara.com"`
- **Requirements**:
  - Domain must be registered in Route 53 or external registrar
  - Must have ACM certificate in same account

### `domain.certificate_arn`
- **Type**: `string | null`
- **Required**: Only if `custom_domain` is set
- **Description**: ACM certificate ARN for custom domain
- **Example**: `"arn:aws:acm:us-east-1:123456789012:certificate/abc123..."`
- **Important**: Certificate **must** be in `us-east-1` for CloudFront

**Setting up custom domain**:

```bash
# 1. Request certificate in us-east-1
aws acm request-certificate \
  --domain-name app.evidara.com \
  --validation-method DNS \
  --region us-east-1

# 2. Validate certificate via DNS
# (Add CNAME records to Route 53 or your DNS provider)

# 3. Get certificate ARN
aws acm list-certificates --region us-east-1

# 4. Add to config.json
{
  "domain": {
    "custom_domain": "app.evidara.com",
    "certificate_arn": "arn:aws:acm:us-east-1:123456789012:certificate/..."
  }
}
```

---

## Security Configuration

### `security.ssh_allowed_ips`
- **Type**: `string[]`
- **Required**: Yes
- **Description**: CIDR blocks allowed to SSH into EC2
- **Format**: `"IP_ADDRESS/32"` for single IP, `"IP_ADDRESS/CIDR"` for range
- **Example**: `["102.22.112.29/32", "203.0.113.0/24"]`
- **Default**: `["0.0.0.0/32"]` (placeholder - must be changed)

**Finding your IP**:
```bash
curl https://checkip.amazonaws.com
# Output: 102.22.112.29

# Add to config.json:
"ssh_allowed_ips": ["102.22.112.29/32"]
```

**Important**:
- Remove placeholder `0.0.0.0/32` before deployment
- Use `/32` for single IP addresses
- If no IPs configured, use SSM Session Manager instead

### `security.cloudfront_prefix_list_id`
- **Type**: `string`
- **Required**: Yes
- **Description**: AWS-managed prefix list ID for CloudFront in your region
- **Purpose**: Restricts EC2 HTTP/HTTPS access to CloudFront only

**CloudFront Prefix List IDs by Region**:

| Region | Prefix List ID | Region Name |
|--------|----------------|-------------|
| `us-east-1` | `pl-3b927c52` | N. Virginia |
| `us-east-2` | `pl-b6a144df` | Ohio |
| `us-west-1` | `pl-4fa04526` | N. California |
| `us-west-2` | `pl-82a045eb` | Oregon |
| `ap-south-1` | `pl-9a3b1bf3` | Mumbai (current) |
| `ap-northeast-1` | `pl-58a04531` | Tokyo |
| `ap-southeast-1` | `pl-31a34658` | Singapore |
| `ap-southeast-2` | `pl-b8a742d1` | Sydney |
| `eu-central-1` | `pl-a3a144ca` | Frankfurt |
| `eu-west-1` | `pl-4fa04526` | Ireland |
| `eu-west-2` | `pl-93a247fa` | London |
| `sa-east-1` | `pl-5da64334` | São Paulo |

**Verify prefix list**:
```bash
aws ec2 describe-managed-prefix-lists \
  --filters "Name=prefix-list-name,Values=com.amazonaws.global.cloudfront.origin-facing" \
  --region ap-south-1 \
  --query "PrefixLists[0].PrefixListId" \
  --output text
```

---

## AWS Configuration

### `aws.region`
- **Type**: `string`
- **Required**: Yes
- **Description**: Primary AWS region for infrastructure deployment
- **Default**: `"ap-south-1"`
- **Supported**: Any AWS region with required services

**Important**:
- WAF stack will always deploy to `us-east-1` (CloudFront requirement)
- All other stacks deploy to this region
- Ensure Claude Sonnet 4 is available in target region

**Bedrock Model Availability**:
- `us-east-1`: ✅ Available
- `us-west-2`: ✅ Available
- `ap-south-1`: ✅ Available
- `eu-west-1`: ✅ Available

Check availability: https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html

---

## Example Configurations

### Development (Local Testing)

```json
{
  "github": {
    "owner": "evidara-dev",
    "repo": "evidara",
    "branch": "develop"
  },
  "domain": {
    "custom_domain": null,
    "certificate_arn": null
  },
  "security": {
    "ssh_allowed_ips": ["YOUR_IP/32"],
    "cloudfront_prefix_list_id": "pl-9a3b1bf3"
  },
  "aws": {
    "region": "ap-south-1"
  }
}
```

### Staging

```json
{
  "github": {
    "owner": "evidara-inc",
    "repo": "evidara",
    "branch": "staging"
  },
  "domain": {
    "custom_domain": "staging.evidara.com",
    "certificate_arn": "arn:aws:acm:us-east-1:123456789012:certificate/staging-cert"
  },
  "security": {
    "ssh_allowed_ips": [
      "102.22.112.29/32",
      "203.0.113.50/32"
    ],
    "cloudfront_prefix_list_id": "pl-9a3b1bf3"
  },
  "aws": {
    "region": "ap-south-1"
  }
}
```

### Production

```json
{
  "github": {
    "owner": "evidara-inc",
    "repo": "evidara",
    "branch": "main"
  },
  "domain": {
    "custom_domain": "app.evidara.com",
    "certificate_arn": "arn:aws:acm:us-east-1:123456789012:certificate/prod-cert"
  },
  "security": {
    "ssh_allowed_ips": [
      "102.22.112.29/32",
      "203.0.113.100/32"
    ],
    "cloudfront_prefix_list_id": "pl-9a3b1bf3"
  },
  "aws": {
    "region": "ap-south-1"
  }
}
```

---

## Environment-Specific Configuration

### Multiple Environments

Use separate config files:

```bash
# Development
config.dev.json

# Staging
config.staging.json

# Production
config.prod.json
```

Deploy with specific config:

```bash
# Copy environment config
cp config.prod.json config.json

# Deploy
cdk deploy --all
```

### Environment Variables

Override config via environment variables:

```bash
export AWS_REGION=ap-south-1
export SSH_ALLOWED_IPS="102.22.112.29/32,203.0.113.50/32"

cdk deploy --all
```

---

## Stack-Specific Configuration

### EC2 Instance Type

Default: `t3.large` (2 vCPU, 8GB RAM)

To change, edit `apps/infra/stacks/ec2_stack.py`:

```python
instance_type=ec2.InstanceType("t3.xlarge"),  # 4 vCPU, 16GB RAM
```

### DynamoDB Billing Mode

Default: `PAY_PER_REQUEST` (on-demand)

To use provisioned:

```python
billing_mode=dynamodb.BillingMode.PROVISIONED,
read_capacity=5,
write_capacity=5,
```

### CloudFront Cache Settings

Default TTLs in `cloudfront_stack.py`:

```python
# Static assets: 1 year
default_ttl=Duration.days(365),
max_ttl=Duration.days(365),

# API: No cache
default_ttl=Duration.seconds(0),
```

---

## Secrets Management

### Amplify Environment Variables

Set in AWS Console after deployment:

```
Amplify → App → Environment variables
```

Required variables:

```
NEXT_PUBLIC_API_URL=https://d123abc.cloudfront.net
NEXT_PUBLIC_ENVIRONMENT=production
COGNITO_USER_POOL_ID=ap-south-1_abc123def
COGNITO_CLIENT_ID=1234567890abcdefghij
COGNITO_CLIENT_SECRET=<from AWS Console>
```

### Docker Compose Secrets

Create `.env` file on EC2:

```bash
# /opt/evidara/.env

# Database
POSTGRES_USER=evidara
POSTGRES_PASSWORD=<generate strong password>
POSTGRES_DB=evidara

# Redis
REDIS_PASSWORD=<generate strong password>

# API
API_SECRET_KEY=<generate random key>
AWS_REGION=ap-south-1
S3_BUCKET=evidara-platform-123456789012

# Cognito
COGNITO_USER_POOL_ID=ap-south-1_abc123def
COGNITO_CLIENT_ID=1234567890abcdefghij
```

Generate secrets:

```bash
# Random secret
openssl rand -hex 32

# Strong password
openssl rand -base64 32
```

---

## Validation

### Validate Configuration

```bash
# Check JSON syntax
python -m json.tool config.json

# Validate with CDK
cdk synth --all
```

### Common Validation Errors

```
Error: Invalid CIDR block "0.0.0.0/32"
Solution: Replace with actual IP
```

```
Error: Certificate must be in us-east-1
Solution: Request certificate in us-east-1 region
```

```
Error: Unknown prefix list ID
Solution: Use correct prefix list for your region
```

---

## Next Steps

- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [SECURITY.md](SECURITY.md) - Security best practices
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
