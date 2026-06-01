import { motion } from 'framer-motion';
import {
  Bot, Workflow, Users, MessageSquare, Cog, BarChart3, Wrench, Link,
} from 'lucide-react';
import TiltCard from '@/components/ui/tilt-card';

const services = [
  { icon: Bot, title: 'AI Agents', description: 'Intelligent agents that handle complex tasks, make decisions, and work autonomously 24/7.' },
  { icon: Workflow, title: 'Business Process Automation', description: 'End-to-end automation of repetitive workflows to save time and reduce errors.' },
  { icon: Users, title: 'CRM & Sales Automation', description: 'Automated lead nurturing, follow-ups, and pipeline management that never sleeps.' },
  { icon: MessageSquare, title: 'Customer Support Automation', description: 'AI-powered support systems that resolve issues instantly and escalate when needed.' },
  { icon: Cog, title: 'Internal Workflow Automation', description: 'Streamline internal operations from approvals to onboarding to reporting.' },
  { icon: BarChart3, title: 'Data & Reporting Automation', description: 'Real-time dashboards and automated reports that keep you informed effortlessly.' },
  { icon: Wrench, title: 'Custom AI Tools', description: 'Bespoke AI applications built specifically for your unique business challenges.' },
  { icon: Link, title: 'System Integrations', description: 'Connect all your tools into one seamless, automated ecosystem.' },
];

const Services = () => {
  return (
    <section id="services" className="py-14 sm:py-20 scroll-mt-20 border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <p className="klabel mb-4">01 / Services</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">What We Automate</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From workflow automation to custom AI systems — we handle business process automation,
            CRM &amp; sales, and customer support. We take care of everything that slows you down.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border rounded-xl overflow-hidden">
          {services.map((service, index) => (
            <TiltCard
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
              className="group p-6 border-b border-r border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110 group-hover:-rotate-3">
                  <service.icon className="text-primary transition-colors group-hover:text-white" size={20} />
                </span>
                <span className="font-mono text-[12px] text-faint transition-colors group-hover:text-primary">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-display font-semibold text-[17px] mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
