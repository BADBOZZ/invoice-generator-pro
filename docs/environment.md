# Environment Variables

| Scope | Variable | Description | Default / Example |
|-------|----------|-------------|-------------------|
| Global | `POSTGRES_DB` | PostgreSQL database name | `invoice_generator` |
| Global | `POSTGRES_USER` | Database username | `invoice` |
| Global | `POSTGRES_PASSWORD` | Database password | `invoice` |
| Backend | `API_HOST` / `HOST` | Bind address for API container | `0.0.0.0` |
| Backend | `API_PORT` / `PORT` | API port exposed by backend | `4000` |
| Backend | `DATABASE_URL` | Prisma connection string (includes user/pass) | `postgresql://invoice:invoice@db:5432/invoice_generator?schema=public` |
| Backend | `ALLOWED_ORIGINS` | Comma-separated origins for CORS | `http://localhost:5173` |
| Backend | `LOG_LEVEL` | Pino log level | `info` |
| Backend | `NODE_ENV` | Runtime mode (`production`, `development`, `test`) | `production` in containers |
| Frontend | `VITE_API_URL` | API base URL injected at build time | `http://localhost:4000` |
| CI/CD | `REGISTRY` | OCI registry hostname | `ghcr.io` |
| CI/CD | `BACKEND_IMAGE` | Fully qualified image name for backend | `ghcr.io/your-org/invoice-generator-backend` |
| CI/CD | `FRONTEND_IMAGE` | Fully qualified image name for frontend | `ghcr.io/your-org/invoice-generator-frontend` |
| Monitoring | `GRAFANA_USER` | Grafana admin username | `admin` |
| Monitoring | `GRAFANA_PASSWORD` | Grafana admin password | `admin` (override in prod) |

## Managing secrets
- Never commit real `.env` files; only templates (`*.example`) live in git.
- For GitHub Actions, store sensitive values inside repository secrets (e.g., `REGISTRY_USERNAME`, `REGISTRY_TOKEN`, `VITE_API_URL` overrides).
- For servers, export variables or source the environment file prior to running scripts: `set -a && source env/.production.env && set +a`.
