"""
Evidara Cognito Stack
User Pool for authentication with JWT tokens and role-based access control

Roles:
- evidara-admin: Full access - all tenants, KB management, rule updates (Evidara staff)
- {tenant_id}-user: Read/write own tenant prefix in S3, own DynamoDB records (client users)
- {tenant_id}-viewer: Read-only - download reports, view history (client reviewers/approvers)
"""
from aws_cdk import (
    Stack,
    CfnOutput,
    Duration,
    RemovalPolicy,
    aws_cognito as cognito,
    aws_iam as iam,
)
from constructs import Construct


class EvidaraCognitoStack(Stack):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        platform_bucket_arn: str | None = None,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # User Pool - main authentication store
        self.user_pool = cognito.UserPool(
            self,
            "EvidaraUserPool",
            user_pool_name="evidara-users",
            # Sign-in options
            sign_in_aliases=cognito.SignInAliases(
                email=True,
                username=False,
            ),
            # Self sign-up disabled - admin creates users
            self_sign_up_enabled=False,
            # Password policy
            password_policy=cognito.PasswordPolicy(
                min_length=12,
                require_lowercase=True,
                require_uppercase=True,
                require_digits=True,
                require_symbols=True,
                temp_password_validity=Duration.days(7),
            ),
            # MFA
            mfa=cognito.Mfa.OPTIONAL,
            mfa_second_factor=cognito.MfaSecondFactor(
                sms=False,
                otp=True,  # TOTP authenticator apps
            ),
            # Account recovery
            account_recovery=cognito.AccountRecovery.EMAIL_ONLY,
            # Email verification
            auto_verify=cognito.AutoVerifiedAttrs(email=True),
            # Standard attributes
            standard_attributes=cognito.StandardAttributes(
                email=cognito.StandardAttribute(required=True, mutable=True),
                given_name=cognito.StandardAttribute(required=True, mutable=True),
                family_name=cognito.StandardAttribute(required=True, mutable=True),
            ),
            # Custom attributes for Evidara
            custom_attributes={
                # Tenant identifier for multi-tenant isolation
                "tenant_id": cognito.StringAttribute(
                    min_len=1,
                    max_len=64,
                    mutable=False,  # Cannot change tenant after creation
                ),
                # Organization name (display)
                "organization": cognito.StringAttribute(
                    min_len=1,
                    max_len=256,
                    mutable=True,
                ),
                # User role within tenant: admin, user, viewer
                "tenant_role": cognito.StringAttribute(
                    min_len=1,
                    max_len=50,
                    mutable=True,
                ),
            },
            # Keep user pool on stack deletion for data safety
            removal_policy=RemovalPolicy.RETAIN,
        )

        # =====================================================================
        # IAM Roles for Cognito Groups
        # =====================================================================

        # Trust policy for Cognito
        cognito_trust_principal = iam.FederatedPrincipal(
            f"cognito-identity.amazonaws.com",
            conditions={
                "StringEquals": {
                    "cognito-identity.amazonaws.com:aud": self.region,
                },
                "ForAnyValue:StringLike": {
                    "cognito-identity.amazonaws.com:amr": "authenticated",
                },
            },
            assume_role_action="sts:AssumeRoleWithWebIdentity",
        )

        # Admin Role - Full platform access
        self.admin_role = iam.Role(
            self,
            "EvidaraAdminRole",
            role_name="evidara-admin-role",
            assumed_by=iam.ServicePrincipal("cognito-idp.amazonaws.com"),
            description="Full access role for Evidara administrators",
        )

        # Admin permissions - full S3 access to platform bucket
        if platform_bucket_arn:
            self.admin_role.add_to_policy(
                iam.PolicyStatement(
                    effect=iam.Effect.ALLOW,
                    actions=["s3:*"],
                    resources=[
                        platform_bucket_arn,
                        f"{platform_bucket_arn}/*",
                    ],
                )
            )

        # Admin permissions - DynamoDB full access (future)
        self.admin_role.add_to_policy(
            iam.PolicyStatement(
                effect=iam.Effect.ALLOW,
                actions=["dynamodb:*"],
                resources=[f"arn:aws:dynamodb:{self.region}:{self.account}:table/evidara-*"],
            )
        )

        # Admin permissions - Bedrock for KB management
        self.admin_role.add_to_policy(
            iam.PolicyStatement(
                effect=iam.Effect.ALLOW,
                actions=[
                    "bedrock:*KnowledgeBase*",
                    "bedrock:InvokeModel",
                ],
                resources=["*"],
            )
        )

        # Tenant User Role - Read/write own tenant data
        self.tenant_user_role = iam.Role(
            self,
            "EvidaraTenantUserRole",
            role_name="evidara-tenant-user-role",
            assumed_by=iam.ServicePrincipal("cognito-idp.amazonaws.com"),
            description="Read/write access for tenant users to their own data",
        )

        # Tenant user S3 permissions - restricted to tenant prefix
        # Note: Actual tenant_id restriction is enforced via session tags or API
        if platform_bucket_arn:
            self.tenant_user_role.add_to_policy(
                iam.PolicyStatement(
                    effect=iam.Effect.ALLOW,
                    actions=[
                        "s3:GetObject",
                        "s3:PutObject",
                        "s3:DeleteObject",
                        "s3:ListBucket",
                    ],
                    resources=[
                        platform_bucket_arn,
                        f"{platform_bucket_arn}/*",
                    ],
                    # Condition enforced at API level using tenant_id from JWT
                )
            )

        # Tenant Viewer Role - Read-only access
        self.tenant_viewer_role = iam.Role(
            self,
            "EvidaraTenantViewerRole",
            role_name="evidara-tenant-viewer-role",
            assumed_by=iam.ServicePrincipal("cognito-idp.amazonaws.com"),
            description="Read-only access for tenant viewers",
        )

        # Viewer S3 permissions - read-only
        if platform_bucket_arn:
            self.tenant_viewer_role.add_to_policy(
                iam.PolicyStatement(
                    effect=iam.Effect.ALLOW,
                    actions=[
                        "s3:GetObject",
                        "s3:ListBucket",
                    ],
                    resources=[
                        platform_bucket_arn,
                        f"{platform_bucket_arn}/*",
                    ],
                )
            )

        # =====================================================================
        # Cognito User Groups
        # =====================================================================

        # Admin Group - Evidara staff with full access
        self.admin_group = cognito.CfnUserPoolGroup(
            self,
            "EvidaraAdminGroup",
            user_pool_id=self.user_pool.user_pool_id,
            group_name="evidara-admin",
            description="Evidara administrators - full platform access, KB management, rule updates",
            precedence=0,  # Highest priority
            role_arn=self.admin_role.role_arn,
        )

        # Template groups for tenants (actual tenant groups created dynamically)
        # These serve as documentation and can be cloned for new tenants

        # Tenant User Group Template
        self.tenant_user_group = cognito.CfnUserPoolGroup(
            self,
            "TenantUserGroupTemplate",
            user_pool_id=self.user_pool.user_pool_id,
            group_name="tenant-user-template",
            description="Template: Tenant users - read/write own tenant data, upload documents, create reviews",
            precedence=10,
            role_arn=self.tenant_user_role.role_arn,
        )

        # Tenant Viewer Group Template
        self.tenant_viewer_group = cognito.CfnUserPoolGroup(
            self,
            "TenantViewerGroupTemplate",
            user_pool_id=self.user_pool.user_pool_id,
            group_name="tenant-viewer-template",
            description="Template: Tenant viewers - read-only access, download reports, view history",
            precedence=20,
            role_arn=self.tenant_viewer_role.role_arn,
        )

        # =====================================================================
        # App Clients
        # =====================================================================

        # App Client for Next.js frontend
        self.app_client = self.user_pool.add_client(
            "EvidaraWebClient",
            user_pool_client_name="evidara-web-app",
            # Token validity
            access_token_validity=Duration.hours(1),
            id_token_validity=Duration.hours(1),
            refresh_token_validity=Duration.days(30),
            # Auth flows
            auth_flows=cognito.AuthFlow(
                user_srp=True,  # Secure Remote Password
                user_password=False,  # No plain password
                custom=False,
            ),
            # Include groups in token for RBAC
            read_attributes=cognito.ClientAttributes().with_standard_attributes(
                email=True,
                given_name=True,
                family_name=True,
            ).with_custom_attributes(
                "tenant_id",
                "organization",
                "tenant_role",
            ),
            write_attributes=cognito.ClientAttributes().with_standard_attributes(
                given_name=True,
                family_name=True,
            ),
            # OAuth settings
            o_auth=cognito.OAuthSettings(
                flows=cognito.OAuthFlows(
                    authorization_code_grant=True,
                    implicit_code_grant=False,
                ),
                scopes=[
                    cognito.OAuthScope.OPENID,
                    cognito.OAuthScope.EMAIL,
                    cognito.OAuthScope.PROFILE,
                ],
                # Callback URLs - update for production
                callback_urls=[
                    "http://localhost:3000/api/auth/callback",
                    "https://localhost:3000/api/auth/callback",
                ],
                logout_urls=[
                    "http://localhost:3000",
                    "https://localhost:3000",
                ],
            ),
            # Prevent user existence errors (security)
            prevent_user_existence_errors=True,
            # Generate client secret for server-side auth
            generate_secret=True,
        )

        # Resource Server for API scopes
        self.resource_server = self.user_pool.add_resource_server(
            "EvidaraApiResourceServer",
            identifier="evidara-api",
            scopes=[
                # Review scopes
                cognito.ResourceServerScope(
                    scope_name="review.read",
                    scope_description="Read review sessions",
                ),
                cognito.ResourceServerScope(
                    scope_name="review.write",
                    scope_description="Create and update reviews",
                ),
                # Document scopes
                cognito.ResourceServerScope(
                    scope_name="documents.upload",
                    scope_description="Upload documents",
                ),
                cognito.ResourceServerScope(
                    scope_name="documents.delete",
                    scope_description="Delete documents",
                ),
                # Report scopes
                cognito.ResourceServerScope(
                    scope_name="reports.read",
                    scope_description="Read and download reports",
                ),
                cognito.ResourceServerScope(
                    scope_name="reports.generate",
                    scope_description="Generate new reports",
                ),
                # Admin scopes
                cognito.ResourceServerScope(
                    scope_name="admin.users",
                    scope_description="Manage users and tenants",
                ),
                cognito.ResourceServerScope(
                    scope_name="admin.kb",
                    scope_description="Manage knowledge base",
                ),
                cognito.ResourceServerScope(
                    scope_name="admin.rules",
                    scope_description="Manage review rules",
                ),
            ],
        )

        # Machine-to-machine client for backend services
        self.service_client = self.user_pool.add_client(
            "EvidaraServiceClient",
            user_pool_client_name="evidara-service",
            access_token_validity=Duration.hours(1),
            auth_flows=cognito.AuthFlow(
                user_srp=False,
                user_password=False,
                custom=False,
            ),
            o_auth=cognito.OAuthSettings(
                flows=cognito.OAuthFlows(
                    client_credentials=True,
                ),
                scopes=[
                    cognito.OAuthScope.custom("evidara-api/review.read"),
                    cognito.OAuthScope.custom("evidara-api/review.write"),
                    cognito.OAuthScope.custom("evidara-api/documents.upload"),
                    cognito.OAuthScope.custom("evidara-api/documents.delete"),
                    cognito.OAuthScope.custom("evidara-api/reports.read"),
                    cognito.OAuthScope.custom("evidara-api/reports.generate"),
                    cognito.OAuthScope.custom("evidara-api/admin.users"),
                    cognito.OAuthScope.custom("evidara-api/admin.kb"),
                    cognito.OAuthScope.custom("evidara-api/admin.rules"),
                ],
            ),
            generate_secret=True,
        )

        # =====================================================================
        # Outputs
        # =====================================================================
        CfnOutput(
            self,
            "UserPoolId",
            value=self.user_pool.user_pool_id,
            description="Cognito User Pool ID",
        )
        CfnOutput(
            self,
            "UserPoolArn",
            value=self.user_pool.user_pool_arn,
            description="Cognito User Pool ARN",
        )
        CfnOutput(
            self,
            "WebClientId",
            value=self.app_client.user_pool_client_id,
            description="Web App Client ID",
        )
        CfnOutput(
            self,
            "ServiceClientId",
            value=self.service_client.user_pool_client_id,
            description="Service Client ID (M2M)",
        )
        CfnOutput(
            self,
            "AdminGroupName",
            value="evidara-admin",
            description="Admin group name for Evidara staff",
        )
        # Issuer URL for JWT validation
        self.issuer_url = f"https://cognito-idp.{self.region}.amazonaws.com/{self.user_pool.user_pool_id}"
        CfnOutput(
            self,
            "IssuerUrl",
            value=self.issuer_url,
            description="JWT Issuer URL for token validation",
        )
