import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/reveal';
import LeakCalculator from '@/components/calculator/LeakCalculator';

const SITE = 'https://oltaflock.ai';
const PAGE_URL = `${SITE}/automation-roi-calculator`;
const TITLE = 'Automation ROI Calculator | How Much Manual Work Costs You | Oltaflock AI';
const DESC =
  'Free automation ROI calculator. Find out how much your business spends every year on manual work an AI agent or workflow could do — lead follow-up, CRM data entry, support replies, reporting and more.';

const faqs = [
  {
    q: 'How does the automation ROI calculator work?',
    a: 'For each manual task you select, the calculator multiplies the hours spent per week by the number of people doing it, by 52 weeks, by your fully loaded hourly staff cost. It then counts only the automatable share of that cost — the percentage shown on each task — as the money you are leaking. Every assumption is visible and editable.',
  },
  {
    q: 'What counts as an automatable percentage?',
    a: 'It is the share of a task that automation removes outright, not the share it touches. Repetitive work such as CRM data entry and copy-pasting between tools is 90 percent automatable. Judgement-heavy work such as approvals and onboarding handoffs is 65 percent. The figures are deliberately conservative so the result holds up under scrutiny.',
  },
  {
    q: 'Is the automation ROI calculator free?',
    a: 'Yes. It is completely free, needs no signup, and the full result including the per-task breakdown is shown on the page. Booking a call with Oltaflock AI afterwards is optional.',
  },
];

const appLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${PAGE_URL}#app`,
  name: 'Automation ROI Calculator',
  url: PAGE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  description: DESC,
  inLanguage: 'en',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'Oltaflock AI', url: SITE },
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${PAGE_URL}#faq`,
  url: PAGE_URL,
  inLanguage: 'en',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const Calculator = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={PAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(appLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Head>

      <ScrollProgress />
      <Navbar />

      <main className="pt-28 sm:pt-32 pb-20">
        <section className="section-container">
          <Reveal className="max-w-3xl">
            <p className="klabel mb-4">Free tool</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              How much is manual work <span className="text-primary">leaking</span> from your business?
            </h1>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Most teams have no idea what repetitive work actually costs them. Pick the tasks
              your team does by hand, and see the annual bill — plus which of it automation
              can take off your plate.
            </p>
            <p className="mt-3 font-mono text-[13px] text-faint">
              No signup. Full result on the page. Takes about a minute.
            </p>
          </Reveal>
        </section>

        <section className="section-container mt-10 sm:mt-14">
          <LeakCalculator />
        </section>

        {/* On-page FAQ, mirrored by the FAQPage structured data above. */}
        <section className="section-container mt-16 sm:mt-20">
          <div className="max-w-3xl">
            <p className="klabel mb-4">About this calculator</p>
            <div className="border-t border-border">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-border py-6">
                  <h2 className="font-display font-semibold text-[17px] mb-2">{f.q}</h2>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
                <ArrowLeft size={15} />
                Back home
              </Link>
              <Link to="/faq" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
                Read the full FAQ
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Calculator;
