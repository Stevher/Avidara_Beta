# Evidara Platform Infrastructure

AWS CDK infrastructure for the Evidara pharmaceutical regulatory document review platform.

## Overview

Evidara is a multi-tenant SaaS platform that uses AI (Claude Sonnet 4) to review pharmaceutical regulatory documents, ensuring compliance and generating detailed reports.

### Architecture

```
User → CloudFront (WAF) → Amplify (Frontend) + API Gateway (JWT) → EC2 (Docker) → S3 + DynamoDB + Bedrock
```

### Region Configuration
- **Primary Region**: `ap-south-1` (configurable in `config.json`)
- **WAF Region**: `us-east-1` (AWS requirement for CloudFront - cannot be changed)

---

## Infrastructure Stacks

### 1. **EvidaraWafStack** (us-east-1)
AWS WAF Web ACL for CloudFront protection:
- **AWS Managed Rules**: Common Rule Set, SQL Injection, Known Bad Inputs
- **Rate limiting**: 2000 requests per 5 minutes per IP
- **IP reputation blocking**
- **Must be in us-east-1** (AWS CloudFront requirement)

### 2. **EvidaraS3Stack** (ap-south-1)
S3 bucket for platform storage:
- **Bucket**: `evidara-platform-{account}`
- **Structure**: `prompts/`, `kb/`, `outputs/`, `uploads/`
- **Security**: AES-256 encryption, versioning enabled

### 3. **EvidaraDynamoDbStack** (ap-south-1)
Five DynamoDB tables (pay-per-request, point-in-time recovery):

| Table | Keys | Purpose |
|-------|------|---------|
| `evidara-tenants` | PK: tenant_id | Tenant configurations, settings, quotas |
| `evidara-rules` | PK: tenant_id, SK: rule_id | Review rules per tenant |
| `evidara-sessions` | PK: tenant_id, SK: session_id | Review session tracking |
| `evidara-config` | PK: config_type, SK: config_key | Global platform config |
| `evidara-reports` | PK: tenant_id, SK: report_id | Report metadata |

### 4. **EvidaraCognitoStack** (ap-south-1)
User authentication with role-based access control:

**User Roles**:
- **Admin** (`evidara-admin`) - Full access, KB management, rule updates
- **User** (`{tenant_id}-user`) - Read/write own tenant data
- **Viewer** (`{tenant_id}-viewer`) - Read-only access

**Custom Attributes**: `tenant_id` (immutable), `organization`, `tenant_role`

### 5. **EvidaraAmplifyStack** (ap-south-1)
- **Framework**: Next.js 16
- **Build Path**: `apps/frontend`
- **Auto-deploy**: On push to `main`

### 6. **EvidaraEc2Stack** (ap-south-1)
Backend compute with Docker Compose:
- **Instance**: t3.large (2 vCPU, 8GB RAM)
- **OS**: Ubuntu 24.04 LTS
- **Services**: nginx, FastAPI, Celery, Redis, PostgreSQL (pgvector)

**Security**:
- SSH from configured IPs only
- HTTP/HTTPS from CloudFront only
- Port 8000 open for API Gateway (PoC)

### 7. **EvidaraApiGatewayStack** (ap-south-1)
HTTP API Gateway with JWT authentication:
- **Authorization**: Cognito JWT tokens
- **Routes**: `/api/health` (public), all other `/api/*` (protected)
- **Backend**: Proxies to EC2:8000

### 8. **EvidaraCloudFrontStack** (ap-south-1)
Global CDN with WAF:
- **Origins**: Amplify (frontend), API Gateway (`/api/*`)
- **Caching**: Static assets (long TTL), API (no cache)
- **Security**: TLS 1.2+, HSTS, XSS protection

---

## Architecture Diagram

