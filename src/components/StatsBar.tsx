import { motion } from 'framer-motion';
import { Zap, Gauge, Clock } from 'lucide-react';

const STATS = [
  {
    icon: Zap,
    label: 'Speed',
    claim: '80% of support tickets resolved instantly',
  },
  {
    icon: Gauge,
    label: 'Efficiency',
    claim: '+340% efficiency gains for clients',
  },
  {
    icon: Clock,
    label: 'Time saved',
    claim: '10+ hours reclaimed weekly',
  },
];

const StatsBar = () => {
  return (
    <section className="relative py-12 border-y border-border/60 bg-secondary/20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-16 lg:gap-24 items-start sm:items-center"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 w-full sm:flex-col sm:text-center"
            >
              <div className="w-12 h-12 min-w-[3rem] rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <stat.icon className="text-primary" size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                  {stat.label}
                </p>
                <p className="text-base font-semibold text-foreground">
                  {stat.claim}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBar;
