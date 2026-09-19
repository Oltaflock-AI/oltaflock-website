import ServicePage from '@/components/ServicePage';

const faqs = [
  {
    q: 'What is WhatsApp automation?',
    a: 'WhatsApp automation means using software to send, receive and act on WhatsApp messages without a person typing each reply. It covers AI chatbots that answer customer questions, automatic order and appointment updates, lead capture and follow-up, and syncing every conversation into your CRM. Oltaflock AI builds these systems on the official WhatsApp Business Platform.',
  },
  {
    q: 'Will my WhatsApp number get banned if I automate it?',
    a: 'Not when it is done properly. We build only on the official WhatsApp Business Platform (Cloud API) from Meta, not on unofficial tools that scrape WhatsApp Web, which are what usually get numbers banned. We also set up opt-in collection and approved message templates so your number keeps a healthy quality rating.',
  },
  {
    q: 'What is the difference between the WhatsApp Business app and the WhatsApp Business API?',
    a: 'The WhatsApp Business app is a phone app for one or a few people to reply manually. The WhatsApp Business API (WhatsApp Business Platform) connects WhatsApp to software, so you can run AI chatbots, send automated notifications, use a shared team inbox and integrate with your CRM, store or ERP. Automation at scale needs the API.',
  },
  {
    q: 'How much does WhatsApp automation cost in India?',
    a: 'There are two parts. Meta charges for certain business-initiated template messages based on the message category (marketing, utility or authentication) and the recipient country, and customer-initiated service conversations are largely free. Then there is the one-time cost to design and build your automation, which depends on scope. After a free discovery call we send a fixed quote and an ROI estimate.',
  },
  {
    q: 'Can the WhatsApp chatbot reply in Hindi or Gujarati?',
    a: 'Yes. The AI agents we build understand and reply in English, Hindi, Gujarati and other Indian languages, including mixed Hinglish messages. The bot answers from your own product, pricing and policy information and hands the chat to a human when it should.',
  },
  {
    q: 'Can WhatsApp automation connect to Shopify, Zoho, HubSpot or Google Sheets?',
    a: 'Yes. We connect WhatsApp to the tools you already use, including Shopify, WooCommerce, Zoho CRM, HubSpot, Google Sheets, payment gateways and custom databases, so orders, leads and conversations sync automatically in both directions.',
  },
  {
    q: 'How long does it take to set up WhatsApp automation?',
    a: 'Business verification and number setup with Meta usually takes a few days. A focused automation such as an AI support bot or order-update flow is typically live within 4 to 8 weeks, including testing. We give you a clear timeline after the discovery call.',
  },
];

const WhatsAppAutomation = () => (
  <ServicePage
    path="/whatsapp-automation"
    title="WhatsApp Automation Services in India | Oltaflock AI"
    description="WhatsApp automation for Indian businesses: AI chatbots, lead follow-up, order updates and CRM sync on the official WhatsApp Business API. Book a free call."
    label="WhatsApp Automation"
    heading={
      <>
        WhatsApp automation for <span className="text-primary">Indian businesses.</span>
      </>
    }
    intro={
      <>
        <p>
          Your customers already message you on WhatsApp. Oltaflock AI turns that inbox into a system that
          answers questions instantly, follows up on every lead, sends order and appointment updates, and
          logs every conversation in your CRM without anyone copy-pasting.
        </p>
        <p>
          We build on the official WhatsApp Business Platform from Meta, so your number stays safe and your
          automation scales from ten chats a day to thousands.
        </p>
      </>
    }
    serviceName="WhatsApp Automation"
    serviceType="WhatsApp Business API automation and AI chatbot development"
    areaServed="India"
    offerings={{
      heading: 'What we automate on WhatsApp',
      intro: 'Every build is custom to how your business actually sells and supports customers.',
      items: [
        {
          title: 'AI WhatsApp chatbot',
          description:
            'Answers product, pricing, stock and policy questions around the clock from your own data, and hands off to your team when a human is needed.',
        },
        {
          title: 'Lead capture and follow-up',
          description:
            'Qualifies leads from click-to-WhatsApp ads, your website and QR codes, then follows up automatically so no enquiry goes cold.',
        },
        {
          title: 'Order and delivery updates',
          description:
            'Order confirmations, COD verification, shipping and delivery alerts sent automatically from Shopify, WooCommerce or your own system.',
        },
        {
          title: 'Abandoned cart recovery',
          description:
            'Timely, personalised WhatsApp reminders for shoppers who left items in their cart, with a direct link back to checkout.',
        },
        {
          title: 'Appointment booking and reminders',
          description:
            'Customers book, reschedule and get reminders on WhatsApp, which cuts no-shows for clinics, salons, coaching and service businesses.',
        },
        {
          title: 'Broadcasts and CRM sync',
          description:
            'Segmented campaigns to opted-in customers, with every chat, lead and order synced to Zoho, HubSpot, Google Sheets or your CRM.',
        },
      ],
    }}
    steps={{
      heading: 'How we set it up',
      items: [
        {
          title: 'Discovery and workflow mapping',
          description:
            'We look at the questions you get, how leads and orders flow today, and where your team loses time, then pick the automations with the best return.',
        },
        {
          title: 'WhatsApp Business Platform setup',
          description:
            'We handle Meta business verification, your WhatsApp number, display name and message template approvals on the official Cloud API.',
        },
        {
          title: 'Build the flows and AI agent',
          description:
            'We build the conversation flows, train the AI on your catalogue and policies, and connect WhatsApp to your store, CRM and internal tools.',
        },
        {
          title: 'Test, launch and improve',
          description:
            'We test every path with real scenarios, go live, then monitor conversations and keep improving answers and conversion rates.',
        },
      ],
    }}
    reasons={{
      heading: 'Why businesses choose Oltaflock AI',
      items: [
        {
          title: 'Official API only',
          description: 'No grey-market tools or WhatsApp Web hacks that put your business number at risk.',
        },
        {
          title: 'AI plus reliable workflows',
          description:
            'AI handles open-ended questions while fixed rules handle payments, orders and data, so nothing important is left to guesswork.',
        },
        {
          title: 'Built around your stack',
          description: 'We integrate with the store, CRM and sheets you already use instead of forcing a new platform.',
        },
        {
          title: 'Local team, Indian languages',
          description:
            'A team in Ahmedabad that works in IST and builds bots that handle English, Hindi, Gujarati and Hinglish.',
        },
      ],
    }}
    faqs={faqs}
    related={[
      { to: '/automation-roi-calculator', label: 'Calculate what manual work costs you' },
      { to: '/ai-automation-company-ahmedabad', label: 'AI automation in Ahmedabad' },
      { to: '/faq', label: 'Read the full FAQ' },
    ]}
  />
);

export default WhatsAppAutomation;
