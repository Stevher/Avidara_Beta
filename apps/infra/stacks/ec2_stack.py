"""
Evidara EC2 Stack
t3.large instance with Docker Compose for PoC deployment
SSH restricted to specific IPs, HTTP/HTTPS only from CloudFront
"""
from aws_cdk import (
    Stack,
    CfnOutput,
    Duration,
    aws_ec2 as ec2,
    aws_iam as iam,
    aws_s3 as s3,
    aws_cloudwatch as cloudwatch,
    aws_cloudwatch_actions as cw_actions,
    aws_sns as sns,
)
from constructs import Construct


class EvidaraEc2Stack(Stack):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        bucket: s3.Bucket,
        ssh_allowed_ips: list[str] | None = None,
        cloudfront_prefix_list_id: str | None = None,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Default SSH IPs - configure via CDK context
        # cdk deploy -c ssh_allowed_ips="1.2.3.4/32,5.6.7.8/32"
        if ssh_allowed_ips is None:
            ssh_allowed_ips = self.node.try_get_context("ssh_allowed_ips")
            if ssh_allowed_ips:
                ssh_allowed_ips = [ip.strip() for ip in ssh_allowed_ips.split(",")]
            else:
                # Placeholder - MUST be configured before deployment
                ssh_allowed_ips = []

        # VPC - use default VPC for PoC
        vpc = ec2.Vpc.from_lookup(self, "DefaultVpc", is_default=True)

        # Security Group - Restricted access
        security_group = ec2.SecurityGroup(
            self,
            "EvidaraSecurityGroup",
            vpc=vpc,
            description="Evidara Platform - SSH from allowed IPs only, HTTP/HTTPS from CloudFront",
            allow_all_outbound=True,
        )

        # SSH - Only from specific IPs
        if ssh_allowed_ips:
            for ip in ssh_allowed_ips:
                security_group.add_ingress_rule(
                    ec2.Peer.ipv4(ip),
                    ec2.Port.tcp(22),
                    f"SSH from {ip}",
                )
        else:
            # If no IPs configured, use SSM Session Manager instead
            CfnOutput(
                self,
                "SSHWarning",
                value="No SSH IPs configured. Use SSM Session Manager for access.",
                description="SSH Access Warning",
            )

        # HTTP/HTTPS - Only from CloudFront (via AWS managed prefix list)
        # CloudFront prefix list IDs vary by region:
        # - us-east-1: pl-3b927c52
        # - ap-south-1: pl-9a3b1bf3
        # Configure via config.json security.cloudfront_prefix_list_id
        if cloudfront_prefix_list_id:
            cloudfront_prefix_list = ec2.Peer.prefix_list(cloudfront_prefix_list_id)
            security_group.add_ingress_rule(
                cloudfront_prefix_list,
                ec2.Port.tcp(80),
                "HTTP from CloudFront only",
            )
            security_group.add_ingress_rule(
                cloudfront_prefix_list,
                ec2.Port.tcp(443),
                "HTTPS from CloudFront only",
            )

        # Port 8000 - API Gateway HTTP API backend access
        # PoC: Open to all (API Gateway has no prefix list, WAF + throttling provide protection)
        # Production: Use VPC Link with private subnets instead
        security_group.add_ingress_rule(
            ec2.Peer.any_ipv4(),
            ec2.Port.tcp(8000),
            "API Gateway backend access (PoC - use VPC Link in production)",
        )

        # IAM Instance Role - Bedrock + S3 access
        role = iam.Role(
            self,
            "EvidaraInstanceRole",
            assumed_by=iam.ServicePrincipal("ec2.amazonaws.com"),
            description="Evidara EC2 instance role with Bedrock and S3 access",
        )

        # Bedrock permissions - Claude Sonnet 4 + Titan Embeddings
        # Uses stack region - ensure models are available in target region
        role.add_to_policy(
            iam.PolicyStatement(
                effect=iam.Effect.ALLOW,
                actions=["bedrock:InvokeModel"],
                resources=[
                    f"arn:aws:bedrock:{self.region}::foundation-model/anthropic.claude-sonnet-4-*",
                    f"arn:aws:bedrock:{self.region}::foundation-model/amazon.titan-embed-text-v1",
                ],
            )
        )

        # S3 permissions for platform bucket
        bucket.grant_read_write(role)

        # DynamoDB permissions for all evidara-* tables
        role.add_to_policy(
            iam.PolicyStatement(
                effect=iam.Effect.ALLOW,
                actions=[
                    "dynamodb:GetItem",
                    "dynamodb:PutItem",
                    "dynamodb:UpdateItem",
                    "dynamodb:DeleteItem",
                    "dynamodb:Query",
                    "dynamodb:Scan",
                    "dynamodb:BatchGetItem",
                    "dynamodb:BatchWriteItem",
                ],
                resources=[
                    f"arn:aws:dynamodb:{self.region}:{self.account}:table/evidara-*",
                    f"arn:aws:dynamodb:{self.region}:{self.account}:table/evidara-*/index/*",
                ],
            )
        )

        # SSM for remote management (alternative to SSH)
        role.add_managed_policy(
            iam.ManagedPolicy.from_aws_managed_policy_name(
                "AmazonSSMManagedInstanceCore"
            )
        )

        # CloudWatch Logs for container logging
        role.add_to_policy(
            iam.PolicyStatement(
                effect=iam.Effect.ALLOW,
                actions=[
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents",
                ],
                resources=["arn:aws:logs:*:*:*"],
            )
        )

        # User data script - install Docker, Docker Compose, clone repo
        user_data = ec2.UserData.for_linux()
        user_data.add_commands(
            "#!/bin/bash",
            "set -ex",
            "",
            "# Update system",
            "apt-get update && apt-get upgrade -y",
            "",
            "# Install Docker",
            "apt-get install -y apt-transport-https ca-certificates curl software-properties-common",
            "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg",
            'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null',
            "apt-get update",
            "apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin",
            "",
            "# Enable Docker service",
            "systemctl enable docker",
            "systemctl start docker",
            "",
            "# Add ubuntu user to docker group",
            "usermod -aG docker ubuntu",
            "",
            "# Create data directory for PostgreSQL (will be mounted from EBS)",
            "mkdir -p /data/pgdata",
            "chown -R 999:999 /data/pgdata",
            "",
            "# Create app directory",
            "mkdir -p /opt/evidara",
            "chown -R ubuntu:ubuntu /opt/evidara",
            "",
            "# Install AWS CLI v2",
            "curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o 'awscliv2.zip'",
            "apt-get install -y unzip",
            "unzip awscliv2.zip",
            "./aws/install",
            "rm -rf aws awscliv2.zip",
            "",
            "# Install CloudWatch agent",
            "wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb",
            "dpkg -i -E ./amazon-cloudwatch-agent.deb",
            "rm amazon-cloudwatch-agent.deb",
        )

        # EC2 Instance - t3.large
        self.instance = ec2.Instance(
            self,
            "EvidaraInstance",
            instance_type=ec2.InstanceType("t3.large"),
            machine_image=ec2.MachineImage.lookup(
                name="ubuntu/images/hvm-ssd/ubuntu-noble-24.04-amd64-server-*",
                owners=["099720109477"],  # Canonical
            ),
            vpc=vpc,
            vpc_subnets=ec2.SubnetSelection(subnet_type=ec2.SubnetType.PUBLIC),
            security_group=security_group,
            role=role,
            user_data=user_data,
            block_devices=[
                # Root volume - 30GB
                ec2.BlockDevice(
                    device_name="/dev/sda1",
                    volume=ec2.BlockDeviceVolume.ebs(
                        volume_size=30,
                        volume_type=ec2.EbsDeviceVolumeType.GP3,
                        encrypted=True,
                        delete_on_termination=True,
                    ),
                ),
                # Data volume - 20GB for PostgreSQL
                ec2.BlockDevice(
                    device_name="/dev/sdf",
                    volume=ec2.BlockDeviceVolume.ebs(
                        volume_size=20,
                        volume_type=ec2.EbsDeviceVolumeType.GP3,
                        encrypted=True,
                        delete_on_termination=False,  # Preserve data on termination
                    ),
                ),
            ],
        )

        # Elastic IP for stable DNS/demo access
        self.eip = ec2.CfnEIP(self, "EvidaraEIP")
        ec2.CfnEIPAssociation(
            self,
            "EvidaraEIPAssociation",
            eip=self.eip.ref,
            instance_id=self.instance.instance_id,
        )

        # SNS Topic for alerts
        alerts_topic = sns.Topic(
            self,
            "EvidaraAlertsTopic",
            display_name="Evidara Platform Alerts",
        )

        # CloudWatch Alarms - CPU credits (t3 is burstable)
        cloudwatch.Alarm(
            self,
            "CpuCreditsAlarm",
            metric=cloudwatch.Metric(
                namespace="AWS/EC2",
                metric_name="CPUCreditBalance",
                dimensions_map={"InstanceId": self.instance.instance_id},
                statistic="Average",
                period=Duration.minutes(5),
            ),
            evaluation_periods=2,
            threshold=50,
            comparison_operator=cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
            alarm_description="CPU credits below 50% - consider upgrading instance",
        ).add_alarm_action(cw_actions.SnsAction(alerts_topic))

        # Memory utilization alarm (requires CloudWatch agent)
        cloudwatch.Alarm(
            self,
            "MemoryAlarm",
            metric=cloudwatch.Metric(
                namespace="CWAgent",
                metric_name="mem_used_percent",
                dimensions_map={"InstanceId": self.instance.instance_id},
                statistic="Average",
                period=Duration.minutes(5),
            ),
            evaluation_periods=2,
            threshold=80,
            comparison_operator=cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
            alarm_description="Memory usage above 80%",
        ).add_alarm_action(cw_actions.SnsAction(alerts_topic))

        # Outputs
        CfnOutput(
            self,
            "InstanceId",
            value=self.instance.instance_id,
            description="EC2 Instance ID",
        )
        CfnOutput(
            self,
            "ElasticIP",
            value=self.eip.ref,
            description="Elastic IP address for the instance",
        )
        CfnOutput(
            self,
            "SSMConnectCommand",
            value=f"aws ssm start-session --target {self.instance.instance_id}",
            description="SSM Session Manager connect command",
        )
        if ssh_allowed_ips:
            CfnOutput(
                self,
                "SSHCommand",
                value=f"ssh -i <key.pem> ubuntu@{self.eip.ref}",
                description="SSH command (from allowed IPs only)",
            )
