import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is AI automation and how can it help my business?',
    answer:
      'AI automation combines artificial intelligence with workflow automation to handle repetitive tasks: customer support, lead qualification, data sync, and reporting. Our custom AI systems eliminate manual work, reduce errors, and free your team to focus on growth. Clients typically reclaim 10+ hours weekly from day one.',
  },
  {
    question: 'How long does it take to implement AI automation?',
    answer:
      'Timelines vary by scope. A focused automation (e.g., AI customer support or CRM integration) can be live in 4–8 weeks. Larger business process automation projects may take 2–4 months. We provide a clear roadmap during discovery so you know what to expect before we start.',
  },
  {
    question: 'Can AI automation work with our existing tools?',
    answer:
      'Yes. We design system integrations so your AI agents and workflow automation connect seamlessly to your CRM, help desk, email, and other tools. Our custom AI systems are built to fit your existing stack, not replace it.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'We serve small businesses, startups, and enterprises across industries: retail, SaaS, professional services, e-commerce, and more. Whether you need CRM & sales automation, customer support automation, or internal workflow automation, we tailor solutions to your sector.',
  },
  {
    question: 'How much does custom AI automation cost?',
    answer:
      'Investment depends on scope and complexity. We provide a personalized assessment and ROI projection after discussing your needs. Many clients see payback within months from time savings and efficiency gains. Schedule a free consultation to get a tailored estimate.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 30%, hsl(var(--electric-indigo) / 0.08) 0%, transparent 50%)',
        }}
      />
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Common questions about AI automation, workflow automation, and our custom AI systems.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground text-sm mb-4">
            Have more questions about business automation or AI agents?
          </p>
          <a
            href="#send-message"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
