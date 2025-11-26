#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-staging}"
ENV_FILE="${ENV_FILE:-env/.${ENVIRONMENT}.env}"
STACK_FILE="${STACK_FILE:-docker-compose.yml}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Environment file '${ENV_FILE}' not found." >&2
  exit 1
fi

echo "Applying Prisma migrations using environment '${ENVIRONMENT}'"
docker compose --env-file "${ENV_FILE}" -f "${STACK_FILE}" run --rm backend npx prisma migrate deploy
