# Currents

Next.js full-stack app (App Router) with PostgreSQL via Docker.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui
- PostgreSQL 17 (`pg` + SQL migrations)
- pnpm

## Setup

```bash
cp .env.example .env
pnpm install
pnpm docker:up    # starts Postgres on host port 5433 and applies migrations
pnpm dev          # http://localhost:3000
```

Health check (requires DB): [http://localhost:3000/api/health](http://localhost:3000/api/health)

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Next.js dev server |
| `pnpm build` / `pnpm start` | Production build / run |
| `pnpm lint` / `pnpm typecheck` | Quality gates |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm docker:up` / `pnpm docker:down` | Postgres lifecycle |
| `pnpm db:migrate` / `pnpm db:psql` / `pnpm db:reset` | Database |

## Git workflow

```text
feature/<short-kebab-name> → PR → develop → PR → main
```

`main` and `develop` are protected (PR required). Branch features from `develop`. Release to `main` from `develop` only.
