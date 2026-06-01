import { motion } from 'framer-motion';

const steps = [
  { number: '01', label: 'Analyze', title: 'Discovery & Workflow Mapping', description: 'We analyze your workflows, tools, bottlenecks, and growth objectives to uncover high-ROI automation opportunities.' },
  { number: '02', label: 'Architect', title: 'System Architecture & AI Design', description: 'We design a production-grade AI + automation architecture tailored to your business logic, scale, and reliability needs.' },
  { number: '03', label: 'Build', title: 'Development & System Build', description: 'We engineer robust AI pipelines, automation workflows, dashboards, and intelligent agents — built for performance and scale.' },
  { number: '04', label: 'Launch', title: 'Testing, Deployment & Integration', description: 'We rigorously test, deploy, and integrate your system into existing tools to ensure reliability and zero disruption.' },
  { number: '05', label: 'Scale', title: 'Optimization, Monitoring & Scale', description: 'We continuously monitor, optimize, and evolve your automation systems to maximize ROI and support long-term growth.' },
];

const Process = () => {
  return (
    <section id="process" className="py-14 sm:py-20 scroll-mt-20 bg-secondary/40 border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <p className="klabel mb-4">02 / Process</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            How We Build AI Automation <span className="text-primary">That Actually Works</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A proven process for custom AI systems and workflow automation. Results, not just promises.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-border rounded-xl overflow-hidden bg-card">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="p-6 border-b border-r border-border"
            >
              <div className="font-mono text-[13px] text-primary">{step.number}</div>
              <div className="klabel mt-4 mb-2">{step.label}</div>
              <h3 className="font-display font-semibold text-[15.5px] leading-snug mb-2.5">{step.title}</h3>
              <p className="text-muted-foreground text-[13.5px] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
