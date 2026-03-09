import { motion } from 'framer-motion';

const clients = [
  { name: 'Alyra', logo: '/alyra.png' },
  { name: 'Cee Dee Vacuum', logo: '/cee-dee-logo.png' },
  { name: 'Promunch', logo: '/promunch.png' },
  { name: 'TinyTi', logo: '/tinyti.png' },
  { name: 'Vippy Spinpro', logo: '/vippyspinpro.png' },
];

const LogoCard = ({ client }: { client: (typeof clients)[0] }) => (
  <div className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px]">
    <div className="group trust-card h-full flex flex-col items-center p-6 md:p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 relative overflow-hidden">
      {/* Subtle inner glow behind logo on hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center mb-4 flex-shrink-0 relative z-10">
        <img
          src={client.logo}
          alt={`${client.name} - Client of Oltaflock AI`}
          className="w-full h-full object-contain drop-shadow-sm"
          loading="lazy"
          width={128}
          height={128}
        />
      </div>
      <span className="text-muted-foreground text-sm md:text-base font-medium text-center group-hover:text-foreground transition-colors relative z-10">
        {client.name}
      </span>
    </div>
  </div>
);

const TrustBar = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Ambient background – radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.6] dark:opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, hsl(var(--primary) / 0.08), transparent 70%)',
        }}
      />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <span
              className="h-px w-8 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5))' }}
            />
            <p className="text-muted-foreground text-xs uppercase tracking-[0.25em] font-semibold">
              Trusted by growing businesses
            </p>
            <span
              className="h-px w-8 rounded-full"
              style={{ background: 'linear-gradient(90deg, hsl(var(--primary) / 0.5), transparent)' }}
            />
          </div>
          <p className="text-foreground/60 text-sm max-w-md mx-auto">
            Joining innovative companies who automate with OltaFlock
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative -mx-4"
        >
          {/* Fade edges – stronger gradient for depth */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--background)), transparent)',
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(270deg, hsl(var(--background)), transparent)',
            }}
          />

          <div className="overflow-hidden py-2">
            <div className="flex animate-marquee gap-6 md:gap-8 w-max">
              {[...clients, ...clients].map((client, index) => (
                <LogoCard key={`${client.name}-${index}`} client={client} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
