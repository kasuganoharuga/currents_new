FROM node:22-slim AS deps

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.18.0 --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS builder

WORKDIR /app
COPY . .

# Placeholder so modules that read DATABASE_URL at import/build time do not fail.
ARG DATABASE_URL=postgresql://currents:currents@db:5432/currents
ENV DATABASE_URL=${DATABASE_URL}

RUN pnpm build

FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/db/migrate.ts ./db/migrate.ts
COPY --from=builder /app/db/ecs-entrypoint.mjs ./db/ecs-entrypoint.mjs
COPY --from=builder /app/infra/database/migrations ./infra/database/migrations

EXPOSE 3000

# /api/live still does not require the database; migrations run at boot so
# Join/auth tables exist before the process accepts traffic.
HEALTHCHECK --interval=10s --timeout=3s --start-period=45s --retries=5 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/live').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["node", "db/ecs-entrypoint.mjs"]
