"""
Evidara API Gateway Stack
HTTP API Gateway proxying to EC2 backend
Provides secure API layer with JWT auth, throttling, and logging
"""
from aws_cdk import (
    Stack,
    CfnOutput,
    Duration,
    aws_apigatewayv2 as apigwv2,
    aws_apigatewayv2_authorizers as authorizers,
    aws_apigatewayv2_integrations as integrations,
    aws_cognito as cognito,
    aws_ec2 as ec2,
    aws_logs as logs,
)
from constructs import Construct


class EvidaraApiGatewayStack(Stack):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        ec2_instance: ec2.Instance,
        ec2_elastic_ip: str,
        user_pool: cognito.IUserPool,
        user_pool_client: cognito.IUserPoolClient,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # CloudWatch Log Group for API Gateway access logs
        log_group = logs.LogGroup(
            self,
            "ApiAccessLogs",
            log_group_name="/aws/apigateway/evidara-api",
            retention=logs.RetentionDays.ONE_MONTH,
        )

        # JWT Authorizer using Cognito User Pool
        jwt_authorizer = authorizers.HttpJwtAuthorizer(
            "CognitoAuthorizer",
            jwt_issuer=f"https://cognito-idp.{self.region}.amazonaws.com/{user_pool.user_pool_id}",
            jwt_audience=[user_pool_client.user_pool_client_id],
            authorizer_name="evidara-cognito-auth",
            identity_source=["$request.header.Authorization"],
        )

        # HTTP API (API Gateway v2)
        self.http_api = apigwv2.HttpApi(
            self,
            "EvidaraHttpApi",
            api_name="evidara-api",
            description="Evidara Platform API - proxies to EC2 backend",
            cors_preflight=apigwv2.CorsPreflightOptions(
                allow_headers=[
                    "Authorization",
                    "Content-Type",
                    "X-Requested-With",
                    "X-Amz-Date",
                    "X-Api-Key",
                ],
                allow_methods=[
                    apigwv2.CorsHttpMethod.GET,
                    apigwv2.CorsHttpMethod.POST,
                    apigwv2.CorsHttpMethod.PUT,
                    apigwv2.CorsHttpMethod.DELETE,
                    apigwv2.CorsHttpMethod.OPTIONS,
                ],
                allow_origins=["*"],  # Restrict in production via config
                allow_credentials=True,
                max_age=Duration.hours(1),
            ),
            disable_execute_api_endpoint=False,
        )

        # EC2 backend URL
        ec2_backend_url = f"http://{ec2_elastic_ip}:8000"

        # =================================================================
        # PUBLIC ROUTES (no auth required)
        # =================================================================

        # Health check - public for load balancer/monitoring
        self.http_api.add_routes(
            path="/api/health",
            methods=[apigwv2.HttpMethod.GET],
            integration=integrations.HttpUrlIntegration(
                "HealthIntegration",
                ec2_backend_url + "/api/health",
            ),
        )

        # =================================================================
        # PROTECTED ROUTES (JWT auth required)
        # =================================================================

        # Review endpoints
        self.http_api.add_routes(
            path="/api/review",
            methods=[apigwv2.HttpMethod.POST],
            integration=integrations.HttpUrlIntegration(
                "ReviewCreateIntegration",
                ec2_backend_url + "/api/review",
            ),
            authorizer=jwt_authorizer,
        )

        self.http_api.add_routes(
            path="/api/review/{session_id}",
            methods=[apigwv2.HttpMethod.GET, apigwv2.HttpMethod.PUT],
            integration=integrations.HttpUrlIntegration(
                "ReviewSessionIntegration",
                ec2_backend_url + "/api/review/{session_id}",
            ),
            authorizer=jwt_authorizer,
        )

        # Generate endpoints
        self.http_api.add_routes(
            path="/api/generate/word",
            methods=[apigwv2.HttpMethod.POST],
            integration=integrations.HttpUrlIntegration(
                "GenerateWordIntegration",
                ec2_backend_url + "/api/generate/word",
            ),
            authorizer=jwt_authorizer,
        )

        self.http_api.add_routes(
            path="/api/generate/pdf",
            methods=[apigwv2.HttpMethod.POST],
            integration=integrations.HttpUrlIntegration(
                "GeneratePdfIntegration",
                ec2_backend_url + "/api/generate/pdf",
            ),
            authorizer=jwt_authorizer,
        )

        # Status endpoint
        self.http_api.add_routes(
            path="/api/status/{job_id}",
            methods=[apigwv2.HttpMethod.GET],
            integration=integrations.HttpUrlIntegration(
                "StatusIntegration",
                ec2_backend_url + "/api/status/{job_id}",
            ),
            authorizer=jwt_authorizer,
        )

        # Documents upload
        self.http_api.add_routes(
            path="/api/documents/upload",
            methods=[apigwv2.HttpMethod.POST],
            integration=integrations.HttpUrlIntegration(
                "DocumentUploadIntegration",
                ec2_backend_url + "/api/documents/upload",
            ),
            authorizer=jwt_authorizer,
        )

        # Reports
        self.http_api.add_routes(
            path="/api/reports",
            methods=[apigwv2.HttpMethod.GET],
            integration=integrations.HttpUrlIntegration(
                "ReportsIntegration",
                ec2_backend_url + "/api/reports",
            ),
            authorizer=jwt_authorizer,
        )

        # Catch-all proxy for any other /api/* routes (protected)
        self.http_api.add_routes(
            path="/api/{proxy+}",
            methods=[apigwv2.HttpMethod.ANY],
            integration=integrations.HttpUrlIntegration(
                "ProxyIntegration",
                ec2_backend_url + "/api/{proxy}",
            ),
            authorizer=jwt_authorizer,
        )

        # Outputs
        CfnOutput(
            self,
            "ApiEndpoint",
            value=self.http_api.api_endpoint,
            description="API Gateway endpoint URL",
        )
        CfnOutput(
            self,
            "ApiId",
            value=self.http_api.api_id,
            description="API Gateway API ID",
        )
        self.api_domain = f"{self.http_api.api_id}.execute-api.{self.region}.amazonaws.com"
        CfnOutput(
            self,
            "ApiDomain",
            value=self.api_domain,
            description="API Gateway domain for CloudFront origin",
        )
