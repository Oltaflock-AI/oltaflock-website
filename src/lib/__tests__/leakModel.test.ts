import { describe, expect, it } from 'vitest';
import {
  CURRENCIES,
  TASKS,
  WEEKS_PER_YEAR,
  computeLeak,
  defaultInputs,
  formatMoney,
} from '../leakModel';
import type { Inputs } from '../leakModel';

/** Builds inputs with only the named tasks enabled. */
const withTasks = (
  enabled: Record<string, { hours: number; people?: number }>,
  overrides: Partial<Inputs> = {}
): Inputs => {
  const base = defaultInputs(overrides.currency ?? 'USD');
  for (const [id, cfg] of Object.entries(enabled)) {
    base.rows[id] = { enabled: true, hours: cfg.hours, people: cfg.people ?? 1 };
  }
  return { ...base, ...overrides, rows: base.rows };
};

describe('computeLeak', () => {
  it('multiplies hours by people by weeks by rate, then takes the automatable share', () => {
    const result = computeLeak(
      withTasks({ 'lead-followup': { hours: 6 } }, { hourlyRate: 25 })
    );

    // 6 x 1 x 52 x 25 = 7800, of which 85% is automatable.
    expect(result.perTask[0].annualCost).toBe(7800);
    expect(result.perTask[0].leak).toBe(6630);
    expect(result.totalLeak).toBe(6630);
  });

  it('scales with headcount', () => {
    const one = computeLeak(withTasks({ 'crm-data-entry': { hours: 5, people: 1 } }, { hourlyRate: 25 }));
    const three = computeLeak(withTasks({ 'crm-data-entry': { hours: 5, people: 3 } }, { hourlyRate: 25 }));

    expect(three.totalLeak).toBe(one.totalLeak * 3);
  });

  it('totals equal the sum of the per-task figures', () => {
    const result = computeLeak(
      withTasks({
        'lead-followup': { hours: 6 },
        'crm-data-entry': { hours: 5 },
        'support-replies': { hours: 8 },
      }, { hourlyRate: 25 })
    );

    expect(result.totalLeak).toBe(result.perTask.reduce((s, t) => s + t.leak, 0));
    expect(result.totalAnnualCost).toBe(result.perTask.reduce((s, t) => s + t.annualCost, 0));
    expect(result.totalLeak).toBe(19760);
    expect(result.totalAnnualCost).toBe(24700);
  });

  it('reports the weekly hours the automatable share represents', () => {
    const result = computeLeak(
      withTasks({
        'lead-followup': { hours: 6 },   // 6 x 0.85 = 5.1
        'crm-data-entry': { hours: 5 },  // 5 x 0.90 = 4.5
        'support-replies': { hours: 8 }, // 8 x 0.70 = 5.6
      }, { hourlyRate: 25 })
    );

    expect(result.weeklyHoursReclaimed).toBe(15.2);
  });

  it('returns zeros when nothing is enabled', () => {
    const result = computeLeak(defaultInputs('USD'));

    expect(result.perTask).toEqual([]);
    expect(result.totalLeak).toBe(0);
    expect(result.totalAnnualCost).toBe(0);
    expect(result.topThree).toEqual([]);
    expect(result.weeklyHoursReclaimed).toBe(0);
  });

  it('ignores enabled tasks with zero hours', () => {
    const result = computeLeak(withTasks({ 'reporting': { hours: 0 } }, { hourlyRate: 25 }));

    expect(result.perTask).toEqual([]);
    expect(result.totalLeak).toBe(0);
  });

  it('orders tasks by leak, largest first, and caps topThree at three', () => {
    const result = computeLeak(
      withTasks({
        'lead-followup': { hours: 2 },
        'crm-data-entry': { hours: 10 },
        'support-replies': { hours: 6 },
        'reporting': { hours: 4 },
      }, { hourlyRate: 25 })
    );

    const leaks = result.perTask.map((t) => t.leak);
    expect(leaks).toEqual([...leaks].sort((a, b) => b - a));
    expect(result.perTask[0].id).toBe('crm-data-entry');
    expect(result.topThree).toHaveLength(3);
    expect(result.topThree.map((t) => t.id)).toEqual(result.perTask.slice(0, 3).map((t) => t.id));
  });

  it('returns fewer than three recommendations when fewer tasks are on', () => {
    const result = computeLeak(withTasks({ 'reporting': { hours: 4 } }, { hourlyRate: 25 }));
    expect(result.topThree).toHaveLength(1);
  });

  it('computes INR the same way, at the INR rate', () => {
    const result = computeLeak(
      withTasks({ 'lead-followup': { hours: 6 } }, { currency: 'INR', hourlyRate: 450 })
    );

    // 6 x 52 x 450 = 140400, of which 85% is automatable.
    expect(result.totalLeak).toBe(119340);
    expect(result.currency.code).toBe('INR');
  });

  it('clamps an out-of-range hourly rate to the currency bounds', () => {
    const tooHigh = computeLeak(withTasks({ 'reporting': { hours: 1 } }, { hourlyRate: 10_000 }));
    const tooLow = computeLeak(withTasks({ 'reporting': { hours: 1 } }, { hourlyRate: -50 }));

    expect(tooHigh.hourlyRate).toBe(CURRENCIES.USD.maxRate);
    expect(tooLow.hourlyRate).toBe(CURRENCIES.USD.minRate);
  });

  it('clamps hours and headcount from a tampered payload', () => {
    const result = computeLeak(
      withTasks({ 'reporting': { hours: 500, people: 900 } }, { hourlyRate: 25 })
    );

    expect(result.perTask[0].hours).toBe(40);
    expect(result.perTask[0].people).toBe(25);
  });

  it('ignores unknown task ids rather than throwing', () => {
    const inputs = defaultInputs('USD');
    inputs.rows['not-a-real-task'] = { enabled: true, hours: 40, people: 10 };

    expect(() => computeLeak(inputs)).not.toThrow();
    expect(computeLeak(inputs).totalLeak).toBe(0);
  });

  it('survives a missing rows object', () => {
    const result = computeLeak({ currency: 'USD', hourlyRate: 25, rows: undefined as never });
    expect(result.totalLeak).toBe(0);
  });
});

describe('presets', () => {
  it('uses a 52-week year', () => {
    expect(WEEKS_PER_YEAR).toBe(52);
  });

  it('has unique task ids and automatable shares between 0 and 1', () => {
    const ids = TASKS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const task of TASKS) {
      expect(task.automatable).toBeGreaterThan(0);
      expect(task.automatable).toBeLessThanOrEqual(1);
    }
  });
});

describe('formatMoney', () => {
  it('renders whole currency units', () => {
    expect(formatMoney(19760, CURRENCIES.USD)).toBe('$19,760');
  });

  it('groups INR in lakhs', () => {
    expect(formatMoney(119340, CURRENCIES.INR)).toBe('₹1,19,340');
  });
});
