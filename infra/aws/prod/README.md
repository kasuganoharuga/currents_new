# AWS Production — Currents

Foundation stack: **`currents-production-foundation`**.

This is the production counterpart of [`../dev/README.md`](../dev/README.md). It
shares the AI Catalyst **production** VPC and ALB. Public origin is
**`https://currentscommunity.com`**. Apex DNS still points at Framer until you
change the GoDaddy records.

## What this stack creates

| Resource       | Value                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| VPC            | `vpc-0e4d635bd8276b4b9` (`ai-catalyst-production`)                                                                             |
| ECS cluster    | `currents-production` (Container Insights on)                                                                                  |
| ECR            | `currents-production/app` (immutable tags)                                                                                     |
| App SG         | `sg-03bb53b769f375b1d` (`currents-production-app`)                                                                             |
| DB SG          | `sg-0351c830098db3f0b` (`currents-production-db`)                                                                              |
| RDS            | `currents-production-postgres` (Postgres 17.10, `db.t4g.small`, private, 7-day backups, deletion protection)                   |
| DB endpoint    | `currents-production-postgres.clqqcgqiyoor.ap-southeast-2.rds.amazonaws.com`                                                   |
| Target group   | `currents-production-app` (`f420a2b65759bf09`)                                                                                 |
| `DATABASE_URL` | Secrets Manager `currents-production/database-url`                                                                             |
| App logs       | `/ecs/currents-production-app` (30 days)                                                                                       |
| RDS logs       | `/aws/rds/instance/currents-production-postgres/postgresql` (30 days)                                                          |
| Dashboard      | CloudWatch `currents-production`                                                                                               |
| Alarms         | Unhealthy hosts, target 5xx, app error logs, ECS CPU/memory, RDS CPU/storage/connections → SNS `ai-catalyst-production-alarms` |
| Public origin  | `https://currentscommunity.com` (also `www.currentscommunity.com`)                                                             |
| Assets         | `currents-production-assets-765332581489-ap-southeast-2`                                                                       |

The **ECS service is not in CloudFormation**. GitHub Actions creates
`currents-production-app` on the first successful production deploy.

## Networking

Public subnets (Fargate, assign public IP — same pattern as develop):

- `subnet-01ca3c9f04123576a` (ap-southeast-2a)
- `subnet-0c2fa11cecac91c62` (ap-southeast-2b)

Private subnets (RDS; these have NAT):

- `subnet-03e7b24e58a0819ee` (ap-southeast-2a)
- `subnet-014743fae8f102ddd` (ap-southeast-2b)

Shared ALB: `ai-catalyst-production`. HTTPS listener host rule **priority 5**
forwards `currentscommunity.com` and `www.currentscommunity.com` to target
group `currents-production-app` (`/api/live`).

## Deploy the foundation

```bash
aws cloudformation deploy \
  --region ap-southeast-2 \
  --stack-name currents-production-foundation \
  --template-file infra/aws/prod/foundation.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    VpcId=vpc-0e4d635bd8276b4b9 \
    PublicSubnetIds=subnet-01ca3c9f04123576a,subnet-0c2fa11cecac91c62 \
    PrivateSubnetIds=subnet-03e7b24e58a0819ee,subnet-014743fae8f102ddd \
    AlbSecurityGroupId=sg-031ab498d9a0e06f9 \
    HttpsListenerArn=arn:aws:elasticloadbalancing:ap-southeast-2:765332581489:listener/app/ai-catalyst-production/8257a41fff930739/25ea6aad3a5799a6 \
    CertificateArn= \
    AlarmTopicArn=arn:aws:sns:ap-southeast-2:765332581489:ai-catalyst-production-alarms
```

RDS takes about 10–15 minutes. Leave `CertificateArn` empty until ACM issues
the Currents certificate, then update the stack with:

`arn:aws:acm:ap-southeast-2:765332581489:certificate/938b8c2d-0281-4691-8c33-83aad9628787`

## DNS (manual, GoDaddy)

ACM certificate is pending validation until these CNAMEs exist:

| Record name                                                   | Type  | Value                                                               |
| ------------------------------------------------------------- | ----- | ------------------------------------------------------------------- |
| `_0e17367a0a125573e974c4b4b64c0a93.currentscommunity.com`     | CNAME | `_66420174343c34d4b28d88804fef5026.jkddzztszm.acm-validations.aws.` |
| `_4b77f235663afa19335e25f39867a813.www.currentscommunity.com` | CNAME | `_d4014ea32bea758432a39beb2b4229e1.jkddzztszm.acm-validations.aws.` |

After the cert is **ISSUED**, attach it via the stack parameter above, then
point apex and www at the production ALB (this replaces the current Framer
site):

| Record                      | Type    | Value                                                                |
| --------------------------- | ------- | -------------------------------------------------------------------- |
| `currentscommunity.com`     | ALIAS/A | `ai-catalyst-production-1187280074.ap-southeast-2.elb.amazonaws.com` |
| `www.currentscommunity.com` | CNAME   | `ai-catalyst-production-1187280074.ap-southeast-2.elb.amazonaws.com` |

`deploy-production.yml` must also exist on **`main`**. `workflow_run` always
loads the workflow file from the default branch.

## GitHub Actions

Workflow: [`.github/workflows/deploy-production.yml`](../../../.github/workflows/deploy-production.yml)

- Triggers once **CI succeeds on a push to `main`**, or via **manual `workflow_dispatch`**
- Uses the GitHub `production` environment
- Assumes `arn:aws:iam::765332581489:role/currents-github-actions-deploy-production`
- Builds with `--build-arg NEXT_PUBLIC_BETTER_AUTH_URL=https://currentscommunity.com`
- Pushes `currents-production/app:<git-sha>`, migrates, creates/updates the ECS service
- Smokes `https://currentscommunity.com`

Required GitHub **production** environment secrets (generate new values; do not
reuse develop):

- `BETTER_AUTH_SECRET`
- `MEMBER_APPLICATION_CLAIM_SECRET`
- `GEONAMES_USERNAME`

Required repository secret:

- `LUMA_API_KEY`

Optional:

- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `LUMA_WEBHOOK_SECRET` — `https://currentscommunity.com/api/luma/webhooks`

## App ↔ DB

- Liveness: **`GET /api/live`**
- DB readiness: **`GET /api/health`**
- Join location picker: **`GET /api/geo/states`**

`DATABASE_URL` is injected from Secrets Manager. The container runs migrations
at boot (`db/ecs-entrypoint.mjs`).
