import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  { question: 'What is AI automation and how can it help my business?', answer: 'AI automation combines artificial intelligence with workflow automation to handle repetitive tasks: customer support, lead qualification, data sync, and reporting. Our custom AI systems eliminate manual work, reduce errors, and free your team to focus on growth. Clients typically reclaim 10+ hours weekly from day one.' },
  { question: 'How long does it take to implement AI automation?', answer: 'Timelines vary by scope. A focused automation (e.g., AI customer support or CRM integration) can be live in 4–8 weeks. Larger business process automation projects may take 2–4 months. We provide a clear roadmap during discovery so you know what to expect before we start.' },
  { question: 'Can AI automation work with our existing tools?', answer: 'Yes. We design system integrations so your AI agents and workflow automation connect seamlessly to your CRM, help desk, email, and other tools. Our custom AI systems are built to fit your existing stack, not replace it.' },
  { question: 'What industries do you serve?', answer: 'We serve small businesses, startups, and enterprises across industries: retail, SaaS, professional services, e-commerce, and more. Whether you need CRM & sales automation, customer support automation, or internal workflow automation, we tailor solutions to your sector.' },
  { question: 'How much does custom AI automation cost?', answer: 'Investment depends on scope and complexity. We provide a personalized assessment and ROI projection after discussing your needs. Many clients see payback within months from time savings and efficiency gains. Schedule a free consultation to get a tailored estimate.' },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-14 sm:py-20 scroll-mt-20 bg-secondary/40 border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <p className="klabel mb-4">06 / FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">Frequently asked questions</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Common questions about AI automation, workflow automation, and our custom AI systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full panel px-5 sm:px-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-display font-semibold text-[16px] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-[14.5px] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/faq" className="btn-primary group">
              View all FAQs
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href="#send-message" className="btn-ghost">Get in touch</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
