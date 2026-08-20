import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import type { TaskPreset, TaskInput } from '@/lib/leakModel';
import { HOURS_MAX, HOURS_MIN, PEOPLE_MAX, PEOPLE_MIN } from '@/lib/leakModel';

interface TaskRowProps {
  task: TaskPreset;
  value: TaskInput;
  /** Annual leak for this row, already formatted in the active currency. */
  leakLabel: string;
  onChange: (next: TaskInput) => void;
}

const sliderClass =
  'w-full h-1.5 appearance-none rounded-full bg-border accent-primary cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-background disabled:cursor-not-allowed';

const TaskRow = ({ task, value, leakLabel, onChange }: TaskRowProps) => {
  const { enabled, hours, people } = value;
  const toggle = () => onChange({ ...value, enabled: !enabled });

  return (
    <div
      className={`border-b border-r border-border p-5 transition-colors ${
        enabled ? 'bg-secondary/40' : 'hover:bg-secondary/20'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={toggle}
          className={`mt-0.5 h-5 w-5 shrink-0 rounded-[6px] border transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
            focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              enabled
                ? 'bg-primary border-primary'
                : 'border-border-strong hover:border-foreground'
            }`}
        >
          {enabled && <Check size={14} className="text-white mx-auto" strokeWidth={3} />}
          <span className="sr-only">
            {enabled ? 'Remove' : 'Add'} {task.label}
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={toggle}
            className="block w-full text-left"
          >
            <span className="font-display font-semibold text-[15px] leading-snug">
              {task.label}
            </span>
            <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="klabel normal-case tracking-normal text-[11px]">
                {Math.round(task.automatable * 100)}% automatable
              </span>
              <span className="text-faint text-[11px]">·</span>
              <span className="text-muted-foreground text-[11px]">{task.service}</span>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {enabled && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="pt-4 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="flex items-baseline justify-between mb-2">
                      <span className="text-muted-foreground text-[12.5px]">Hours per week</span>
                      <span className="font-mono text-[13px] text-foreground tabular-nums">
                        {hours}h
                      </span>
                    </span>
                    <input
                      type="range"
                      min={HOURS_MIN}
                      max={HOURS_MAX}
                      step={1}
                      value={hours}
                      onChange={(e) => onChange({ ...value, hours: Number(e.target.value) })}
                      className={sliderClass}
                    />
                  </label>

                  <label className="block">
                    <span className="flex items-baseline justify-between mb-2">
                      <span className="text-muted-foreground text-[12.5px]">People doing it</span>
                      <span className="font-mono text-[13px] text-foreground tabular-nums">
                        {people}
                      </span>
                    </span>
                    <input
                      type="range"
                      min={PEOPLE_MIN}
                      max={PEOPLE_MAX}
                      step={1}
                      value={people}
                      onChange={(e) => onChange({ ...value, people: Number(e.target.value) })}
                      className={sliderClass}
                    />
                  </label>
                </div>

                <p className="mt-4 font-mono text-[12.5px] text-primary tabular-nums">
                  {leakLabel} / year
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TaskRow;
