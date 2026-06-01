# Oltaflock AI

Marketing site for Oltaflock AI — custom AI automation for every business. A single-page
marketing homepage plus an Oltaflock Studio showreel, with a Resend-powered contact form.

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Router** (`/` home, `/studio-work` gallery)
- **Framer Motion** (scroll/hover animation)
- **Resend** (contact form → admin@oltaflock.ai, via `/api/send-message`)
- **Cal.com** (Book a Call button)

Light theme only.

## Local development

```bash
npm install        # install dependencies
npm run dev        # dev server at http://localhost:8080
npm run build      # production build to dist/
npm run preview    # preview the production build
npm run lint       # eslint
```

## Environment variables

Copy `.env.example` to `.env` and fill in. Never commit `.env`.

| Variable | Where | Description |
|----------|-------|-------------|
| `VITE_CALCOM_LINK` | client | Cal.com link for "Book a Call" (e.g. `oltaflock/30min`). If unset, the button scrolls to the contact form. |
| `VITE_API_URL` | client | Optional: API base URL when the API isn't on the app origin. |
| `RESEND_API_KEY` | server | Required for the contact form. Set in the host (e.g. Vercel), not exposed to the browser. |
| `RESEND_FROM` | server | Optional From address (defaults to `onboarding@resend.dev`). |

## Deploy on Vercel

The repo is connected to Vercel — pushes to `main` deploy to production automatically.
The `vercel.json` SPA rewrite makes client routes like `/studio-work` resolve on refresh,
while `/api/*` stays routed to the serverless function.

For a fresh setup: import the GitHub repo in Vercel (framework preset **Vite**, build
`npm run build`, output `dist`), then add `RESEND_API_KEY` and `VITE_CALCOM_LINK` under
Project → Settings → Environment Variables.

## Project structure

```
src/
  pages/        Index (home) and Work (/studio-work gallery)
  components/   Sections (Hero, Studio, TechStack, …) + shadcn ui/
  data/         studioWork.ts — showreel video metadata
  index.css     Design tokens + global styles
api/            Vercel serverless functions (Resend contact form)
public/
  studio/videos/  Studio showreel clips + poster frames
```
