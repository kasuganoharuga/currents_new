# Docker development

Containers use fixed names under project `currents`:

| Service   | Container          | Default host port       |
| --------- | ------------------ | ----------------------- |
| `db`      | `currents-db`      | `5433`                  |
| `backend` | `currents-backend` | `3000` (profile `full`) |

Start Postgres (and run migrations):

```bash
pnpm docker:up
```

Stop:

```bash
pnpm docker:down
```

Default local database URL (also in `.env.example`):

```text
DATABASE_URL=postgresql://currents:currents@127.0.0.1:5433/currents
```

Host port defaults to **5433** so it does not clash with another local Postgres on 5432. Override with `POSTGRES_PORT` in `.env`.

Day-to-day: keep `db` in Docker and run Next on the host with `pnpm dev`.

Optional full stack (build + run the Next image as `currents-backend`):

```bash
pnpm docker:up:full
```

Schema is owned by versioned SQL under `infra/database/migrations/`, applied by `pnpm db:migrate` — not by `docker-entrypoint-initdb.d`.
