"""
Evidara S3 Stack
S3 bucket for system prompts, knowledge base, tenant outputs, and backups
"""
from aws_cdk import (
    Stack,
    RemovalPolicy,
    Duration,
    aws_s3 as s3,
)
from constructs import Construct


class EvidaraS3Stack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Main platform bucket
        self.bucket = s3.Bucket(
            self,
            "EvidaraPlatformBucket",
            bucket_name="evidara-platform",
            versioned=True,
            encryption=s3.BucketEncryption.S3_MANAGED,
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            removal_policy=RemovalPolicy.RETAIN,
            lifecycle_rules=[
                # Move old outputs to Glacier after 90 days
                s3.LifecycleRule(
                    id="ArchiveOldOutputs",
                    prefix="tenants/",
                    transitions=[
                        s3.Transition(
                            storage_class=s3.StorageClass.GLACIER,
                            transition_after=Duration.days(90),
                        )
                    ],
                ),
                # Delete old backups after 30 days
                s3.LifecycleRule(
                    id="CleanupBackups",
                    prefix="backups/",
                    expiration=Duration.days(30),
                ),
            ],
            cors=[
                s3.CorsRule(
                    allowed_methods=[s3.HttpMethods.GET],
                    allowed_origins=["*"],  # Restrict in production
                    allowed_headers=["*"],
                    max_age=3600,
                )
            ],
        )

        # Expected folder structure:
        # s3://evidara-platform/
        # ├── system-prompts/
        # │   └── evidara-ruleset-latest.txt
        # ├── knowledge/
        # │   ├── sahpra/
        # │   ├── ich/
        # │   └── products/{product_id}/pi/
        # ├── tenants/{tenant_id}/
        # │   ├── logos/
        # │   └── outputs/{session_id}/
        # └── backups/
