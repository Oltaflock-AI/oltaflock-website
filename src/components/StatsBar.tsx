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
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 lg:gap-24"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 text-center sm:text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <stat.icon className="text-primary" size={22} />
              </div>
              <div>
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
