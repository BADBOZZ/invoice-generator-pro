#!/usr/bin/env bash
set -euo pipefail

URL="${1:-http://localhost:4000/health}"
RETRIES="${RETRIES:-20}"
SLEEP_SECONDS="${SLEEP_SECONDS:-5}"

echo "Probing ${URL} (${RETRIES} attempts)"
for attempt in $(seq 1 "${RETRIES}"); do
  if curl -fsSL "${URL}" >/dev/null; then
    echo "Service is healthy after ${attempt} checks."
    exit 0
  fi

  echo "Attempt ${attempt} failed; retrying in ${SLEEP_SECONDS}s..."
  sleep "${SLEEP_SECONDS}"
done

echo "Service did not become healthy in time."
exit 1
