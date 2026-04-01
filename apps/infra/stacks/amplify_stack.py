"""
Evidara Amplify Stack
AWS Amplify hosting for Next.js frontend with CloudFront
"""
from aws_cdk import (
    Stack,
    CfnOutput,
    SecretValue,
    aws_amplify_alpha as amplify,
    aws_iam as iam,
)
from constructs import Construct


class EvidaraAmplifyStack(Stack):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        github_owner: str,
        github_repo: str,
        github_branch: str = "main",
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Amplify App for Next.js frontend
        self.amplify_app = amplify.App(
            self,
            "EvidaraFrontend",
            app_name="evidara-frontend",
            source_code_provider=amplify.GitHubSourceCodeProvider(
                owner=github_owner,
                repository=github_repo,
                oauth_token=SecretValue.secrets_manager("github-token"),
            ),
            auto_branch_deletion=True,
            build_spec=amplify.BuildSpec.from_object_to_yaml(
                {
                    "version": 1,
                    "applications": [
                        {
                            "appRoot": "apps/frontend",
                            "frontend": {
                                "phases": {
                                    "preBuild": {
                                        "commands": [
                                            "nvm use 20",
                                            "npm install -g yarn",
                                            "yarn install --frozen-lockfile",
                                        ]
                                    },
                                    "build": {
                                        "commands": [
                                            "yarn build",
                                        ]
                                    },
                                },
                                "artifacts": {
                                    "baseDirectory": ".next",
                                    "files": ["**/*"],
                                },
                                "cache": {
                                    "paths": [
                                        "node_modules/**/*",
                                        ".next/cache/**/*",
                                    ]
                                },
                            },
                        }
                    ],
                }
            ),
            environment_variables={
                "AMPLIFY_MONOREPO_APP_ROOT": "apps/frontend",
                "_CUSTOM_IMAGE": "amplify:al2023",
            },
        )

        # Main branch
        main_branch = self.amplify_app.add_branch(
            "main",
            branch_name=github_branch,
            stage=amplify.BranchStage.PRODUCTION,
            auto_build=True,
        )

        # Preview branches for PRs
        self.amplify_app.add_branch(
            "develop",
            branch_name="develop",
            stage=amplify.BranchStage.DEVELOPMENT,
            auto_build=True,
        )

        # Custom domain (optional - configure after deployment)
        # self.amplify_app.add_domain(
        #     "EvidaraDomain",
        #     domain_name="evidara.com",
        #     sub_domains=[
        #         amplify.SubDomain(branch=main_branch, prefix=""),
        #         amplify.SubDomain(branch=main_branch, prefix="www"),
        #     ],
        # )

        # Outputs
        CfnOutput(
            self,
            "AmplifyAppId",
            value=self.amplify_app.app_id,
            description="Amplify App ID",
        )
        CfnOutput(
            self,
            "AmplifyAppUrl",
            value=f"https://main.{self.amplify_app.default_domain}",
            description="Amplify App URL",
        )
