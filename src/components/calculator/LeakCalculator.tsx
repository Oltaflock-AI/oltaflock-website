import { useMemo, useState } from 'react';
import type { CurrencyCode, Inputs, TaskInput } from '@/lib/leakModel';
import {
  CURRENCIES,
  TASKS,
  computeLeak,
  defaultInputs,
  formatMoney,
} from '@/lib/leakModel';
import { AnimatePresence, motion } from 'framer-motion';
import TaskRow from './TaskRow';
import ResultPanel from './ResultPanel';

const LeakCalculator = () => {
  const [inputs, setInputs] = useState<Inputs>(() => defaultInputs('USD'));

  const result = useMemo(() => computeLeak(inputs), [inputs]);
  const currency = CURRENCIES[inputs.currency];

  const setRow = (id: string, next: TaskInput) =>
    setInputs((prev) => ({ ...prev, rows: { ...prev.rows, [id]: next } }));

  // Switching currency resets the rate to that market's default; the hours and
  // people already entered are still true, so they are kept.
  const setCurrency = (code: CurrencyCode) =>
    setInputs((prev) => ({ ...prev, currency: code, hourlyRate: CURRENCIES[code].defaultRate }));

  const enabledCount = result.perTask.length;

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">
      <div>
        {/* Rate + currency */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <p className="klabel mb-2">Step 1 — Your cost of an hour</p>
              <p className="text-muted-foreground text-[13px] max-w-md leading-relaxed">
                Fully loaded cost of an hour of staff time — salary plus tools, taxes and
                overhead. Not take-home pay.
              </p>
            </div>
            <div className="flex rounded-lg border border-border overflow-hidden shrink-0">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  className={`px-3.5 py-1.5 text-[13px] font-mono transition-colors ${
                    inputs.currency === code
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {CURRENCIES[code].symbol} {CURRENCIES[code].label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="range"
              min={currency.minRate}
              max={currency.maxRate}
              step={currency.rateStep}
              value={inputs.hourlyRate}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, hourlyRate: Number(e.target.value) }))
              }
              aria-label="Hourly cost"
              className="flex-1 h-1.5 appearance-none rounded-full bg-border accent-primary cursor-pointer
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            />
            <span className="font-display text-xl font-bold tabular-nums w-28 text-right">
              {formatMoney(inputs.hourlyRate, currency)}
              <span className="text-faint text-[13px] font-normal font-mono"> /hr</span>
            </span>
          </div>
        </div>

        {/* Tasks */}
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <p className="klabel">Step 2 — What your team does by hand</p>
          <span className="font-mono text-[12px] text-faint tabular-nums">
            {enabledCount} / {TASKS.length} selected
          </span>
        </div>

        <div className="grid sm:grid-cols-2 border-t border-l border-border rounded-xl overflow-hidden bg-card">
          {TASKS.map((task) => {
            const row = inputs.rows[task.id];
            const taskResult = result.perTask.find((t) => t.id === task.id);
            return (
              <TaskRow
                key={task.id}
                task={task}
                value={row}
                leakLabel={formatMoney(taskResult?.leak ?? 0, currency)}
                onChange={(next) => setRow(task.id, next)}
              />
            );
          })}
        </div>
      </div>

      <div id="calculator-result" className="scroll-mt-24">
        <ResultPanel result={result} inputs={inputs} />
      </div>

      {/*
        On desktop the result panel is sticky beside the tasks. On mobile it
        sits below all eight rows, so the number would be off-screen exactly
        while somebody is toggling — this bar keeps it visible.
      */}
      <AnimatePresence>
        {enabledCount > 0 && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border
              bg-background/90 backdrop-blur-xl px-5 py-3 flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="klabel text-[10px] mb-0.5">Annual leak</p>
              <p className="font-display text-xl font-bold text-primary tabular-nums leading-none">
                {formatMoney(result.totalLeak, currency)}
              </p>
            </div>
            <a href="#calculator-result" className="btn-ghost shrink-0 text-[13px] px-3.5 py-2">
              See breakdown
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeakCalculator;
