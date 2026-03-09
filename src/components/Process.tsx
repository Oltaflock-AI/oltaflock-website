import { motion } from 'framer-motion';
import { Search, PenTool, Code, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    label: 'Analyze',
    title: 'Discovery & Workflow Mapping',
    description: 'We deeply analyze your workflows, tools, bottlenecks, and growth objectives to uncover high-ROI automation opportunities.',
  },
  {
    icon: PenTool,
    number: '02',
    label: 'Architect',
    title: 'System Architecture & AI Design',
    description: 'We design a production-grade AI + automation architecture tailored to your business logic, scale, and reliability needs.',
  },
  {
    icon: Code,
    number: '03',
    label: 'Build',
    title: 'Development & System Build',
    description: 'We engineer robust AI pipelines, automation workflows, dashboards, and intelligent agents, built for performance, security, and scale.',
  },
  {
    icon: Rocket,
    number: '04',
    label: 'Launch',
    title: 'Testing, Deployment & Integration',
    description: 'We rigorously test, deploy, and integrate your system into existing tools to ensure reliability, accuracy, and zero disruption.',
  },
  {
    icon: TrendingUp,
    number: '05',
    label: 'Scale',
    title: 'Optimization, Monitoring & Scale',
    description: 'We continuously monitor, optimize, and evolve your automation systems to maximize ROI and support long-term growth.',
  },
];

const Process = () => {
  return (
    <section id="process" className="py-24 relative bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How We Build AI Automation <br />
            <span className="gradient-text">That Actually Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A proven process for custom AI systems and workflow automation. Results, not just promises.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
          
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 0 ? '' : 'lg:direction-rtl'
                }`}
              >
                <div className={`lg:py-8 ${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16 lg:col-start-2'}`}>
                  <div className={`glass-card p-6 inline-block ${index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
                    <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <step.icon className="text-primary" size={24} />
                      </div>
                      <div className="text-center">
                        <span className="font-display text-4xl font-bold text-primary/20 block">
                          {step.number}
                        </span>
                        <span className="text-xs font-medium text-primary/60 uppercase tracking-wider">
                          {step.label}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-2 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                    className="w-4 h-4 rounded-full bg-primary border-4 border-background"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
