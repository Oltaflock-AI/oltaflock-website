/** Helpers shared by the API routes. Kept here so send-message and send-report
 *  cannot drift apart in how they respond or escape user input. */

export const json = (body: object, status: number, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
};

export function escapeHtml(text: unknown): string {
  return String(text ?? '').replace(/[&<>"']/g, (m) => HTML_ESCAPES[m]);
}
