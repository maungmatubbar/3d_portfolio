# Mong Mong — Portfolio (Full-Stack + Automation)

A production-grade personal portfolio for **Mong Mong, Senior Full-Stack & DevOps Engineer** — a
polished, dark, 3D React front end backed by a real **NestJS** API and an **n8n** automation
pipeline. The contact form is not a `mailto:` link; it runs through a live, rate-limited,
spam-guarded backend that forwards leads to an automation workflow (email + Slack).

This repo is itself a demonstration of the skills it advertises: typed frontend, hardened backend
service, webhook orchestration and automation.

---

## Architecture

```
          ┌──────────────────────┐      POST /api/contact      ┌─────────────────────┐
          │   Front end (Vite)   │  ───────────────────────▶   │   NestJS API        │
          │   React · Three.js   │   { name,email,message }     │   /server           │
          │   Tailwind · Framer  │  ◀───────────────────────    │  • DTO validation   │
          └──────────────────────┘        { success }           │  • rate limiting    │
                                                                 │  • honeypot guard   │
                                                                 └──────────┬──────────┘
                                                                            │  POST (webhook)
                                                                            ▼
                                                                 ┌─────────────────────┐
                                                                 │   n8n workflow      │
                                                                 │   /automation       │
                                                                 │  Webhook → IF →     │
                                                                 │  Email + Slack      │
                                                                 └─────────────────────┘
```

| Layer | Tech | Folder |
| ----- | ---- | ------ |
| Front end | React 18, Vite, Three.js (@react-three/fiber/drei), Tailwind CSS, Framer Motion | `./src` |
| Backend API | NestJS 10, TypeScript, class-validator, @nestjs/throttler, helmet | `./server` |
| Automation | n8n (Docker), importable workflow JSON | `./automation` |

---

## Quick start

### 1. Front end
```bash
npm install
cp .env.example .env         # VITE_API_URL=http://localhost:4000
npm run dev                  # http://localhost:5173
```

### 2. Backend API (NestJS)
```bash
cd server
npm install
cp .env.example .env
npm run start:dev            # http://localhost:4000
```
For local UI work **without** running n8n, set `CONTACT_FORWARD_ENABLED=false` in `server/.env` —
the API accepts submissions and logs them, but skips the webhook forward.

### 3. Automation (n8n)
```bash
cd automation
cp .env.example .env
docker compose up -d         # http://localhost:5678
```
Then import `automation/n8n/contact-workflow.json`, configure SMTP (and optionally Slack)
credentials, activate the workflow, and point `N8N_WEBHOOK_URL` in `server/.env` at
`http://localhost:5678/webhook/contact`. Full steps in [`automation/README.md`](automation/README.md).

---

## The contact pipeline (data flow)

1. Visitor submits the form → `POST {VITE_API_URL}/api/contact` with `{ name, email, company?, message, honeypot }`.
2. NestJS validates the payload, rate-limits per IP (5/min), and silently drops bots that fill the hidden `honeypot`.
3. On success it forwards an enriched payload (`source`, `submittedAt`, `ip`, `userAgent`) to the n8n webhook.
4. n8n runs a quality gate and sends an email notification (+ optional Slack message).
5. If automation is down, the API still returns success so no lead is lost — the failure is logged server-side.

---

## Configuration

**Front end — `.env`**

| Var | Default | Description |
| --- | ------- | ----------- |
| `VITE_API_URL` | `http://localhost:4000` | Base URL of the NestJS API |

**Backend — `server/.env`** (see `server/README.md` for the full table)

| Var | Default | Description |
| --- | ------- | ----------- |
| `PORT` | `4000` | API port |
| `ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:4173` | Comma-separated CORS allow-list |
| `N8N_WEBHOOK_URL` | `http://localhost:5678/webhook/contact` | Where submissions are forwarded |
| `CONTACT_FORWARD_ENABLED` | `true` | Set `false` to skip forwarding in local dev |

> **Tip:** if Vite starts on a different port (e.g. `5174` because `5173` is taken), add that
> origin to `ALLOWED_ORIGINS` or the browser will block the request with a CORS error.

---

## Customizing the content

All copy lives in [`src/constants/index.js`](src/constants/index.js) — profile, stats, services,
tech stack, experience, projects and testimonials. Replace the placeholder GitHub/live links on the
projects as needed.

### Downloadable résumé

The **Resume** button downloads `public/Mong_Mong_Resume.pdf`, a branded, print-optimized PDF
generated from [`resume/resume.html`](resume/resume.html). To change it, edit that HTML and run:

```bash
npm run resume      # renders resume/resume.html → public/Mong_Mong_Resume.pdf via headless Chrome
```

---

## Scripts

| Location | Command | What it does |
| -------- | ------- | ------------ |
| root | `npm run dev` / `npm run build` | Vite dev server / production build |
| `server` | `npm run start:dev` / `npm run build` | Nest watch mode / compile |
| `automation` | `docker compose up -d` | Run n8n locally |

---

Built with React · Three.js · NestJS · n8n.
