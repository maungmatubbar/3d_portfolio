# Portfolio API

A small, production-grade **NestJS 10 + TypeScript** backend for a developer
portfolio. Its one job: receive contact-form submissions, validate them,
rate-limit and spam-guard them, then forward the clean payload to an **n8n**
automation webhook (which fans out to email / Slack / etc.).

## Data flow

```
Portfolio form (React / Vite)
        │  POST /api/contact
        ▼
NestJS Portfolio API  ──┐  validate · rate-limit · honeypot
        │               │
        │ POST (fetch)  │
        ▼               │
n8n webhook (/webhook/contact)
        │
        ▼
Email  /  Slack  /  CRM  …
```

If the n8n forward fails (automation down, timeout, etc.) the API still returns
`200 { success: true }` to the visitor and logs the error server-side — so a lead
is never lost and the visitor never sees an automation error.

## Endpoints

| Method | Path           | Description                                   |
| ------ | -------------- | --------------------------------------------- |
| `GET`  | `/`            | Service info JSON                             |
| `GET`  | `/api/health`  | Health check (`status`, `uptime`, `timestamp`)|
| `POST` | `/api/contact` | Submit a contact-form message                 |

### `POST /api/contact`

Request body:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "message": "Hi! I'd love to talk about a project.",
  "company": "Analytical Engines Ltd",
  "honeypot": ""
}
```

Validation rules (via `class-validator`):

| Field      | Rules                                   |
| ---------- | --------------------------------------- |
| `name`     | string, 2–100 chars, required           |
| `email`    | valid email, required                   |
| `message`  | string, 10–5000 chars, required         |
| `company`  | string, max 150 chars, optional         |
| `honeypot` | string, optional — **must be empty**    |

`honeypot` is an anti-spam trap. It is never shown to real users, so any
non-empty value is treated as a bot: the API silently returns `success: true`
**without** forwarding anything.

Rate limit: **5 requests / 60s per IP** (via `@nestjs/throttler`). Exceeding it
returns `429 Too Many Requests`.

Success response:

```json
{
  "success": true,
  "message": "Thanks — your message is on its way. I'll get back to you soon."
}
```

Validation failure returns a standard NestJS `400` with `class-validator`
messages.

## Install & run

> Requires Node 24+ (uses the global `fetch` API).

```bash
npm install

# Development (watch mode)
npm run start:dev

# Production
npm run build
npm run start:prod
```

Copy the example env file and adjust as needed:

```bash
cp .env.example .env
```

## Environment variables

| Variable                  | Default                                             | Description                                                                 |
| ------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------- |
| `PORT`                    | `4000`                                               | Port the API listens on.                                                    |
| `NODE_ENV`                | `development`                                        | Standard Node environment flag.                                             |
| `ALLOWED_ORIGINS`         | `http://localhost:5173,http://localhost:4173`        | Comma-separated CORS allow-list (Vite dev + preview).                       |
| `N8N_WEBHOOK_URL`         | `http://localhost:5678/webhook/contact`              | n8n webhook that receives forwarded submissions.                            |
| `CONTACT_FORWARD_ENABLED` | `true`                                               | Set to `false` to skip forwarding (local dev without n8n). Still logs/200s. |

## Example requests

Health check:

```bash
curl -s http://localhost:4000/api/health
# {"status":"ok","uptime":3.21,"timestamp":"2026-10-05T12:00:00.000Z"}
```

Submit a contact message:

```bash
curl -s -X POST http://localhost:4000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "message": "Hi! I would love to talk about a project.",
    "company": "Analytical Engines Ltd"
  }'
# {"success":true,"message":"Thanks — your message is on its way. I'll get back to you soon."}
```

## Forwarded payload (what n8n receives)

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "message": "Hi! I would love to talk about a project.",
  "company": "Analytical Engines Ltd",
  "source": "portfolio",
  "submittedAt": "2026-10-05T12:00:00.000Z",
  "ip": "203.0.113.7",
  "userAgent": "Mozilla/5.0 …"
}
```

The forward uses the native Node `fetch` with a 10-second `AbortController`
timeout. Failures are caught and logged; the visitor always gets a success
response.

## How it connects to n8n

The automation workflow lives in [`../automation`](../automation). Spin it up
with the provided Docker Compose stack, import the workflow, and point
`N8N_WEBHOOK_URL` at its `/webhook/contact` endpoint:

```bash
# from ../automation
docker compose up -d
# then import ../automation/n8n/* into the n8n editor and activate the workflow
```

See [`../automation/README.md`](../automation/README.md) for the full setup
(webhook path, email/Slack nodes, credentials).

## Docker

A multi-stage `Dockerfile` (build + lean runtime on `node:24-alpine`) is
included:

```bash
docker build -t portfolio-api .
docker run -p 4000:4000 --env-file .env portfolio-api
```

## Project structure

```
server/
├── src/
│   ├── main.ts                 # bootstrap: helmet, CORS, ValidationPipe
│   ├── app.module.ts           # ConfigModule, ThrottlerModule + global guard
│   ├── app.controller.ts       # GET /
│   ├── health/
│   │   └── health.controller.ts# GET /api/health
│   └── contact/
│       ├── contact.module.ts
│       ├── contact.controller.ts   # POST /api/contact
│       ├── contact.service.ts      # validation flow + n8n forward
│       └── dto/
│           └── create-contact.dto.ts
├── Dockerfile
├── nest-cli.json
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── .env.example
└── .gitignore
```
