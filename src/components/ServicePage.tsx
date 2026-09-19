import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { ArrowRight, Check } from 'lucide-react';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/reveal';

const SITE = 'https://www.oltaflock.ai';
const WHATSAPP_HREF =
  'https://wa.me/919589594181?text=Hello%20Oltaflock%20AI%2C%20I%27d%20like%20to%20know%20more.';

type Item = { title: string; description: string };
type Faq = { q: string; a: string };

type ServicePageProps = {
  path: string;
  title: string;
  description: string;
  label: string;
  heading: ReactNode;
  intro: ReactNode;
  // Plain-text service name and type, used in the Service structured data.
  serviceName: string;
  serviceType: string;
  areaServed: string;
  offerings: { heading: string; intro: string; items: Item[] };
  steps: { heading: string; items: Item[] };
  reasons: { heading: string; items: Item[] };
  faqs: Faq[];
  related: { to: string; label: string }[];
  afterHero?: ReactNode;
};

// Shared layout for keyword-targeted service and location landing pages. Every
// page gets a Service, BreadcrumbList and FAQPage block in its prerendered HTML.
const ServicePage = ({
  path,
  title,
  description,
  label,
  heading,
  intro,
  serviceName,
  serviceType,
  areaServed,
  offerings,
  steps,
  reasons,
  faqs,
  related,
  afterHero,
}: ServicePageProps) => {
  const pageUrl = `${SITE}${path}`;

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: serviceName,
    serviceType,
    url: pageUrl,
    description,
    areaServed,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Oltaflock AI',
      url: SITE,
      email: 'admin@oltaflock.ai',
      telephone: '+91-95895-94181',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: serviceName, item: pageUrl },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    url: pageUrl,
    inLanguage: 'en',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Head>

      <ScrollProgress />
      <Navbar />

      <main className="pt-28 sm:pt-32 pb-20">
        {/* Hero */}
        <section className="section-container">
          <Reveal className="max-w-3xl">
            <p className="klabel mb-4">{label}</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              {heading}
            </h1>
            <div className="mt-5 space-y-4 text-muted-foreground text-lg leading-relaxed">{intro}</div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="/#send-message" className="btn-primary group inline-flex items-center gap-2">
                Book a free call
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Message us on WhatsApp
              </a>
            </div>
          </Reveal>
        </section>

        {afterHero}

        {/* Offerings */}
        <section className="section-container mt-16 sm:mt-24">
          <Reveal className="max-w-2xl mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{offerings.heading}</h2>
            <p className="mt-3 text-muted-foreground text-lg">{offerings.intro}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border rounded-xl overflow-hidden bg-card">
            {offerings.items.map((item) => (
              <div key={item.title} className="p-6 border-b border-r border-border">
                <h3 className="font-display font-semibold text-[17px] mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="section-container mt-16 sm:mt-24">
          <Reveal className="max-w-2xl mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{steps.heading}</h2>
          </Reveal>
          <ol className="max-w-3xl border-t border-border">
            {steps.items.map((step, index) => (
              <li key={step.title} className="flex gap-5 border-b border-border py-6">
                <span className="font-mono text-[13px] text-primary pt-1">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display font-semibold text-[17px] mb-1.5">{step.title}</h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Reasons */}
        <section className="section-container mt-16 sm:mt-24">
          <Reveal className="max-w-2xl mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">{reasons.heading}</h2>
          </Reveal>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-6 max-w-4xl">
            {reasons.items.map((reason) => (
              <li key={reason.title} className="flex gap-3">
                <Check size={18} className="mt-1 shrink-0 text-primary" aria-hidden />
                <div>
                  <h3 className="font-display font-semibold text-[16px] mb-1">{reason.title}</h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">{reason.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* On-page FAQ, mirrored by the FAQPage structured data above. */}
        <section className="section-container mt-16 sm:mt-24">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">Frequently asked questions</h2>
            <div className="border-t border-border">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-border py-6">
                  <h3 className="font-display font-semibold text-[17px] mb-2">{f.q}</h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-container mt-16 sm:mt-20">
          <div className="panel flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="max-w-xl">
              <p className="klabel mb-2">Free discovery call</p>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">See what you can automate.</h2>
              <p className="mt-2 text-muted-foreground">
                Tell us how your team works today. We map the workflow and send a tailored plan with an ROI
                estimate.
              </p>
            </div>
            <a href="/#send-message" className="btn-primary group inline-flex shrink-0 items-center gap-2">
              Book a call
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {related.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {link.label}
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;
