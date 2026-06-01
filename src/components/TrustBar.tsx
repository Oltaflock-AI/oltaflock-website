import { motion } from 'framer-motion';

const clients = [
  { name: 'Alyra', logo: '/alyra.png' },
  { name: 'Cee Dee Vacuum', logo: '/cee-dee-logo.png' },
  { name: 'Promunch', logo: '/promunch.png' },
  { name: 'TinyTi', logo: '/tinyti.png' },
  { name: 'Vippy Spinpro', logo: '/vippyspinpro.png' },
];

const TrustBar = () => {
  const row = [...clients, ...clients];
  return (
    <section className="py-12 sm:py-16">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="klabel text-center mb-9 text-[13px] sm:text-[15px]"
        >
          Trusted by growing businesses
        </motion.p>
      </div>

      <div className="marquee-group marquee-mask">
        <div className="marquee-track" style={{ ['--marquee-duration' as string]: '18s' }}>
          {row.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="group flex flex-col items-center justify-center gap-3 mx-3 px-8 h-32 w-44 rounded-xl border border-border bg-card shrink-0 transition-all duration-300 hover:border-border-strong hover:shadow-[0_8px_24px_-12px_hsl(var(--foreground)/0.18)] hover:-translate-y-0.5"
            >
              <img
                src={client.logo}
                alt={`${client.name} — client of Oltaflock AI`}
                className="h-12 w-auto max-w-[120px] object-contain transition-transform duration-300 group-hover:scale-[1.06]"
                loading="lazy"
                width={120}
                height={48}
              />
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
