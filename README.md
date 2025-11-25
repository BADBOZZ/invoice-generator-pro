# Invoice Generator Pro

Secure-by-default backend foundation for generating and managing invoices. This service exposes hardened REST endpoints with mandatory API key authentication, centralized validation, and layered security middleware.

## Features

- Express 5 server with Helmet CSP, strict CORS control, HPP mitigation, compression, and request sanitization.
- Global rate limiting plus lightweight API key authentication for every invoice route.
- Centralized invoice validation using `celebrate`/`Joi` covering common input tampering vectors.
- In-memory invoice store with subtotal/tax calculations (extensible to a database later).
- Automated smoke tests via `node:test` and `supertest`.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Copy the example environment file and set secrets**
   ```bash
   cp .env.example .env
   # update INVOICE_API_KEY, ALLOWED_ORIGINS, etc.
   ```
3. **Run the API**
   ```bash
   npm run dev   # hot reload via nodemon
   npm start     # production mode
   ```

## API Reference

All routes require the `x-api-key` header.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/health` | Liveness probe |
| `GET` | `/api/invoices` | List invoices |
| `GET` | `/api/invoices/:id` | Retrieve single invoice |
| `POST` | `/api/invoices` | Create invoice (validated & sanitized) |

Request bodies are validated for shape, currency, quantities, and due dates. Responses include totals and line-level calculations. See `tests/app.test.js` for sample payloads.

## Testing

```bash
npm test
```

The suite asserts health endpoint availability, authentication enforcement, successful invoice creation, and validation error paths.

## Security Highlights

- Opinionated Helmet configuration (CSP, Referrer-Policy, Permissions-Policy).
- Configurable rate limiting and origin allow-list.
- Recursive HTML sanitization for body, params, and query content.
- Centralized error handler with sensitive header redaction.
- `.env.example` provided; secrets must never be committed.
