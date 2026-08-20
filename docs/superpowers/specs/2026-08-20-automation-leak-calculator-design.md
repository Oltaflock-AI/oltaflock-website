# Automation Leak Calculator — Design

Date: 2026-08-20
Status: Approved
Repo: oltaflock-website

## Purpose

A free, public calculator that shows a visitor how much money their manual work
costs per year, and which Oltaflock service removes each cost. It serves three
goals at once: a genuinely useful free resource, an SEO/AEO landing page, and a
lead capture point that feeds `admin@oltaflock.ai`.

## Decisions

| Decision | Choice |
|---|---|
| What it measures | Cost of manual work hours (not lost revenue, not support-only) |
| Conversion model | Result shown ungated; email captures an emailed breakdown; Book a Call CTA alongside |
| Placement | Own prerendered route, linked from navbar and footer |
| Input model | 8 task presets with toggle + sliders, one global hourly cost |
| Currency | USD and INR toggle, each with its own default hourly rate |
| Report | HTML email via existing Resend setup — no PDF |
| Math model | Conservative, every assumption printed on the page |

## Route and SEO

Route: `/automation-roi-calculator`, prerendered by vite-react-ssg.

- H1: "How much is manual work leaking from your business?"
- Registered in `src/routes.tsx` as a lazy child of `App`, matching the existing
  `faq` / `privacy` / `terms` entries.
- Added to the `navLinks` array in `src/components/Navbar.tsx` (with
  `route: true`) and to `src/components/Footer.tsx`.
- Added to `public/sitemap.xml` and `public/llms.txt`.
- Per-page `<Head>` with title, meta description, canonical, and OG tags,
  following the pattern already used in `src/pages/FAQ.tsx`.
- JSON-LD: a `WebApplication` block describing the calculator, plus a `FAQPage`
  block for the three on-page questions. No duplicate tags in `index.html` —
  that file stays clean per the earlier SSG work.

All browser APIs (`window`, `localStorage`, `navigator`) must be guarded or run
inside `useEffect`, or the SSG build breaks.

## Files

| File | Responsibility |
|---|---|
| `src/lib/leakModel.ts` | Pure module: task presets, currency presets, `computeLeak(inputs)`. No React imports. Unit tested. |
| `src/lib/emailValidation.ts` | Pure module: the shared regex, the length and dot rules, the disposable-domain blocklist, and a `personal` / `business` classifier. No Node imports, so both the browser and the function can use it. Unit tested. |
| `src/pages/Calculator.tsx` | Page shell: `<Head>`, hero copy, calculator, mini-FAQ, closing CTA |
| `src/components/calculator/LeakCalculator.tsx` | Owns input state, lays out task list beside result panel |
| `src/components/calculator/TaskRow.tsx` | One task: enable toggle, hours/week slider, people slider, automatable % badge |
| `src/components/calculator/ResultPanel.tsx` | Sticky result: animated total, per-task table, top three recommendations |
| `src/components/calculator/ReportForm.tsx` | Email capture, client-side validation, POST to the API |
| `api/send-report.ts` | Validates, screens the email, recomputes the result, sends two emails via Resend |
| `api/_shared.ts` | `json()` and `escapeHtml()` extracted from `api/send-message.ts`; both routes import it |

Extracting `api/_shared.ts` is the only refactor in scope. It exists because
`send-report.ts` would otherwise copy both helpers verbatim.

### Cross-import risk

`api/send-report.ts` imports `src/lib/leakModel.ts` and
`src/lib/emailValidation.ts` by relative path so that the browser and the
function share one source of truth. The existing `api/send-message.ts` imports
no local module, so this path is unproven in this repo and Vercel's function
bundler must be confirmed to follow it.

This is the first thing to verify in implementation — a hello-world import from
`api/` into `src/lib/`, deployed to a preview, before any calculator code is
written. If the bundler will not follow it, the fallback is to move both pure
modules to a top-level `shared/` directory referenced by a `tsconfig` path alias
from both sides. Duplicating the modules is not acceptable: the whole point of
server-side recomputation is that both sides run identical math.

## Data model

```ts
type TaskPreset = {
  id: string;
  label: string;
  service: string;        // the Oltaflock service that removes this cost
  blurb: string;          // one line shown in the recommendation
  defaultHours: number;   // hours per week
  defaultPeople: number;
  automatable: number;    // 0..1, displayed on the row
};

type CurrencyCode = 'USD' | 'INR';

type Inputs = {
  currency: CurrencyCode;
  hourlyRate: number;
  rows: Record<string, { enabled: boolean; hours: number; people: number }>;
};

type TaskResult = {
  id: string; label: string; service: string;
  annualCost: number;   // full cost of the task
  leak: number;         // the automatable portion
};

type Result = {
  perTask: TaskResult[];        // enabled tasks only, descending by leak
  totalAnnualCost: number;
  totalLeak: number;
  topThree: TaskResult[];
};
```

### Task presets

