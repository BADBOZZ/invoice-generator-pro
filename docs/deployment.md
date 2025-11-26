# Deployment Guide

This guide explains how to deploy Invoice Generator Pro with Docker Compose, GitHub Actions, and the helper scripts under `scripts/`.

## Prerequisites
- Docker Engine 24+ and Docker Compose v2
- Access to a PostgreSQL-compatible volume (Compose creates one by default)
- GitHub Container Registry (GHCR) or another OCI registry
- `env/.<environment>.env` file copied from the provided examples

## 1. Prepare environment files
1. Copy the sample file for your target:
   ```bash
   cp env/.staging.example env/.staging.env
   ```
2. Update secrets (database password, Grafana credentials, registry image names/tags, API URLs).
3. Store the file securely; it is ignored by git via `.gitignore`.

## 2. Build & push images (optional local run)
```bash
docker compose build backend frontend
docker compose push backend frontend   # requires image + registry config
```

## 3. Run database migrations
```bash
./scripts/migrate.sh staging
```
The script wraps `docker compose run backend npx prisma migrate deploy` and reads variables from `env/.staging.env`.

## 4. Deploy the stack
```bash
./scripts/deploy.sh staging
```
The script performs the following:
1. Loads environment variables from the `.env` file.
2. Pulls/pushes the configured backend & frontend images.
3. Runs migrations (via `migrate.sh`).
4. Calls `docker compose up -d` with `--remove-orphans`.
5. Executes `scripts/health-check.sh` to ensure the API is healthy.

## 5. Validate health
- API: `curl http://<host>:4000/health`
- Prometheus: `http://<host>:9090`
- Grafana: `http://<host>:3000` (login with `GRAFANA_USER` / `GRAFANA_PASSWORD`)
- Frontend: `http://<host>:5173` (or whichever port you mapped)

## CI/CD Overview
- `.github/workflows/ci.yml` runs lint, tests with coverage gates, builds artifacts, and validates Docker builds on every push/PR.
- `.github/workflows/deploy.yml` builds/pushes images to GHCR when triggered manually (`workflow_dispatch`) or via version tags (`v*.*.*`).

To roll out via GitHub Actions:
1. Trigger **Deploy** workflow with desired environment input (staging/production).
2. The workflow publishes images tagged with both `SHA` and the ref/tag name.
3. Execute `scripts/deploy.sh` on the target host using the published tags recorded in `deployment-manifest` artifact.

## Monitoring Stack
- Prometheus + Grafana run alongside the application via `docker-compose.yml`.
- Grafana automatically provisions Prometheus and Loki datasources plus the `Backend Overview` dashboard.
- Promtail tails Docker logs and ships them to Loki.
- Backend exposes `/metrics` (Prometheus format) courtesy of `prom-client`.

## Health Checks & Quality Gates
- `scripts/health-check.sh` performs cURL-based polling with configurable retries and delay.
- CI enforces:
  - Backend lint/tests/build (with coverage thresholds)
  - Frontend lint/build
  - Docker Compose image builds

## Rollback
1. Re-run `scripts/deploy.sh` with the previous `IMAGE_TAG`.
2. If schema changes occurred, roll back via Prisma migration history or `prisma migrate resolve --rolled-back <migration>`.

## Useful commands
```bash
# Tail API logs through Docker
docker compose logs -f backend

# View Loki logs through Grafana Explore (Loki datasource)

# Destroy stack
docker compose down -v
```
