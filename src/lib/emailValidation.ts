/**
 * Email format checks and lead screening.
 *
 * Pure and dependency-free on purpose: the browser uses it for instant inline
 * feedback and the Vercel function re-runs the exact same checks, because
 * anything enforced only in the browser can be skipped with curl.
 *
 * The one check that cannot live here is the MX lookup, which needs Node's dns
 * module. That stays in the function.
 */

/**
 * Deliberately not a full RFC 5322 implementation. It rejects the things that
 * actually show up in a lead form — spaces, commas, missing TLD, angle
 * brackets — without rejecting valid addresses that look unusual.
 */
export const EMAIL_RE =
  /^[^\s@,;:<>()[\]\\]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;

export const MAX_EMAIL_LENGTH = 254;
export const MAX_LOCAL_LENGTH = 64;

/** Throwaway inboxes: the lead is unreachable, so the report would go nowhere. */
const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com',
  'discard.email',
  'dispostable.com',
  'fakeinbox.com',
  'getairmail.com',
  'guerrillamail.com',
  'guerrillamail.info',
  'guerrillamail.net',
  'mailcatch.com',
  'maildrop.cc',
  'mailinator.com',
  'mintemail.com',
  'moakt.com',
  'mohmal.com',
  'sharklasers.com',
  'temp-mail.org',
  'tempmail.com',
  'tempmailo.com',
  'throwawaymail.com',
  'trashmail.com',
  'yopmail.com',
  'yopmail.net',
]);

/**
 * Free providers are allowed. Small businesses genuinely run on Gmail, so
 * blocking these would throw away real prospects — they are only tagged, so the
 * lead alert can say what kind of address it is.
 */
const FREE_PROVIDERS = new Set([
  'aol.com',
  'gmail.com',
  'googlemail.com',
  'hotmail.co.uk',
  'hotmail.com',
  'icloud.com',
  'live.com',
  'mail.com',
  'me.com',
  'outlook.com',
  'proton.me',
  'protonmail.com',
  'rediffmail.com',
  'yahoo.co.in',
  'yahoo.com',
  'yandex.com',
  'zoho.com',
]);

export type EmailRejectionReason =
  | 'empty'
  | 'too-long'
  | 'local-too-long'
  | 'malformed'
  | 'dot-placement'
  | 'disposable';

export type EmailKind = 'business' | 'personal';

/**
 * A single always-populated shape rather than a discriminated union: this
 * project compiles with `strict: false`, where TypeScript cannot narrow a
 * union by a boolean discriminant, so a union would force casts at every call
 * site. Check `ok` first; `reason` and `message` are null when it is true.
 */
export interface EmailCheck {
  ok: boolean;
  /** Trimmed and lowercased. Empty when the input was unusable. */
  email: string;
  domain: string;
  kind: EmailKind | null;
  reason: EmailRejectionReason | null;
  message: string | null;
}

const MESSAGES: Record<EmailRejectionReason, string> = {
  empty: 'Enter your email address.',
  'too-long': 'That email address is too long.',
  'local-too-long': 'That email address is too long before the @.',
  malformed: 'That does not look like a valid email address.',
  'dot-placement': 'That email address has a misplaced dot.',
  disposable: 'Please use a permanent email address so we can send the report.',
};

const fail = (reason: EmailRejectionReason): EmailCheck => ({
  ok: false,
  email: '',
  domain: '',
  kind: null,
  reason,
  message: MESSAGES[reason],
});

/**
 * Format and screening in one pass. Returns the normalised address so callers
 * never have to remember to lowercase and trim it themselves.
 */
export function checkEmail(raw: unknown): EmailCheck {
  if (typeof raw !== 'string') return fail('empty');

  const email = raw.trim().toLowerCase();
  if (!email) return fail('empty');
  if (email.length > MAX_EMAIL_LENGTH) return fail('too-long');

  const at = email.lastIndexOf('@');
  if (at <= 0 || at === email.length - 1) return fail('malformed');

  const local = email.slice(0, at);
  const domain = email.slice(at + 1);

  if (local.length > MAX_LOCAL_LENGTH) return fail('local-too-long');
  if (local.startsWith('.') || local.endsWith('.')) return fail('dot-placement');
  if (email.includes('..')) return fail('dot-placement');
  if (!EMAIL_RE.test(email)) return fail('malformed');
  if (DISPOSABLE_DOMAINS.has(domain)) return fail('disposable');

  return {
    ok: true,
    email,
    domain,
    kind: FREE_PROVIDERS.has(domain) ? 'personal' : 'business',
    reason: null,
    message: null,
  };
}

/** Cheap enough to run on every keystroke for the submit button's state. */
export function isProbablyValidEmail(raw: unknown): boolean {
  return checkEmail(raw).ok;
}
