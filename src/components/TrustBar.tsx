import { motion } from 'framer-motion';

const clients = [
  { name: 'Cee Dee Vacuum', initials: 'CDV' },
  { name: 'Real Estate Pro', initials: 'REP' },
  { name: 'Promunch', initials: 'PM' },
  { name: 'TechFlow Inc', initials: 'TF' },
];

const TrustBar = () => {
  return (
    <section className="py-16 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-muted-foreground text-sm uppercase tracking-wider font-medium">
            Trusted by growing businesses
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                <span className="font-display font-bold text-foreground text-sm">
                  {client.initials}
                </span>
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                {client.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;
