# Troubleshooting

| Symptom | Possible Cause | Resolution |
|---------|----------------|------------|
| `docker compose build` fails with `docker: command not found` | Docker CLI not installed on host (commonly in CI runners without Docker) | Install Docker Engine / enable Docker-in-Docker, or run builds via GitHub Actions where Docker is available. |
| `scripts/deploy.sh` exits because env file missing | Environment file not created | Copy `env/.staging.example` (or `.production.example`) to `env/.<env>.env` and populate secrets. |
| Prisma migrate fails with auth errors | Database credentials mismatch between `.env` and running DB | Ensure `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `DATABASE_URL` share the same values; recreate containers if necessary. |
| Backend container crashes on boot | Database not ready or env vars missing | Check `docker compose logs backend`; verify Postgres health and `.env` entries. Compose waits on DB health check, but migrations might still fail if schema drift exists. |
| `/metrics` returns 500 | Prometheus scraping while backend still starting | Re-try after a few seconds; if persistent, inspect backend logs for prom-client errors. |
| Promtail cannot read logs (`permission denied`) | Host OS restricts access to `/var/lib/docker/containers` | Run Docker with sufficient permissions or mount `/var/lib/docker/containers` read-only via `sudo`. |
| Grafana login fails | Credentials changed but not updated | Update `GRAFANA_USER` / `GRAFANA_PASSWORD` inside the environment file and redeploy Grafana service (`docker compose up -d grafana`). |
| CI `docker compose build` job fails | Compose file references secrets not present in CI | Provide required env vars as GitHub Actions secrets/vars or set safe defaults in `.env`. |

## Observability checks
- **Prometheus targets**: `http://localhost:9090/targets`
- **Grafana Explore**: select `Loki` datasource and query `{job="docker-logs"}`
- **Logs**: `docker compose logs -f <service>`

## Support commands
```bash
# Restart monitoring stack only
docker compose up -d prometheus loki promtail grafana

# Clean dangling containers/volumes
docker compose down -v
docker system prune
```
