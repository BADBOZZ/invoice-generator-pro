# Invoice Generator Pro

Professional invoice generator web application for small businesses.

## Features

- Quoting system with approval workflows
- Invoice management and tracking
- Contact management (customers, vendors, suppliers)
- Payment tracking and reconciliation
- Subscription management (freemium model)
- Modern UI with dark mode support
- Multi-currency support
- PDF generation
- Email notifications

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express
- **Database**: PostgreSQL + Prisma
- **Deployment**: Docker + Docker Compose

## Getting Started

```bash
git clone <repo> invoice-generator-pro
cd invoice-generator-pro
cp env/.staging.example env/.staging.env
docker compose up --build
```

The stack launches:
- Postgres (`localhost:5432`)
- Backend API (`localhost:4000`)
- Frontend (`localhost:5173`)
- Monitoring: Prometheus (`9090`), Grafana (`3000`), Loki (`3100`)

## Scripts
- `./scripts/migrate.sh <env>` – run Prisma migrations using the chosen environment file.
- `./scripts/deploy.sh <env>` – pull images, run migrations, start stack, and run health checks.
- `./scripts/health-check.sh <url>` – generic HTTP health probe with retries.

## CI/CD
- `.github/workflows/ci.yml` → lint/test/build for backend & frontend + Docker build validation on every push/PR.
- `.github/workflows/deploy.yml` → builds/pushes GHCR images when triggered manually or via semver tags.

## Monitoring & Logging
- `backend` exposes `/metrics` (Prometheus format) and structured JSON logs via Pino.
- `docker-compose.yml` provisions Prometheus, Loki, Promtail, and Grafana with an opinionated dashboard.
- Access Grafana at `http://localhost:3000` (default `admin/admin`, override via env vars).

## Documentation
- [Deployment Guide](docs/deployment.md)
- [Environment Variables](docs/environment.md)
- [Troubleshooting](docs/troubleshooting.md)

## License

MIT
