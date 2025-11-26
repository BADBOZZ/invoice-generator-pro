#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-staging}"
ENV_FILE="${ENV_FILE:-env/.${ENVIRONMENT}.env}"
STACK_FILE="${STACK_FILE:-docker-compose.yml}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Environment file '${ENV_FILE}' not found." >&2
  exit 1
fi

echo "Using environment file: ${ENV_FILE}"
set -a
# shellcheck disable=SC1090
source "${ENV_FILE}"
set +a

BACKEND_IMAGE_TAG="${BACKEND_IMAGE:-invoice-backend}:${IMAGE_TAG:-latest}"
FRONTEND_IMAGE_TAG="${FRONTEND_IMAGE:-invoice-frontend}:${IMAGE_TAG:-latest}"

echo "Pulling images ${BACKEND_IMAGE_TAG} and ${FRONTEND_IMAGE_TAG}"
docker pull "${BACKEND_IMAGE_TAG}" || true
docker pull "${FRONTEND_IMAGE_TAG}" || true

echo "Running database migrations..."
"$(dirname "$0")/migrate.sh" "${ENVIRONMENT}"

echo "Deploying stack with docker compose..."
docker compose --env-file "${ENV_FILE}" -f "${STACK_FILE}" up -d --remove-orphans

HEALTHCHECK_URL="${HEALTHCHECK_URL:-http://localhost:${API_PORT:-4000}/health}"
echo "Waiting for health check at ${HEALTHCHECK_URL}"
"$(dirname "$0")/health-check.sh" "${HEALTHCHECK_URL}"

echo "Deployment for '${ENVIRONMENT}' finished."
