/**
 * Pure leak model for the automation ROI calculator.
 *
 * Deliberately conservative: annual cost is hours x people x 52 weeks x hourly
 * cost, and only the automatable share of that counts as "leak". Every input
 * and every percentage is shown on the page, so the number survives being
 * forwarded to somebody who wants to argue with it.
 *
 * No React and no Node imports — the browser and the Vercel function both use
 * this module, so the figures shown on the page and the figures in the emailed
 * report can never drift apart.
 */

export const WEEKS_PER_YEAR = 52;

export type CurrencyCode = 'USD' | 'INR';

export interface CurrencyPreset {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** Fully loaded cost of an hour of staff time, not take-home pay. */
  defaultRate: number;
  minRate: number;
  maxRate: number;
  rateStep: number;
  /** en-US keeps grouping predictable; en-IN gives lakh/crore grouping. */
  locale: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyPreset> = {
  USD: {
    code: 'USD',
    symbol: '$',
    label: 'USD',
    defaultRate: 25,
    minRate: 5,
    maxRate: 200,
    rateStep: 1,
    locale: 'en-US',
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    label: 'INR',
    defaultRate: 450,
    minRate: 100,
    maxRate: 5000,
    rateStep: 25,
    locale: 'en-IN',
  },
};

export interface TaskPreset {
  id: string;
  label: string;
  /** The Oltaflock service that removes this cost. */
  service: string;
  blurb: string;
  defaultHours: number;
  defaultPeople: number;
  /** 0..1, shown on the row so the assumption is never hidden. */
  automatable: number;
}

export const TASKS: TaskPreset[] = [
  {
    id: 'lead-followup',
    label: 'Lead follow-up and outreach',
    service: 'CRM & Sales Automation',
    blurb: 'Sequences that chase every lead on time, in your tone, without anyone remembering to.',
    defaultHours: 6,
    defaultPeople: 1,
    automatable: 0.85,
  },
  {
    id: 'crm-data-entry',
    label: 'CRM data entry and record updates',
    service: 'System Integrations',
    blurb: 'Records that update themselves from the systems the data already lives in.',
    defaultHours: 5,
    defaultPeople: 1,
    automatable: 0.9,
  },
  {
    id: 'support-replies',
    label: 'Repeat customer support replies',
    service: 'Customer Support Automation',
    blurb: 'An agent that answers the questions you have already answered a thousand times, and escalates the rest.',
    defaultHours: 8,
    defaultPeople: 1,
    automatable: 0.7,
  },
  {
    id: 'reporting',
    label: 'Manual reporting and dashboards',
    service: 'Data & Reporting Automation',
    blurb: 'Live dashboards instead of somebody rebuilding the same spreadsheet every Monday.',
    defaultHours: 4,
    defaultPeople: 1,
    automatable: 0.85,
  },
  {
    id: 'quotes-invoices',
    label: 'Quotes, proposals and invoices',
    service: 'Business Process Automation',
    blurb: 'Documents generated from your own data and sent the moment they are approved.',
    defaultHours: 4,
    defaultPeople: 1,
    automatable: 0.75,
  },
  {
    id: 'approvals-onboarding',
    label: 'Approvals, onboarding and handoffs',
    service: 'Internal Workflow Automation',
    blurb: 'Routing, reminders and checklists that move work along without being chased.',
    defaultHours: 3,
    defaultPeople: 1,
    automatable: 0.65,
  },
  {
    id: 'tool-copy-paste',
    label: 'Copy-pasting between tools',
    service: 'System Integrations',
    blurb: 'The tools talk to each other directly, so nobody is the integration any more.',
    defaultHours: 5,
    defaultPeople: 1,
    automatable: 0.9,
  },
  {
    id: 'lead-qualification',
    label: 'Lead qualification and routing',
    service: 'AI Agents',
    blurb: 'Scoring and routing that puts the best leads in front of the right person first.',
    defaultHours: 4,
    defaultPeople: 1,
    automatable: 0.8,
  },
];

export const TASKS_BY_ID: Record<string, TaskPreset> = Object.fromEntries(
  TASKS.map((t) => [t.id, t])
);

export interface TaskInput {
  enabled: boolean;
  hours: number;
  people: number;
}

export interface Inputs {
  currency: CurrencyCode;
  hourlyRate: number;
  rows: Record<string, TaskInput>;
}

export interface TaskResult {
  id: string;
  label: string;
  service: string;
  blurb: string;
  automatable: number;
  hours: number;
  people: number;
  /** Full annual cost of the task. */
  annualCost: number;
  /** The automatable share of annualCost. */
  leak: number;
}

export interface Result {
  currency: CurrencyPreset;
  hourlyRate: number;
  /** Enabled tasks only, largest leak first. */
  perTask: TaskResult[];
  totalAnnualCost: number;
  totalLeak: number;
  /** Leak expressed as hours per week across the team. */
  weeklyHoursReclaimed: number;
  /** The three biggest leaks, used for the recommendations. */
  topThree: TaskResult[];
}

/** Slider bounds, also used to reject nonsense payloads server-side. */
export const HOURS_MIN = 0;
export const HOURS_MAX = 40;
export const PEOPLE_MIN = 1;
export const PEOPLE_MAX = 25;

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

/** Every task off, at its default hours and people, in the given currency. */
export function defaultInputs(currency: CurrencyCode = 'USD'): Inputs {
  return {
    currency,
    hourlyRate: CURRENCIES[currency].defaultRate,
    rows: Object.fromEntries(
      TASKS.map((t) => [
        t.id,
        { enabled: false, hours: t.defaultHours, people: t.defaultPeople },
      ])
    ),
  };
}

/**
 * The whole calculation. Unknown task ids are ignored rather than throwing, so
 * a stale payload from an older client cannot break the report endpoint.
 */
export function computeLeak(inputs: Inputs): Result {
  const currency = CURRENCIES[inputs.currency] ?? CURRENCIES.USD;
  const hourlyRate = clamp(
    Number(inputs.hourlyRate) || 0,
    currency.minRate,
    currency.maxRate
  );

  const perTask: TaskResult[] = [];
  let weeklyHoursReclaimed = 0;

  for (const task of TASKS) {
    const row = inputs.rows?.[task.id];
    if (!row?.enabled) continue;

    const hours = clamp(Number(row.hours) || 0, HOURS_MIN, HOURS_MAX);
    const people = clamp(Math.round(Number(row.people) || 0), PEOPLE_MIN, PEOPLE_MAX);
    if (hours <= 0) continue;

    const annualCost = Math.round(hours * people * WEEKS_PER_YEAR * hourlyRate);
    const leak = Math.round(annualCost * task.automatable);

    weeklyHoursReclaimed += hours * people * task.automatable;

    perTask.push({
      id: task.id,
      label: task.label,
      service: task.service,
      blurb: task.blurb,
      automatable: task.automatable,
      hours,
      people,
      annualCost,
      leak,
    });
  }

  // Largest leak first; equal leaks keep preset order, which is already the
  // order they were pushed in.
  perTask.sort((a, b) => b.leak - a.leak);

  return {
    currency,
    hourlyRate,
    perTask,
    totalAnnualCost: perTask.reduce((sum, t) => sum + t.annualCost, 0),
    totalLeak: perTask.reduce((sum, t) => sum + t.leak, 0),
    weeklyHoursReclaimed: Math.round(weeklyHoursReclaimed * 10) / 10,
    topThree: perTask.slice(0, 3),
  };
}

/** Whole currency units — cents on a five-figure number are noise. */
export function formatMoney(value: number, currency: CurrencyPreset): string {
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(value);
}
