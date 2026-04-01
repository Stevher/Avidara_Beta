"""
Evidara Pipeline Stack
CI/CD pipeline for deploying to EC2
"""
from aws_cdk import (
    Stack,
    aws_ec2 as ec2,
    aws_codepipeline as codepipeline,
    aws_codepipeline_actions as codepipeline_actions,
    aws_codebuild as codebuild,
    aws_iam as iam,
)
from constructs import Construct


class EvidaraPipelineStack(Stack):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        ec2_instance: ec2.Instance,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # CodeBuild project for building Docker images
        build_project = codebuild.PipelineProject(
            self,
            "EvidaraBuildProject",
            project_name="evidara-build",
            description="Build Evidara Docker images",
            environment=codebuild.BuildEnvironment(
                build_image=codebuild.LinuxBuildImage.STANDARD_7_0,
                privileged=True,  # Required for Docker builds
            ),
            build_spec=codebuild.BuildSpec.from_object(
                {
                    "version": "0.2",
                    "phases": {
                        "install": {
                            "runtime-versions": {"python": "3.12"},
                        },
                        "pre_build": {
                            "commands": [
                                "echo Logging in to Amazon ECR...",
                                "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com",
                            ]
                        },
                        "build": {
                            "commands": [
                                "echo Building Docker images...",
                                "docker compose -f docker/docker-compose.yml build",
                                "docker tag evidara-api:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/evidara-api:$CODEBUILD_RESOLVED_SOURCE_VERSION",
                                "docker tag evidara-worker:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/evidara-worker:$CODEBUILD_RESOLVED_SOURCE_VERSION",
                            ]
                        },
                        "post_build": {
                            "commands": [
                                "echo Pushing Docker images...",
                                "docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/evidara-api:$CODEBUILD_RESOLVED_SOURCE_VERSION",
                                "docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/evidara-worker:$CODEBUILD_RESOLVED_SOURCE_VERSION",
                            ]
                        },
                    },
                }
            ),
        )

        # Grant ECR permissions to CodeBuild
        build_project.add_to_role_policy(
            iam.PolicyStatement(
                effect=iam.Effect.ALLOW,
                actions=[
                    "ecr:GetAuthorizationToken",
                    "ecr:BatchCheckLayerAvailability",
                    "ecr:GetDownloadUrlForLayer",
                    "ecr:BatchGetImage",
                    "ecr:PutImage",
                    "ecr:InitiateLayerUpload",
                    "ecr:UploadLayerPart",
                    "ecr:CompleteLayerUpload",
                ],
                resources=["*"],
            )
        )

        # Deploy project - deploys to EC2 via SSM
        deploy_project = codebuild.PipelineProject(
            self,
            "EvidaraDeployProject",
            project_name="evidara-deploy",
            description="Deploy Evidara to EC2",
            environment=codebuild.BuildEnvironment(
                build_image=codebuild.LinuxBuildImage.STANDARD_7_0,
            ),
            build_spec=codebuild.BuildSpec.from_object(
                {
                    "version": "0.2",
                    "phases": {
                        "build": {
                            "commands": [
                                f"aws ssm send-command --instance-ids {ec2_instance.instance_id} --document-name AWS-RunShellScript --parameters 'commands=[\"cd /opt/evidara && git pull && docker compose pull && docker compose up -d\"]'",
                            ]
                        },
                    },
                }
            ),
        )

        # Grant SSM permissions
        deploy_project.add_to_role_policy(
            iam.PolicyStatement(
                effect=iam.Effect.ALLOW,
                actions=["ssm:SendCommand", "ssm:GetCommandInvocation"],
                resources=["*"],
            )
        )
