import { motion } from 'framer-motion';
import {
  MessageCircle, Mail, RefreshCcw, UserCheck, ClipboardList, LayoutDashboard,
} from 'lucide-react';

const segments = [
  { id: 'small-business', title: 'Small Businesses', copy: 'Compete with bigger players without hiring a team. AI automation that fits your budget.' },
  { id: 'startups', title: 'Startups', copy: 'Scale fast without the chaos. Automated CRM, support, and sales workflows from day one.' },
  { id: 'enterprises', title: 'Enterprises', copy: 'Complex workflows, integrated and secure. Custom AI that meets enterprise standards.' },
];

const useCases = [
  { icon: MessageCircle, title: 'AI Customer Support Agent', benefit: 'Resolve 80% instantly', description: 'Intelligent chatbot handling FAQs, troubleshooting, and seamless escalation.' },
  { icon: Mail, title: 'Sales Follow-up Automation', benefit: 'Never miss a lead', description: 'Automated sequences that nurture leads with personalized, timely messages.' },
  { icon: RefreshCcw, title: 'CRM Auto-Sync', benefit: 'Zero manual entry', description: 'Real-time synchronization across all your business tools and platforms.' },
  { icon: UserCheck, title: 'Lead Qualification AI', benefit: 'Focus on hot leads', description: 'AI scoring and routing that prioritizes your highest-value opportunities.' },
  { icon: ClipboardList, title: 'Internal Task Automation', benefit: 'Reclaim 10+ hrs/wk', description: 'Automated approvals, assignments, and notifications for smooth operations.' },
  { icon: LayoutDashboard, title: 'Real-Time Dashboards', benefit: 'Instant insight', description: 'Live dashboards pulling data from all sources for informed decisions.' },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="py-14 sm:py-20 scroll-mt-20 bg-secondary/40 border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <p className="klabel mb-4">04 / Use Cases</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Real automation. <span className="text-primary">Real impact.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            See how businesses transform operations with intelligent workflows, AI agents, and business
            automation that deliver measurable results.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 border-t border-l border-border rounded-xl overflow-hidden bg-card mb-6">
          {segments.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-24 p-6 border-b border-r border-border">
              <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.copy}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border rounded-xl overflow-hidden bg-card">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
              className="group p-6 border-b border-r border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <useCase.icon className="text-primary transition-colors group-hover:text-white" size={20} />
                </span>
                <span className="font-mono text-[11px] text-primary border border-primary/30 rounded-full px-2.5 py-1">
                  {useCase.benefit}
                </span>
              </div>
              <h3 className="font-display font-semibold text-[17px] mb-2">{useCase.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
