# AWS Develop — Currents

**Environment: `develop` only** (not production).

This account already has CloudFormation stack **`currents-develop-foundation`**.
It is an **ECS + ALB** foundation — **not EC2**. Prefer that path.

## What already exists

| Resource         | Value                                                                    |
| ---------------- | ------------------------------------------------------------------------ |
| VPC              | `vpc-0dc75e7a94f95ff6a` (`ai-catalyst-staging`)                          |
| ECS cluster      | `currents-develop`                                                       |
| ECR              | `765332581489.dkr.ecr.ap-southeast-2.amazonaws.com/currents-develop/app` |
| App SG           | `sg-07f64e645b2c285d5` (`currents-develop-app`)                          |
| DB SG            | `sg-004c2aab58266867b` (`currents-develop-db`)                           |
| RDS              | `currents-develop-postgres` (Postgres 17, private, `db.t4g.micro`)       |
| DB subnet group  | `currents-develop-db`                                                    |
| `DATABASE_URL`   | Secrets Manager `currents-develop/database-url`                          |
| `AIRTABLE_TOKEN` | Secrets Manager `currents-develop/airtable-token`                        |
| Domain           | `https://develop.currentscommunity.com`                                  |
| Assets bucket    | `currents-develop-assets-765332581489-ap-southeast-2`                    |

## App ↔ DB

- ALB / container liveness: **`GET /api/live`** (no database required)
- DB readiness: **`GET /api/health`** (needs `DATABASE_URL` / RDS)
- Join location picker: **`GET /api/geo/states`** (needs `GEONAMES_USERNAME`)

`DATABASE_URL` is injected from Secrets Manager. The container runs migrations
at boot (`db/ecs-entrypoint.mjs`) before serving traffic.

## GitHub Actions deploy

Workflow: [`.github/workflows/deploy-develop.yml`](../../.github/workflows/deploy-develop.yml)

- Triggers once **CI succeeds on a push to `develop`**, or via **manual `workflow_dispatch`**
- Uses the GitHub `develop` environment so the workflow-run OIDC identity matches the IAM role trust policy
- Assumes IAM role `arn:aws:iam::765332581489:role/currents-github-actions-deploy` (OIDC)
- Builds/pushes `currents-develop/app:<git-sha>`, registers task definition, runs migrations, updates ECS service
- Smokes `/api/live`, `/`, `/api/luma/events`, `/api/health`, `/api/geo/states?country=AU`

Required GitHub **develop** environment secrets:

- `BETTER_AUTH_SECRET`
- `MEMBER_APPLICATION_CLAIM_SECRET`
- `GEONAMES_USERNAME`

Required repository secret:

- `LUMA_API_KEY`

## Airtable member applications

PostgreSQL remains the source of truth. Successful Join submissions are
mirrored to the `Member Applications` table in the `Currents Operations`
Airtable base using the PostgreSQL application ID as an idempotent upsert key.
An Airtable outage does not reject an otherwise valid Join submission.

The ECS task injects `AIRTABLE_TOKEN` from Secrets Manager and defines:

- `AIRTABLE_BASE_ID=appzuTJ0yeC0GRtTK`
- `AIRTABLE_MEMBER_APPLICATIONS_TABLE_ID=tblCwf56EE6xT94C0`

To reconcile or backfill all PostgreSQL applications, run the deployed task
image once with this command override:

`node scripts/sync-member-applications-to-airtable.mjs`

Optional (features stay off until set):

- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google sign-in (not part of V1 Join)
- `LUMA_WEBHOOK_SECRET` — `POST /api/luma/webhooks` guest mirror

Trust / policy JSON used to provision the role:

- [`github-actions-trust.json`](./github-actions-trust.json)
- [`github-actions-policy.json`](./github-actions-policy.json)
- [`ecs-execution-secrets-policy.json`](./ecs-execution-secrets-policy.json)

## Public subnets (ECS tasks)

Same pattern as AI Catalyst staging Fargate:

- `subnet-0463eda6ac077e977` (public-0)
- `subnet-07b302fc84ea32325` (public-1)

Private subnets (RDS):

- `subnet-0b8f50ef1ca733ae6` (private-0)
- `subnet-02d76fd7f04d9b8c2` (private-1)

## Luma webhook

Create a calendar webhook in Luma pointing at:

`https://develop.currentscommunity.com/api/luma/webhooks`

Store the `whsec_...` value as the `LUMA_WEBHOOK_SECRET` GitHub environment
secret, then re-run **Deploy develop**.

## Out of scope

- Production
- Standalone EC2 (would duplicate the existing ECS/ALB/DNS setup)
