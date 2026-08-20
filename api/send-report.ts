import { resolveMx } from 'node:dns/promises';
import { Resend } from 'resend';
import { escapeHtml, json } from './_shared.js';
import { checkEmail } from '../src/lib/emailValidation.js';
import {
  CURRENCIES,
  TASKS_BY_ID,
  WEEKS_PER_YEAR,
  computeLeak,
  formatMoney,
} from '../src/lib/leakModel.js';
import type { CurrencyCode, Inputs, Result } from '../src/lib/leakModel.js';

const TO_EMAIL = 'admin@oltaflock.ai';
const SITE = 'https://oltaflock.ai';
const CALCULATOR_URL = `${SITE}/automation-roi-calculator`;

// Same slug the navbar and the calculator CTA use. Vercel exposes every project
// env var to the function, so this stays in step with the buttons on the site.
const CAL_SLUG = process.env.VITE_CALCOM_LINK || 'khush0030/oltaflock-ai-demo';
const BOOK_CALL_URL = `https://cal.com/${CAL_SLUG}`;

/** Guards against a payload large enough to be an attack rather than a form. */
const MAX_BODY_BYTES = 8_000;

interface ReportRequest {
  email: string;
  name?: string;
  company?: string;
  /** Honeypot — a real browser never fills this, it is visually hidden. */
  website?: string;
  inputs: Inputs;
}

/**
 * Rebuilds Inputs from untrusted JSON. Only known task ids survive, and every
 * number is coerced, so computeLeak's own clamping has something sane to work
 * with. Returns null when the shape is not recoverable.
 */
function parseInputs(raw: unknown): Inputs | null {
  if (!raw || typeof raw !== 'object') return null;
  const src = raw as Partial<Inputs>;

  const currency: CurrencyCode = src.currency === 'INR' ? 'INR' : 'USD';
  const hourlyRate = Number(src.hourlyRate);
  if (!Number.isFinite(hourlyRate)) return null;

  const rowsIn = src.rows;
  if (!rowsIn || typeof rowsIn !== 'object') return null;

  const rows: Inputs['rows'] = {};
  for (const [id, row] of Object.entries(rowsIn)) {
    if (!TASKS_BY_ID[id] || !row || typeof row !== 'object') continue;
    rows[id] = {
      enabled: Boolean((row as { enabled?: unknown }).enabled),
      hours: Number((row as { hours?: unknown }).hours) || 0,
      people: Number((row as { people?: unknown }).people) || 1,
    };
  }

  return { currency, hourlyRate, rows };
}

/**
 * Catches addresses whose domain cannot receive mail at all — the `gmial.com`
 * class of typo, which is otherwise perfectly well-formed.
 */
async function domainAcceptsMail(domain: string): Promise<boolean> {
  try {
    const records = await resolveMx(domain);
    return records.length > 0;
  } catch {
    return false;
  }
}

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:8px 0;border-top:1px solid #e5e5e5;color:#555;font-size:14px;">${label}</td>
    <td style="padding:8px 0;border-top:1px solid #e5e5e5;text-align:right;font-size:14px;white-space:nowrap;">${value}</td>
  </tr>`;

function breakdownTable(result: Result): string {
  const rows = result.perTask
    .map((t) => row(escapeHtml(t.label), formatMoney(t.leak, result.currency)))
    .join('');

  return `
  <table style="width:100%;border-collapse:collapse;margin:16px 0;">
    <tbody>
      ${rows}
      <tr>
        <td style="padding:10px 0;border-top:2px solid #111;font-weight:600;font-size:14px;">Total</td>
        <td style="padding:10px 0;border-top:2px solid #111;text-align:right;font-weight:600;font-size:14px;white-space:nowrap;">
          ${formatMoney(result.totalLeak, result.currency)}
        </td>
      </tr>
    </tbody>
  </table>`;
}

function recommendations(result: Result): string {
  return result.topThree
    .map(
      (t, i) => `
    <div style="margin:0 0 18px;">
      <p style="margin:0;font-weight:600;font-size:15px;">
        ${String(i + 1).padStart(2, '0')} &nbsp; ${escapeHtml(t.service)}
      </p>
      <p style="margin:4px 0 0;color:#555;font-size:14px;line-height:1.55;">${escapeHtml(t.blurb)}</p>
      <p style="margin:4px 0 0;color:#0b74de;font-size:13px;">
        ${formatMoney(t.leak, result.currency)} / year &middot; currently ${t.hours}h a week
        ${t.people > 1 ? ` across ${t.people} people` : ''}
      </p>
    </div>`
    )
    .join('');
}

function prospectEmail(result: Result, name?: string): string {
  const greeting = name ? `Hi ${escapeHtml(name)},` : 'Hi,';

  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;color:#111;">
    <p style="font-size:15px;line-height:1.6;">${greeting}</p>
    <p style="font-size:15px;line-height:1.6;">
      Here is the breakdown from the Oltaflock automation ROI calculator.
    </p>

    <p style="margin:24px 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#777;">
      Your annual leak
    </p>
    <p style="margin:0;font-size:34px;font-weight:700;color:#0b74de;">
      ${formatMoney(result.totalLeak, result.currency)}
    </p>
    <p style="margin:8px 0 0;color:#555;font-size:14px;line-height:1.6;">
      out of ${formatMoney(result.totalAnnualCost, result.currency)} spent on these tasks each year —
      roughly ${result.weeklyHoursReclaimed} hours a week your team could get back.
    </p>

    ${breakdownTable(result)}

    <p style="margin:28px 0 12px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#777;">
      Where we would start
    </p>
    ${recommendations(result)}

    <p style="margin:28px 0;">
      <a href="${BOOK_CALL_URL}"
         style="background:#111;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-size:14px;display:inline-block;">
        Book a free 30-minute call
      </a>
    </p>

    <p style="color:#777;font-size:12.5px;line-height:1.6;border-top:1px solid #e5e5e5;padding-top:16px;">
      How this was worked out: hours per week &times; people &times; ${WEEKS_PER_YEAR} weeks &times;
      ${formatMoney(result.hourlyRate, result.currency)} per hour, counting only the automatable
      share of each task. Change any of it at
      <a href="${CALCULATOR_URL}" style="color:#0b74de;">${CALCULATOR_URL}</a>.
    </p>
    <p style="color:#777;font-size:12.5px;">— Oltaflock AI, Ahmedabad</p>
  </div>`;
}

