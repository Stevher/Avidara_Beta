"""
Evidara DynamoDB Stack
Tables for app configuration, tenant settings, review rules, and session tracking

Tables:
- evidara-tenants: Tenant configurations and settings
- evidara-rules: Review rules and templates per tenant
- evidara-sessions: Review session tracking and history
- evidara-config: Global platform configuration
"""
from aws_cdk import (
    Stack,
    CfnOutput,
    RemovalPolicy,
    aws_dynamodb as dynamodb,
)
from constructs import Construct


class EvidaraDynamoDbStack(Stack):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # =====================================================================
        # Tenants Table - Multi-tenant configuration
        # PK: tenant_id
        # =====================================================================
        self.tenants_table = dynamodb.Table(
            self,
            "TenantsTable",
            table_name="evidara-tenants",
            partition_key=dynamodb.Attribute(
                name="tenant_id",
                type=dynamodb.AttributeType.STRING,
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            point_in_time_recovery=True,
            removal_policy=RemovalPolicy.RETAIN,
        )

        # =====================================================================
        # Rules Table - Review rules and templates per tenant
        # PK: tenant_id, SK: rule_id
        # GSI: rule_type for querying all rules of a type
        # =====================================================================
        self.rules_table = dynamodb.Table(
            self,
            "RulesTable",
            table_name="evidara-rules",
            partition_key=dynamodb.Attribute(
                name="tenant_id",
                type=dynamodb.AttributeType.STRING,
            ),
            sort_key=dynamodb.Attribute(
                name="rule_id",
                type=dynamodb.AttributeType.STRING,
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            point_in_time_recovery=True,
            removal_policy=RemovalPolicy.RETAIN,
        )

        # GSI for querying rules by type across tenants (admin use)
        self.rules_table.add_global_secondary_index(
            index_name="rule-type-index",
            partition_key=dynamodb.Attribute(
                name="rule_type",
                type=dynamodb.AttributeType.STRING,
            ),
            sort_key=dynamodb.Attribute(
                name="tenant_id",
                type=dynamodb.AttributeType.STRING,
            ),
            projection_type=dynamodb.ProjectionType.ALL,
        )

        # =====================================================================
        # Sessions Table - Review session tracking
        # PK: tenant_id, SK: session_id
        # GSI: status for querying active/pending sessions
        # GSI: created_at for time-based queries
        # =====================================================================
        self.sessions_table = dynamodb.Table(
            self,
            "SessionsTable",
            table_name="evidara-sessions",
            partition_key=dynamodb.Attribute(
                name="tenant_id",
                type=dynamodb.AttributeType.STRING,
            ),
            sort_key=dynamodb.Attribute(
                name="session_id",
                type=dynamodb.AttributeType.STRING,
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            point_in_time_recovery=True,
            removal_policy=RemovalPolicy.RETAIN,
            # TTL for auto-cleanup of old sessions (optional)
            time_to_live_attribute="ttl",
        )

        # GSI for querying sessions by status
        self.sessions_table.add_global_secondary_index(
            index_name="status-index",
            partition_key=dynamodb.Attribute(
                name="tenant_id",
                type=dynamodb.AttributeType.STRING,
            ),
            sort_key=dynamodb.Attribute(
                name="status",
                type=dynamodb.AttributeType.STRING,
            ),
            projection_type=dynamodb.ProjectionType.ALL,
        )

        # GSI for querying sessions by user
        self.sessions_table.add_global_secondary_index(
            index_name="user-index",
            partition_key=dynamodb.Attribute(
                name="user_id",
                type=dynamodb.AttributeType.STRING,
            ),
            sort_key=dynamodb.Attribute(
                name="created_at",
                type=dynamodb.AttributeType.STRING,
            ),
            projection_type=dynamodb.ProjectionType.ALL,
        )

        # =====================================================================
        # Config Table - Global platform configuration
        # PK: config_type (e.g., "prompts", "models", "features")
        # SK: config_key
        # =====================================================================
        self.config_table = dynamodb.Table(
            self,
            "ConfigTable",
            table_name="evidara-config",
            partition_key=dynamodb.Attribute(
                name="config_type",
                type=dynamodb.AttributeType.STRING,
            ),
            sort_key=dynamodb.Attribute(
                name="config_key",
                type=dynamodb.AttributeType.STRING,
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            point_in_time_recovery=True,
            removal_policy=RemovalPolicy.RETAIN,
        )

        # =====================================================================
        # Reports Table - Generated report metadata
        # PK: tenant_id, SK: report_id
        # =====================================================================
        self.reports_table = dynamodb.Table(
            self,
            "ReportsTable",
            table_name="evidara-reports",
            partition_key=dynamodb.Attribute(
                name="tenant_id",
                type=dynamodb.AttributeType.STRING,
            ),
            sort_key=dynamodb.Attribute(
                name="report_id",
                type=dynamodb.AttributeType.STRING,
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            point_in_time_recovery=True,
            removal_policy=RemovalPolicy.RETAIN,
        )

        # GSI for querying reports by session
        self.reports_table.add_global_secondary_index(
            index_name="session-index",
            partition_key=dynamodb.Attribute(
                name="session_id",
                type=dynamodb.AttributeType.STRING,
            ),
            sort_key=dynamodb.Attribute(
                name="created_at",
                type=dynamodb.AttributeType.STRING,
            ),
            projection_type=dynamodb.ProjectionType.ALL,
        )

        # =====================================================================
        # Outputs
        # =====================================================================
        CfnOutput(
            self,
            "TenantsTableName",
            value=self.tenants_table.table_name,
            description="Tenants configuration table",
        )
        CfnOutput(
            self,
            "TenantsTableArn",
            value=self.tenants_table.table_arn,
            description="Tenants table ARN",
        )
        CfnOutput(
            self,
            "RulesTableName",
            value=self.rules_table.table_name,
            description="Review rules table",
        )
        CfnOutput(
            self,
            "SessionsTableName",
            value=self.sessions_table.table_name,
            description="Review sessions table",
        )
        CfnOutput(
            self,
            "ConfigTableName",
            value=self.config_table.table_name,
            description="Platform config table",
        )
        CfnOutput(
            self,
            "ReportsTableName",
            value=self.reports_table.table_name,
            description="Reports metadata table",
        )
