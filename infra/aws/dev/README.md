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
| Domain (holding) | `https://develop.currentscommunity.com`                                  |
| Assets bucket    | `currents-develop-assets-765332581489-ap-southeast-2`                    |
| **RDS**          | **Not created yet** (by design for now)                                  |

ALB currently returns a fixed holding response for the develop host until an ECS service is attached.

## App ↔ DB

- ALB / container liveness: **`GET /api/live`** (no database required)
- DB readiness: **`GET /api/health`** (needs `DATABASE_URL` / RDS)

Until RDS exists, deploy the web service **without** `DATABASE_URL`. Marketing pages work; `/api/health` will be 503.

When RDS is ready, set `DATABASE_URL` on the task definition (Secrets Manager preferred) and run `pnpm db:migrate` from a one-off task or bastion.

## GitHub Actions deploy

Workflow: [`.github/workflows/deploy-develop.yml`](../../.github/workflows/deploy-develop.yml)

- Triggers on **push to `develop`**, after **CI succeeds on develop** once this workflow exists on `main` (`workflow_run`), or via **manual `workflow_dispatch`**
- Assumes IAM role `arn:aws:iam::765332581489:role/currents-github-actions-deploy` (OIDC)
- Builds/pushes `currents-develop/app:<git-sha>`, registers task definition, updates ECS service, smokes `/api/live`

Trust / policy JSON used to provision the role:

- [`github-actions-trust.json`](./github-actions-trust.json)
- [`github-actions-policy.json`](./github-actions-policy.json)

## Deploy (web, no RDS) — manual from a laptop

```bash
# 1) Build & push (linux/amd64)
aws ecr get-login-password --region ap-southeast-2 \
  | docker login --username AWS --password-stdin 765332581489.dkr.ecr.ap-southeast-2.amazonaws.com

TAG=dev-$(git rev-parse --short HEAD)
docker build --platform linux/amd64 -t currents-develop/app:$TAG .
docker tag currents-develop/app:$TAG \
  765332581489.dkr.ecr.ap-southeast-2.amazonaws.com/currents-develop/app:$TAG
docker push 765332581489.dkr.ecr.ap-southeast-2.amazonaws.com/currents-develop/app:$TAG

# 2) Register task def / create service — see task-definition.template.json
# 3) Point ALB HTTPS rule for develop.currentscommunity.com at the target group
```

Public subnets (same pattern as AI Catalyst staging Fargate):

- `subnet-0463eda6ac077e977` (public-0)
- `subnet-07b302fc84ea32325` (public-1)

## Later: add Dev RDS

1. Create Postgres 17 in this VPC (private subnets preferred).
2. SG: allow **5432** from `sg-07f64e645b2c285d5` only.
3. Put URL in task env/secret as `DATABASE_URL`.
4. Run migrations; confirm `/api/health` → `{"status":"ok"}`.

## Out of scope

- Creating RDS now
- Production
- Standalone EC2 (would duplicate the existing ECS/ALB/DNS setup)
