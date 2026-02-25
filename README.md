# Oltaflock AI

Custom AI automation for every business. Marketing site and contact form.

## Tech stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Resend** (contact form → admin@oltaflock.ai)
- **Cal.com** (Book a Call button)

## Local development

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment variables

Create a `.env` file (see `.env.example`). Do not commit `.env`.

| Variable | Description |
|----------|-------------|
| `VITE_CALCOM_LINK` | Cal.com link for "Book a Call" (e.g. `username/30min`) |
| `VITE_API_URL` | Optional: API base URL when different from app origin |

For the contact form to work in production, set these in your host (e.g. Vercel):

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key (from resend.com) |
| `RESEND_FROM` | Optional: From address (default: onboarding@resend.dev) |

## Deploy on Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com), import the GitHub repository.
3. Leave **Build Command** as `npm run build` and **Output Directory** as `dist`.
4. Add environment variables in Project → Settings → Environment Variables:
   - `RESEND_API_KEY` (required for contact form)
   - `VITE_CALCOM_LINK` (for Book a Call link)
   - Optionally `RESEND_FROM`, `VITE_API_URL`
5. Deploy. The `/api/send-message` serverless function will run on Vercel.

## Project structure

- `src/` – React app (pages, components, styles)
- `api/` – Vercel serverless functions (Resend contact form)
- `public/` – Static assets (favicon, etc.)
