import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Mail, 
  RefreshCcw, 
  UserCheck, 
  ClipboardList, 
  LayoutDashboard 
} from 'lucide-react';

const useCases = [
  {
    icon: MessageCircle,
    title: 'AI Customer Support Agent',
    benefit: 'Resolve 80% of inquiries instantly',
    description: 'Intelligent chatbot handling FAQs, troubleshooting, and seamless escalation.',
  },
  {
    icon: Mail,
    title: 'Sales Follow-up Automation',
    benefit: 'Never miss a lead again',
    description: 'Automated sequences that nurture leads with personalized, timely messages.',
  },
  {
    icon: RefreshCcw,
    title: 'CRM Auto-Sync',
    benefit: 'Zero manual data entry',
    description: 'Real-time synchronization across all your business tools and platforms.',
  },
  {
    icon: UserCheck,
    title: 'Lead Qualification AI',
    benefit: 'Focus only on hot leads',
    description: 'AI scoring and routing that prioritizes your highest-value opportunities.',
  },
  {
    icon: ClipboardList,
    title: 'Internal Task Automation',
    benefit: 'Reclaim 10+ hours weekly',
    description: 'Automated approvals, assignments, and notifications for smooth operations.',
  },
  {
    icon: LayoutDashboard,
    title: 'Real-Time Dashboards',
    benefit: 'Instant business insights',
    description: 'Live dashboards pulling data from all sources for informed decisions.',
  },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="py-24 relative bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Real Automation. <span className="gradient-text">Real Impact.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how businesses transform operations with <strong>AI automation</strong>: intelligent workflows, AI agents, and business automation that deliver measurable results.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          <div id="small-business" className="scroll-mt-24 p-5 rounded-xl border border-border/80 bg-card/80">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Small Businesses</h3>
            <p className="text-muted-foreground text-sm">
              Compete with bigger players without hiring a team. AI automation that fits your budget.
            </p>
          </div>
          <div id="startups" className="scroll-mt-24 p-5 rounded-xl border border-border/80 bg-card/80">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Startups</h3>
            <p className="text-muted-foreground text-sm">
              Scale fast without the chaos. Automated CRM, support, and sales workflows from day one.
            </p>
          </div>
          <div id="enterprises" className="scroll-mt-24 p-5 rounded-xl border border-border/80 bg-card/80">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Enterprises</h3>
            <p className="text-muted-foreground text-sm">
              Complex workflows, integrated and secure. Custom AI that meets enterprise standards.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover p-6 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <useCase.icon className="text-accent" size={24} />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {useCase.benefit}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
