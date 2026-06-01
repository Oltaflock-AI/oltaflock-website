import { motion } from 'framer-motion';
import { Layers, Sparkles, Shield, Workflow, TrendingUp, Lock } from 'lucide-react';

const features = [
  { icon: Layers, title: 'System-First Architecture', description: 'We design automation like infrastructure, not scripts. Modular, scalable, observable, and production-grade from day one.' },
  { icon: Sparkles, title: 'AI + Deterministic Fusion', description: 'We blend AI intelligence with deterministic automation for reliability, safety, and predictability.' },
  { icon: Shield, title: 'Production Reliability by Design', description: 'Built to run 24/7 without breaking. Engineered for uptime, fault tolerance, retries, monitoring, and resilience.' },
  { icon: Workflow, title: 'Business-Logic Driven Automation', description: 'Your workflows define the system, not templates. Every automation mirrors your real operations and edge cases.' },
  { icon: TrendingUp, title: 'Continuous Optimization Loop', description: 'Your system improves every week through monitoring, performance tuning, and iterative upgrades.' },
  { icon: Lock, title: 'Security, Compliance & Data Integrity', description: 'Enterprise-grade security with encrypted data flows, access controls, and audit logging.' },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-14 sm:py-20 scroll-mt-20 border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <p className="klabel mb-4">03 / Why Us</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Automation that <span className="text-primary">actually works</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Our engineering principles for building AI systems that scale, adapt, and perform in production.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border rounded-xl overflow-hidden">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
              className="group p-6 border-b border-r border-border hover:bg-secondary/50 transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:-rotate-3">
                <feature.icon className="text-primary transition-colors group-hover:text-white" size={20} />
              </span>
              <h3 className="font-display font-semibold text-[17px] mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
