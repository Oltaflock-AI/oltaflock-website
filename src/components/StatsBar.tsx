import { motion } from 'framer-motion';
import CountUp from '@/components/ui/count-up';

const STATS = [
  { prefix: '', value: 80, suffix: '%', t: 'of support tickets resolved instantly' },
  { prefix: '+', value: 340, suffix: '%', t: 'efficiency gains for clients' },
  { prefix: '', value: 10, suffix: '+ hrs', t: 'reclaimed weekly, from day one' },
];

const StatsBar = () => {
  return (
    <section className="section-container pb-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="grid sm:grid-cols-3 border border-border rounded-xl overflow-hidden bg-card"
      >
        {STATS.map((s) => (
          <div key={s.t} className="p-7 sm:p-8 border-b sm:border-b-0 sm:border-r border-border last:border-0">
            <div className="font-display font-extrabold text-4xl sm:text-[2.75rem] tracking-tight tabular-nums">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-[14.5px] text-muted-foreground">{s.t}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default StatsBar;
