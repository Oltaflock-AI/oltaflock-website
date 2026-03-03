import { motion } from 'framer-motion';
import { 
  Layers, 
  Sparkles, 
  Shield, 
  Workflow, 
  TrendingUp, 
  Lock 
} from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: 'System-First Architecture',
    description: 'We design automation like infrastructure, not scripts. Our systems are modular, scalable, observable, and production-grade from day one.',
  },
  {
    icon: Sparkles,
    title: 'AI + Deterministic Workflow Fusion',
    description: 'We blend AI intelligence with deterministic automation for reliability, safety, and predictability.',
  },
  {
    icon: Shield,
    title: 'Production Reliability by Design',
    description: 'Built to run 24/7 without breaking. Engineered for uptime, fault tolerance, retries, monitoring, and resilience.',
  },
  {
    icon: Workflow,
    title: 'Business-Logic Driven Automation',
    description: 'Your workflows define the system, not templates. Every automation mirrors your real operations and edge cases.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Optimization Loop',
    description: 'Your system improves every week through monitoring, performance tuning, and iterative upgrades.',
  },
  {
    icon: Lock,
    title: 'Security, Compliance & Data Integrity',
    description: 'Enterprise-grade security with encrypted data flows, access controls, and audit logging.',
  },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 relative">
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: 'radial-gradient(circle at 70% 50%, hsl(var(--electric-indigo) / 0.1) 0%, transparent 50%)',
      }} />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How Oltaflock Builds Automation <br />
            <span className="gradient-text">That Actually Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our engineering principles for building AI systems that scale, adapt, and perform in production.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 group hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