function leadEmail(
  result: Result,
  details: { email: string; kind: string; name?: string; company?: string }
): string {
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;color:#111;">
    <p style="font-size:15px;"><strong>New ROI calculator lead</strong></p>
    <p style="font-size:14px;line-height:1.7;">
      <strong>Email:</strong> ${escapeHtml(details.email)} (${escapeHtml(details.kind)})<br>
      <strong>Name:</strong> ${escapeHtml(details.name || '—')}<br>
      <strong>Company:</strong> ${escapeHtml(details.company || '—')}<br>
      <strong>Currency:</strong> ${result.currency.code}<br>
      <strong>Hourly cost:</strong> ${formatMoney(result.hourlyRate, result.currency)}<br>
      <strong>Annual leak:</strong> ${formatMoney(result.totalLeak, result.currency)}
      of ${formatMoney(result.totalAnnualCost, result.currency)}<br>
      <strong>Hours a week:</strong> ${result.weeklyHoursReclaimed}
    </p>
    ${breakdownTable(result)}
    <p style="font-size:13px;color:#555;">Top opportunities: ${result.topThree
      .map((t) => escapeHtml(t.service))
      .join(', ')}</p>
  </div>`;
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return json(
        { error: 'Email is not configured. Set RESEND_API_KEY in Vercel and redeploy.' },
        500
      );
    }

    let body: ReportRequest;
    try {
      const text = await request.text();
      if (text.length > MAX_BODY_BYTES) {
        return json({ error: 'Request too large.' }, 413);
      }
      body = JSON.parse(text);
    } catch {
      return json({ error: 'Invalid request body.' }, 400);
    }

    // Honeypot. Report success so a bot learns nothing about why it failed.
    if (body?.website) {
      return json({ ok: true }, 200);
    }

    const emailCheck = checkEmail(body?.email);
    if (!emailCheck.ok) {
      return json({ error: emailCheck.message, field: 'email' }, 400);
    }

    if (!(await domainAcceptsMail(emailCheck.domain))) {
      return json(
        { error: `We cannot find a mail server for ${emailCheck.domain}. Check the spelling.`, field: 'email' },
        400
      );
    }

    const inputs = parseInputs(body?.inputs);
    if (!inputs) {
      return json({ error: 'Invalid calculator inputs.' }, 400);
    }

    // Recomputed here rather than trusting any total the browser sent, so the
    // emailed figures always match what the page's own model produces.
    const result = computeLeak(inputs);
    if (result.perTask.length === 0) {
      return json({ error: 'Select at least one task before sending the report.' }, 400);
    }

    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : undefined;
    const company = typeof body.company === 'string' ? body.company.trim().slice(0, 120) : undefined;
    const fromEmail = process.env.RESEND_FROM ?? 'Oltaflock <onboarding@resend.dev>';
    const totalLabel = formatMoney(result.totalLeak, CURRENCIES[inputs.currency]);

    try {
      const resend = new Resend(apiKey);

      const toProspect = await resend.emails.send({
        from: fromEmail,
        to: [emailCheck.email],
        replyTo: TO_EMAIL,
        subject: `Your automation breakdown: ${totalLabel} a year`,
        html: prospectEmail(result, name),
      });

      if (toProspect.error) {
        return json({ error: 'We could not send the report. Please try again.' }, 502);
      }

      // The lead alert must never take down the prospect's report, so its
      // failure is swallowed rather than surfaced.
      await resend.emails
        .send({
          from: fromEmail,
          to: [TO_EMAIL],
          replyTo: emailCheck.email,
          subject: `ROI calculator lead: ${company || emailCheck.email} — ${totalLabel}`,
          html: leadEmail(result, {
            email: emailCheck.email,
            kind: emailCheck.kind,
            name,
            company,
          }),
        })
        .catch(() => undefined);

      return json({ ok: true }, 200);
    } catch {
      return json({ error: 'We could not send the report. Please try again.' }, 502);
    }
  },
};
