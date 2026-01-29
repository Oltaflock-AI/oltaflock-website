import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const features = [
  {
    title: '100% Custom Systems',
    description: 'No templates. Every solution is designed and built specifically for your business.',
  },
  {
    title: 'Industry-Agnostic Expertise',
    description: 'We work across all industries, bringing diverse automation experience to your project.',
  },
  {
    title: 'End-to-End Automation',
    description: 'From strategy to execution to optimization — we handle the entire automation journey.',
  },
  {
    title: 'AI + RPA Hybrid Systems',
    description: 'Combining intelligent AI with robust process automation for maximum impact.',
  },
  {
    title: 'Production-Grade Engineering',
    description: 'Enterprise-quality systems built to scale, perform, and last.',
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Systems designed to grow with your business without breaking or slowing down.',
  },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 relative">
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: 'radial-gradient(circle at 70% 50%, hsl(234 89% 60% / 0.1) 0%, transparent 50%)',
      }} />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Why Businesses Choose{' '}
              <span className="gradient-text">Oltaflock</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We're not just another automation vendor. We're your strategic partner 
              in building systems that transform how you operate.
            </p>
            <a href="#book-call" className="btn-primary inline-flex items-center gap-2">
              <span>Start Your Transformation</span>
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-5 group hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-primary" size={14} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
