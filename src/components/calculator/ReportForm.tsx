import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, Mail } from 'lucide-react';
import { checkEmail } from '@/lib/emailValidation';
import type { Inputs } from '@/lib/leakModel';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

const fieldClass =
  'w-full rounded-lg border bg-background px-3.5 py-2.5 text-[14px] transition-colors ' +
  'placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-primary/40 focus-visible:border-primary';

const ReportForm = ({ inputs, disabled }: { inputs: Inputs; disabled: boolean }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  // Only shown once they have stopped typing, so the field does not scold
  // somebody halfway through their own address.
  const validateOnBlur = () => {
    if (!email) return setEmailError(null);
    const check = checkEmail(email);
    setEmailError(check.ok ? null : check.message);
  };

  const emailIsValid = checkEmail(email).ok;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const check = checkEmail(email);
    if (!check.ok) {
      setEmailError(check.message);
      return;
    }

    setStatus('sending');
    setFormError(null);

    try {
      const res = await fetch(`${API_BASE}/api/send-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: check.email, name, company, website, inputs }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // The server screens for things the browser cannot see, such as a
        // domain with no mail server, so its message belongs on the field.
        if (data?.field === 'email') setEmailError(data.error);
        else setFormError(data?.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('sent');
    } catch {
      setFormError('Could not reach the server. Check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3"
      >
        <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-primary flex items-center justify-center">
          <Check size={13} className="text-white" strokeWidth={3} />
        </span>
        <p className="text-[13.5px] text-muted-foreground leading-relaxed">
          Sent. The full breakdown is on its way to{' '}
          <span className="text-foreground font-medium">{email}</span> — check spam if it is
          not there in a minute.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <p className="klabel mb-2">Email me the breakdown</p>
      <p className="text-muted-foreground text-[13px] leading-relaxed mb-4">
        The full per-task breakdown and where we would start, in your inbox to forward on.
      </p>

      <div className="space-y-2.5">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(null);
            }}
            onBlur={validateOnBlur}
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? 'report-email-error' : undefined}
            className={`${fieldClass} ${
              emailError ? 'border-destructive' : 'border-border'
            }`}
          />
          <AnimatePresence>
            {emailError && (
              <motion.p
                id="report-email-error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-destructive text-[12.5px] pt-1.5"
              >
                {emailError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (optional)"
            autoComplete="name"
            className={`${fieldClass} border-border`}
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (optional)"
            autoComplete="organization"
            className={`${fieldClass} border-border`}
          />
        </div>

        {/* Honeypot: hidden from people, irresistible to bots. */}
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none"
        />

        <button
          type="submit"
          disabled={disabled || status === 'sending' || !emailIsValid}
          className="btn-ghost w-full justify-center disabled:opacity-45 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              <Mail size={15} />
              Send me the breakdown
            </>
          )}
        </button>
      </div>

      {formError && <p className="text-destructive text-[12.5px] pt-2.5">{formError}</p>}

      {disabled && (
        <p className="text-faint text-[12px] pt-2.5">
          Select at least one task first.
        </p>
      )}
    </form>
  );
};

export default ReportForm;
