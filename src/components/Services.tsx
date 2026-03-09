import { motion } from 'framer-motion';
import { 
  Bot, 
  Workflow, 
  Users, 
  MessageSquare, 
  Cog, 
  BarChart3, 
  Wrench, 
  Link 
} from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Intelligent agents that handle complex tasks, make decisions, and work autonomously 24/7.',
  },
  {
    icon: Workflow,
    title: 'Business Process Automation',
    description: 'End-to-end automation of repetitive workflows to save time and reduce errors.',
  },
  {
    icon: Users,
    title: 'CRM & Sales Automation',
    description: 'Automated lead nurturing, follow-ups, and pipeline management that never sleeps.',
  },
  {
    icon: MessageSquare,
    title: 'Customer Support Automation',
    description: 'AI-powered support systems that resolve issues instantly and escalate when needed.',
  },
  {
    icon: Cog,
    title: 'Internal Workflow Automation',
    description: 'Streamline internal operations from approvals to onboarding to reporting.',
  },
  {
    icon: BarChart3,
    title: 'Data & Reporting Automation',
    description: 'Real-time dashboards and automated reports that keep you informed effortlessly.',
  },
  {
    icon: Wrench,
    title: 'Custom AI Tools',
    description: 'Bespoke AI applications built specifically for your unique business challenges.',
  },
  {
    icon: Link,
    title: 'System Integrations',
    description: 'Connect all your tools into one seamless, automated ecosystem.',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(var(--electric-indigo) / 0.08) 0%, transparent 50%)',
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
            What We <span className="gradient-text">Automate</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From workflow automation to custom AI systems, we handle <strong>business process automation</strong>, CRM & sales automation, and customer support automation. We take care of everything that slows you down.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover p-6 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
