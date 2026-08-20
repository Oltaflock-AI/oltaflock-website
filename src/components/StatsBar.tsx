import { motion } from 'framer-motion';
import CountUp from '@/components/ui/count-up';

const STATS = [
  { prefix: '', value: 90, suffix: ' sec', t: 'average first response to a lead, down from 4 hrs 20 min' },
  { prefix: '+', value: 43, suffix: '%', t: 'monthly revenue after launch' },
  { prefix: '', value: 576, suffix: ' hrs', t: 'of team time handed back every year' },
  { prefix: '', value: 7, suffix: ' days', t: 'to install the system, end to end' },
];

const StatsBar = () => {
  return (
    <section className="section-container pb-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border rounded-xl overflow-hidden bg-card"
      >
        {STATS.map((s) => (
          <div
            key={s.t}
            className="p-7 sm:p-8 border-b border-r border-border"
          >
            <div className="font-display font-extrabold text-4xl sm:text-[2.75rem] tracking-tight tabular-nums">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-[14.5px] text-muted-foreground">{s.t}</p>
          </div>
        ))}
      </motion.div>

      <p className="mt-3 text-[13px] text-muted-foreground">
        Measured at <span className="text-foreground font-medium">Rise &amp; Shine Travels</span> across 400+ enquiries,
        before and after their Oltaflock AI system went live. Your numbers will depend on your business.
      </p>
    </section>
  );
};

export default StatsBar;