| id | Task | Automatable | Service |
|---|---|---|---|
| `lead-followup` | Lead follow-up and outreach | 85% | CRM & Sales Automation |
| `crm-data-entry` | CRM data entry and record updates | 90% | System Integrations |
| `support-replies` | Repeat customer support replies | 70% | Customer Support Automation |
| `reporting` | Manual reporting and dashboards | 85% | Data & Reporting Automation |
| `quotes-invoices` | Quotes, proposals, invoices | 75% | Business Process Automation |
| `approvals-onboarding` | Approvals, onboarding, handoffs | 65% | Internal Workflow Automation |
| `tool-copy-paste` | Copy-pasting between tools | 90% | System Integrations |
| `lead-qualification` | Lead qualification and routing | 80% | AI Agents |

### Currency presets

| Code | Symbol | Default hourly rate | Slider range | Step |
|---|---|---|---|---|
| USD | `$` | 25 | 5–200 | 1 |
| INR | `₹` | 450 | 100–5000 | 25 |

Switching currency resets `hourlyRate` to that currency's default. Task hours
and people counts are preserved across the switch.

## The math

Per enabled task:

```
annualCost = hours × people × 52 × hourlyRate
leak       = annualCost × automatable
```

Totals are the sums. `topThree` is the three enabled tasks with the largest
`leak`, ties broken by preset order. All displayed figures round to whole
currency units.

The formula, the 52-week basis, and every automatable percentage are printed on
the page under the result, and every input stays editable. The number has to
survive being forwarded to a CFO.

Empty state: zero enabled tasks produces a zero result, the panel shows nudge
copy instead of a table, and the email form is disabled.

## Data flow

Input state lives in `LeakCalculator`. Every slider change recomputes through
`computeLeak()` and re-renders `ResultPanel` live. There is no gate: the full
result is visible before any email is requested.

`ReportForm` POSTs `{ email, name?, company?, website?, inputs }` to
`/api/send-report`. The server **recomputes the result from `inputs` using the
same `leakModel` module** rather than trusting any totals from the client, then
sends two emails through Resend:

1. To the visitor — their total, the per-task table, the top three
   recommendations with the matching service, and a Book a Call link.
2. To `admin@oltaflock.ai` — the same figures plus name, company, email,
   currency, and a `personal` / `business` tag on the email domain.

A failure to send never removes the on-page result.

## Email validation

Three layers. The client layer is convenience; the server layer is the real one.

**Client** (`ReportForm.tsx`) — `type="email"`, the shared regex checked on blur,
an inline error message, and a disabled submit until the field is valid.

**Server** (`api/send-report.ts`) — the same regex re-run, because any client
check is bypassable with curl.

```ts
const EMAIL_RE = /^[^\s@,;:<>()[\]\\]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;
```

Plus: total length ≤ 254, local part ≤ 64, no leading or trailing dot in the
local part, and no `..` anywhere.

**Screening** (server only):

| Check | Action | Reason |
|---|---|---|
| Disposable domain against a small hardcoded blocklist (mailinator, 10minutemail, guerrillamail, temp-mail, yopmail, and similar) | Reject, 400 | Unreachable lead |
| MX lookup with `dns/promises` `resolveMx(domain)` | Reject, 400, if the lookup fails or returns no records | Catches typos such as `gmial.com` whose domain cannot receive mail |
| Free provider (gmail, yahoo, outlook, hotmail, proton) | Allow, tag the lead alert as `personal` | SMBs use these; blocking them would discard real prospects |

Role addresses such as `info@` and `sales@` are allowed — they are normal in
B2B. The MX lookup adds roughly 50–200ms and requires the Node runtime, which is
the Vercel default.

## Error handling

| Condition | Behaviour |
|---|---|
| `RESEND_API_KEY` missing | 500 with the same message shape as `send-message.ts`; the on-page result is unaffected |
| Invalid or screened-out email | 400 with a specific reason, rendered inline on the field |
| Honeypot field filled | 200 with no email sent — a bot must not learn it was caught |
| Malformed or oversized payload, unknown task ids | 400 before any Resend call |
| Resend or network failure | Inline retry message; result stays on screen |
| No tasks enabled | Zero result, nudge copy, submit disabled |

## Environment

No new environment variables. `RESEND_API_KEY` and the optional `RESEND_FROM`
are already used by `api/send-message.ts` and are read the same way here.

Outstanding, carried over from the contact form: the key is set for Production
and Development but not Preview, and it should be rotated because it was once
shared in plaintext.

## Testing

The repo currently has no test runner. Add `vitest` as a dev dependency with an
`npm test` script, covering `src/lib/leakModel.ts` only:

- Per-task math for a known input, in both currencies
- Totals equal the sum of the per-task figures
- Rounding produces whole currency units
- Empty state returns zeros and an empty `perTask`
- `topThree` ordering, including the tie-break, and fewer than three enabled tasks

`src/lib/emailValidation.ts` is tested alongside it: valid addresses pass,
malformed ones fail (missing `@`, double dot, leading dot, over-length local
part, spaces, trailing dot), disposable domains are rejected, and free providers
classify as `personal` while everything else classifies as `business`. The MX
lookup lives only in the function and is not unit tested; it is exercised
manually against a real domain and a typo domain such as `gmial.com`.

Gates before merge: `npm test`, `tsc --noEmit`, `npm run lint`, and a full
`npm run build` to confirm the new route prerenders with its own title and
canonical.

## Out of scope for v1

Shareable `?state=` URLs, PDF export, sourced industry benchmarks, storing
submissions in a database, and any second calculator variant.
