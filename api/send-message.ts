import { Resend } from 'resend';

const TO_EMAIL = 'admin@oltaflock.ai';

const json = (body: object, status: number, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
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

    const fromEmail = process.env.RESEND_FROM ?? 'Oltaflock <onboarding@resend.dev>';

    try {
      const body = await request.json();
      const { name, company, email, message } = body ?? {};

      if (!name || !company || !email || !message) {
        return json(
          { error: 'Missing required fields: name, company, email, message' },
          400
        );
      }

      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [TO_EMAIL],
        replyTo: email,
        subject: `Message from ${name} (${company})`,
        html: `
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Company:</strong> ${escapeHtml(company)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        return json(
          { error: error.message || 'Failed to send email' },
          500
        );
      }

      return json({ success: true, id: data?.id }, 200);
    } catch (err) {
      console.error('Send message error:', err);
      return json({ error: 'Failed to send message' }, 500);
    }
  },
};
