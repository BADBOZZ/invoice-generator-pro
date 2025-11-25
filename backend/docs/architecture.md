## Backend Architecture Plan

### High-Level Goals
- Secure, modular Node.js/Express API for Invoice Generator Pro.
- JWT authentication with refresh tokens, hashed passwords, and RBAC-ready middlewares.
- PostgreSQL data layer accessed via `pg` pool with dedicated models and migrations.
- Clear separation of concerns: routes → services → models.
- Comprehensive monitoring, logging, rate limiting, and OpenAPI documentation.

### Core Resources & Routes (prefixed with `/api/v1`)
- **Auth**: `POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`.
- **Users**: `GET /users/me`, `PATCH /users/me` (future RBAC support).
- **Clients**: CRUD endpoints for customers/vendors.
- **Invoices**: CRUD + status transitions (`/publish`, `/send`, `/pay`).
- **Payments**: Track invoice payments, link to invoices.
- **Metrics**: `GET /metrics` (Prometheus).

### Data Model Snapshot
| Table | Purpose | Key Columns |
| --- | --- | --- |
| `users` | Auth accounts | `id`, `email`, `password_hash`, `role` |
| `clients` | Customer/vendor contacts | `id`, `user_id`, `company_name`, `currency` |
| `invoices` | Invoice header | `id`, `client_id`, `status`, `total`, `due_date` |
| `invoice_items` | Line items | `id`, `invoice_id`, `description`, `unit_price`, `quantity` |
| `payments` | Applied payments | `id`, `invoice_id`, `amount`, `method`, `paid_at` |
| `refresh_tokens` | Persisted refresh token fingerprints | `id`, `user_id`, `token_hash`, `expires_at` |

### Key Middleware
- `requestLogger`: Winston + Morgan combo for structured logging.
- `auth`: Access token verification, optional role guard.
- `validate`: Joi schema enforcement per route.
- `rateLimiter`: Configurable via env vars.
- `errorHandler`: Unified error envelope and stack suppression.
- `metrics`: Prom-client histogram & counters.

### Services Layer
- `authService`: register/login, password hashing, token issuance & rotation.
- `userService`: profile management.
- `clientService`, `invoiceService`, `paymentService`: business logic, DB transactions, domain validation.

### Security & Config
- `.env` driven configuration validated via Joi in `src/config/environment.js`.
- Helmet, CORS, compression, JSON limit, cookie parser.
- Password hashing with bcrypt (12 rounds default).
- JWT access (15m) + refresh (7d) secrets + rotation.
- Rate limiting (default 100 req / 15m per IP) tunable.

### Documentation
- `openapi.yaml` + `swagger-ui-express` served at `/docs`.
- Example schemas and auth flows included.

### Outstanding Dependencies
- Need `database/connection.js` and `database/migrations/` directory (to be created in upcoming steps).
- Awaiting actual DB credentials; will default to env placeholders until provided.
