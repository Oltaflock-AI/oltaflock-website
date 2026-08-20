import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Inputs, Result } from '@/lib/leakModel';
import { WEEKS_PER_YEAR, formatMoney } from '@/lib/leakModel';
import ReportForm from './ReportForm';

/**
 * Tweens whenever the value changes, unlike the site's CountUp which fires once
 * on scroll. The total here moves on every slider drag.
 */
const AnimatedMoney = ({ value, result }: { value: number; result: Result }) => {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    if (reduce) {
      setShown(value);
      return;
    }
    const from = fromRef.current;
    const delta = value - from;
    if (delta === 0) return;

    let raf = 0;
    const start = performance.now();
    const duration = 420;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(Math.round(from + delta * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = value;
    };
  }, [value, reduce]);

  return <>{formatMoney(shown, result.currency)}</>;
};

const bookCallLink = import.meta.env.VITE_CALCOM_LINK ?? '';
const bookCallHref = bookCallLink ? `https://cal.com/${bookCallLink}` : '/#send-message';

const ResultPanel = ({ result, inputs }: { result: Result; inputs: Inputs }) => {
  const empty = result.perTask.length === 0;

  return (
    <div className="lg:sticky lg:top-24 rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <p className="klabel mb-3">Your annual leak</p>

        {empty ? (
          <>
            <p className="font-display text-4xl font-bold text-faint tabular-nums">
              {formatMoney(0, result.currency)}
            </p>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              Tick the tasks your team actually does by hand. The number updates as you go.
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-4xl sm:text-5xl font-bold text-primary tabular-nums leading-none">
              <AnimatedMoney value={result.totalLeak} result={result} />
            </p>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              of the {formatMoney(result.totalAnnualCost, result.currency)} you spend on these tasks
              each year is work automation can take over — about{' '}
              <span className="text-foreground font-medium tabular-nums">
                {result.weeklyHoursReclaimed} hours a week
              </span>{' '}
              back to your team.
            </p>
          </>
        )}
      </div>

      {!empty && (
        <>
          <div className="p-6 border-b border-border">
            <p className="klabel mb-4">Breakdown</p>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-faint">
                  <th className="text-left font-normal pb-2">Task</th>
                  <th className="text-right font-normal pb-2">Leak / year</th>
                </tr>
              </thead>
              <tbody>
                {result.perTask.map((t) => (
                  <tr key={t.id} className="border-t border-border">
                    <td className="py-2.5 pr-3 text-muted-foreground">{t.label}</td>
                    <td className="py-2.5 text-right font-mono tabular-nums text-foreground">
                      {formatMoney(t.leak, result.currency)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-border-strong">
                  <td className="py-2.5 pr-3 font-medium">Total</td>
                  <td className="py-2.5 text-right font-mono tabular-nums font-medium text-primary">
                    {formatMoney(result.totalLeak, result.currency)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 border-b border-border">
            <p className="klabel mb-4">Where to start</p>
            <ol className="space-y-4">
              {result.topThree.map((t, i) => (
                <li key={t.id} className="flex gap-3">
                  <span className="font-mono text-[12px] text-faint pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display font-semibold text-[14px]">
                      {t.service}
                    </span>
                    <span className="block text-muted-foreground text-[13px] leading-relaxed mt-1">
                      {t.blurb}
                    </span>
                    <span className="block font-mono text-[12px] text-primary mt-1.5 tabular-nums">
                      {formatMoney(t.leak, result.currency)} / year
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}

      <div className="p-6">
        <a
          href={bookCallHref}
          target={bookCallLink ? '_blank' : undefined}
          rel={bookCallLink ? 'noopener noreferrer' : undefined}
          className="btn-primary w-full justify-center group"
        >
          <Sparkles size={15} />
          Get this automated
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </a>
        <p className="mt-3 text-faint text-[12px] text-center">
          Free 30-minute call. We will tell you which of these is worth doing first.
        </p>
      </div>

      <div className="p-6 border-t border-border bg-secondary/30">
        <ReportForm inputs={inputs} disabled={empty} />
      </div>

      <div className="px-6 pb-6">
        <details className="group">
          <summary className="cursor-pointer text-[12px] text-faint hover:text-foreground transition-colors list-none">
            How this is calculated
          </summary>
          <div className="mt-3 text-[12px] text-muted-foreground leading-relaxed space-y-2">
            <p className="font-mono text-[11.5px] text-foreground">
              leak = hours/week × people × {WEEKS_PER_YEAR} × {formatMoney(result.hourlyRate, result.currency)} × automatable%
            </p>
            <p>
              The automatable percentage is shown on every task and is deliberately
              conservative — it is the share of the work automation removes outright,
              not the share it touches. Nothing here assumes you fire anyone; the
              figure is the cost of hours currently spent on work software can do.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default ResultPanel;