```
                               ┌─────────────────────────────────────────┐
                               │             INTERNET                    │
                               └─────────────────────────────────────────┘
                                              │
                                              ▼
                               ┌─────────────────────────────────────────┐
                               │         AWS CloudFront (Global)         │
                               │       + WAF (us-east-1 required)        │
                               │                                         │
                               │  Rate Limit │ SQL Injection │ XSS      │
                               └─────────────────────────────────────────┘
                                      │                      │
                                      │ /*                   │ /api/*
                                      ▼                      ▼
                    ┌─────────────────────────┐  ┌────────────────────────────┐
                    │    AWS Amplify          │  │    API Gateway (HTTP v2)   │
                    │   Next.js Frontend      │  │    JWT Auth (Cognito)      │
                    │   (ap-south-1)          │  │    (ap-south-1)            │
                    └─────────────────────────┘  └────────────────────────────┘
                                                              │
                                                              ▼
                               ┌─────────────────────────────────────────┐
                               │        EC2 t3.large (ap-south-1)        │
                               │                                         │
                               │  ┌─────────────────────────────────┐   │
                               │  │      Docker Compose             │   │
                               │  │  nginx │ api │ worker │ redis   │   │
                               │  │        │ postgres (pgvector)    │   │
                               │  └─────────────────────────────────┘   │
                               │                                         │
                               │  Security: SSH from 102.22.112.29/32   │
                               │           HTTP/HTTPS from CloudFront   │
                               └─────────────────────────────────────────┘
                                      │           │            │
                                      ▼           ▼            ▼
                    ┌────────────┐  ┌─────────────┐  ┌──────────────────┐
                    │     S3     │  │  DynamoDB   │  │    Bedrock       │
                    │ (storage)  │  │  (config)   │  │  Claude Sonnet 4 │
                    │ prompts/   │  │  tenants    │  │  Titan Embeddings│
                    │ kb/        │  │  rules      │  │  (ap-south-1)    │
                    │ outputs/   │  │  sessions   │  └──────────────────┘
                    │ uploads/   │  │  reports    │
                    └────────────┘  └─────────────┘

                               ┌─────────────────────────────────────────┐
                               │      Cognito User Pool (ap-south-1)     │
                               │                                         │
                               │  Groups:  evidara-admin                 │
                               │          {tenant}-user                  │
                               │          {tenant}-viewer                │
                               └─────────────────────────────────────────┘
```

---

## Security Features

### Multi-Layer Protection
```
User → WAF → CloudFront → API Gateway (JWT) → EC2
```

- **Data Encryption**: AES-256 (S3, DynamoDB, EBS), TLS 1.2+ in transit
- **Network Isolation**: SSH whitelisted, HTTP/HTTPS from CloudFront only
- **Authentication**: Cognito JWT with MFA support, RBAC via groups
- **Tenant Isolation**: Enforced via JWT claims and IAM policies

---

## Cost Estimate (PoC)

| Service | Monthly Cost |
|---------|--------------|
| EC2 t3.large | $60 |
| CloudFront | $5 |
| Amplify | $5 |
| API Gateway | $3 |
| WAF | $5 |
| DynamoDB | $1 |
| S3 | $1 |
| **Total** | **~$80/month** |

---

## Quick Start

```bash
# 1. Configure
cd apps/infra
cp config.example.json config.json
# Edit config.json with your values

# 2. Deploy
cdk bootstrap aws://ACCOUNT_ID/ap-south-1
cdk bootstrap aws://ACCOUNT_ID/us-east-1
cdk deploy --all
```

For detailed instructions, see:
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Full deployment guide
- **[CONFIGURATION.md](CONFIGURATION.md)** - Configuration details
- **[SECURITY.md](SECURITY.md)** - Security best practices
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues

---

## File Structure

```
apps/infra/
├── README.md                   # This file - infrastructure overview
├── DEPLOYMENT.md               # Deployment guide
├── CONFIGURATION.md            # Configuration reference
├── SECURITY.md                 # Security documentation
├── TROUBLESHOOTING.md          # Troubleshooting guide
├── app.py                      # CDK app entry point
├── config.json                 # Deployment config (gitignored)
├── config.example.json         # Config template
├── requirements.txt            # Python dependencies
├── cdk.json                    # CDK configuration
└── stacks/
    ├── amplify_stack.py
    ├── api_gateway_stack.py
    ├── cloudfront_stack.py
    ├── cognito_stack.py
    ├── dynamodb_stack.py
    ├── ec2_stack.py
    ├── s3_stack.py
    └── waf_stack.py
```

---

## Support

- **Documentation**: See linked guides above
- **GitHub Issues**: Report bugs or feature requests
- **AWS CDK Docs**: [CDK Developer Guide](https://docs.aws.amazon.com/cdk/)

---

## License

Proprietary - Evidara Platform Infrastructure
