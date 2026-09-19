import ServicePage from '@/components/ServicePage';
import TrustBar from '@/components/TrustBar';

const faqs = [
  {
    q: 'Is Oltaflock AI based in Ahmedabad?',
    a: 'Yes. Oltaflock AI (OLTAFLOCK AI LLP) is an AI automation and AI agent development company registered and based in Ahmedabad, Gujarat. We work with businesses across Ahmedabad, Gandhinagar, Gujarat and the rest of India, and with international clients remotely.',
  },
  {
    q: 'What does an AI automation company do?',
    a: 'An AI automation company designs and builds software that takes repetitive work off your team: AI agents that answer customers, workflows that move data between your tools, automatic follow-ups, reports and approvals. Oltaflock AI builds these as custom systems connected to the tools you already use.',
  },
  {
    q: 'Can we meet in person in Ahmedabad?',
    a: 'Yes. For businesses in and around Ahmedabad we can run the discovery and workflow-mapping session at your office, which helps us see how your team actually works. Build, testing and support then continue remotely with regular check-ins.',
  },
  {
    q: 'How much does AI automation cost for a business in Ahmedabad?',
    a: 'It depends on scope. A single focused automation, such as a WhatsApp support bot or CRM follow-up flow, costs far less than an end-to-end system across sales, support and operations. After a free discovery call we send a fixed quote and an ROI estimate, and we can start with a small pilot. We invoice in INR with GST.',
  },
  {
    q: 'Which industries in Ahmedabad do you work with?',
    a: 'We work with manufacturers, traders and distributors, D2C and e-commerce brands, travel agencies, real estate developers, clinics, coaching institutes and professional services firms. The automation is tailored to each business, so the industry matters less than the workflow.',
  },
  {
    q: 'Do you build WhatsApp automation for Ahmedabad businesses?',
    a: 'Yes. WhatsApp is where most Gujarat businesses talk to customers, so WhatsApp automation is one of our most requested services: AI chatbots, lead follow-up, order updates and CRM sync on the official WhatsApp Business API.',
  },
];

const Ahmedabad = () => (
  <ServicePage
    path="/ai-automation-company-ahmedabad"
    title="AI Automation Company in Ahmedabad | Oltaflock AI"
    description="Oltaflock AI is an AI automation and AI agent development company in Ahmedabad. We automate sales, support, WhatsApp and operations for Gujarat businesses."
    label="Ahmedabad, Gujarat"
    heading={
      <>
        AI automation company in <span className="text-primary">Ahmedabad.</span>
      </>
    }
    intro={
      <>
        <p>
          Oltaflock AI is an Ahmedabad-based team of AI engineers and automation specialists. We build AI
          agents and automated workflows that take repetitive work off your team: answering customers,
          following up on leads, entering data, chasing approvals and preparing reports.
        </p>
        <p>
          We work with growing businesses across Ahmedabad and Gujarat, from manufacturers and traders to D2C
          brands and service firms, and we are a member of NVIDIA Inception.
        </p>
      </>
    }
    serviceName="AI Automation in Ahmedabad"
    serviceType="AI automation and AI agent development"
    areaServed="Ahmedabad, Gujarat, India"
    afterHero={
      <div className="mt-12">
        <TrustBar />
      </div>
    }
    offerings={{
      heading: 'What we automate for Ahmedabad businesses',
      intro: 'Custom systems built around the tools and processes you already have.',
      items: [
        {
          title: 'WhatsApp automation',
          description:
            'AI chatbots, lead follow-up, order updates and broadcasts on the official WhatsApp Business API, synced to your CRM.',
        },
        {
          title: 'AI agents',
          description:
            'Agents that answer enquiries, qualify leads and handle routine tasks around the clock, escalating to your team when needed.',
        },
        {
          title: 'CRM and sales automation',
          description:
            'Every enquiry captured, scored and followed up automatically, with your pipeline kept up to date without manual entry.',
        },
        {
          title: 'Customer support automation',
          description:
            'Instant answers to repeat questions across WhatsApp, email and your website, with full context handed to your staff.',
        },
        {
          title: 'Operations and reporting',
          description:
            'Automated approvals, order processing, inventory alerts and daily reports pulled from Tally, sheets and your other systems.',
        },
        {
          title: 'System integrations',
          description:
            'Connect your ERP, CRM, store, sheets and accounting tools so data moves between them automatically.',
        },
      ],
    }}
    steps={{
      heading: 'How we work',
      items: [
        {
          title: 'Discovery and workflow mapping',
          description:
            'We sit with your team, in person or online, to map how work flows today and find the tasks that cost the most time.',
        },
        {
          title: 'Plan and quote',
          description:
            'You get a clear plan, a fixed quote and an ROI estimate. Many clients start with a single high-impact pilot.',
        },
        {
          title: 'Build and integrate',
          description:
            'We build the AI agents and workflows and connect them to your existing tools, with no disruption to daily work.',
        },
        {
          title: 'Launch, monitor and improve',
          description:
            'We test with real scenarios, go live, then monitor and keep improving the system as your business grows.',
        },
      ],
    }}
    reasons={{
      heading: 'Why work with a local AI automation partner',
      items: [
        {
          title: 'On-site discovery',
          description: 'We can visit your office in Ahmedabad to understand how your team really works.',
        },
        {
          title: 'Same time zone, same languages',
          description: 'We work in IST and build systems that understand English, Hindi and Gujarati.',
        },
        {
          title: 'GST-registered company',
          description: 'OLTAFLOCK AI LLP is registered in Gujarat and invoices in INR with GST.',
        },
        {
          title: 'Production-grade, not prototypes',
          description:
            'Secure, monitored systems that combine AI with reliable rule-based workflows, backed by ongoing support.',
        },
      ],
    }}
    faqs={faqs}
    related={[
      { to: '/whatsapp-automation', label: 'WhatsApp automation' },
      { to: '/automation-roi-calculator', label: 'Calculate what manual work costs you' },
      { to: '/faq', label: 'Read the full FAQ' },
    ]}
  />
);

export default Ahmedabad;
