# Project State – 2025-11-25

## Completed
- Authored `docs/security-audit.md` documenting initial repository risks.
- Implemented secure Express backend with Helmet, rate limiting, API key auth, validation, sanitization, and centralized error handling.
- Added automated smoke tests (`npm test`) covering health checks, authentication enforcement, happy-path invoice creation, and validation failures.
- Created `.security.md` outlining controls, threat model, operations guidance, and incident response steps.

## In Progress / Next Up
- Integrate a persistent database layer with encrypted connections and least-privilege credentials.
- Replace API-key-only access control with per-user or per-service identities (OAuth/JWT) once identity provider is available.
- Extend CI/CD with dependency scanning, SAST, and DAST jobs; wire supervisor verification once the `/api/supervisor/verify` endpoint and `project_id` details are provided.
- Build frontend client that consumes the hardened API with strict CORS configuration.

## Risks / Blockers
- **Supervisor verification API unavailable** – Instructions reference `POST /api/supervisor/verify`, but endpoint/project metadata were not provided, so automated verification could not be executed. Manual `npm test` run is documented in commit logs.
- **Volatile storage** – Current in-memory store is not durable; data loss will occur on restart until a database is integrated.
- **Single secret** – API key shared across consumers; rotating and scoping keys remains critical until improved auth is live.
