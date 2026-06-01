import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { Plus, ArrowRight, ArrowLeft } from 'lucide-react';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ui/reveal';
import { faqCategories, allFaqs } from '@/data/faqData';

const SITE = 'https://oltaflock.ai';
const PAGE_URL = `${SITE}/faq`;
const TITLE = 'FAQ — Oltaflock AI | AI Automation & AI Agent Development (India)';
const DESC =
  'Answers about Oltaflock AI, a custom AI automation and AI agent development company in Ahmedabad, India — services, pricing, timelines, AI workflows, and orchestration.';

// FAQPage structured data — emitted into the prerendered HTML for rich results.
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${PAGE_URL}#faq`,
  url: PAGE_URL,
  name: 'Oltaflock AI — Frequently Asked Questions',
  inLanguage: 'en',
  mainEntity: allFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={PAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Head>

      <ScrollProgress />
      <Navbar />

      <main className="pt-28 sm:pt-32">
        {/* Header */}
        <section className="section-container">
          <Reveal className="max-w-3xl">
            <p className="klabel mb-4">FAQ</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Frequently asked <span className="text-primary">questions.</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Everything about Oltaflock AI — a custom AI automation and AI agent development company based
              in Ahmedabad, India. Can&apos;t find your answer?{' '}
              <a href="/#send-message" className="text-foreground underline underline-offset-2 hover:text-primary">
                Get in touch
              </a>
              .
            </p>
          </Reveal>

          {/* Category jump links */}
          <Reveal delay={0.05} className="mt-8 flex flex-wrap gap-2">
            {faqCategories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="inline-flex h-9 items-center rounded-full border border-border-strong px-4 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {c.title}
              </a>
            ))}
          </Reveal>
        </section>

        {/* Categories */}
        <div className="section-container mt-12 space-y-14 sm:mt-16">
          {faqCategories.map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-24">
              <Reveal className="mb-5">
                <h2 className="font-display text-2xl font-bold sm:text-3xl">{cat.title}</h2>
                <p className="mt-2 text-muted-foreground">{cat.intro}</p>
              </Reveal>

              <Reveal delay={0.05} className="panel divide-y divide-border">
                {cat.items.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
                      <h3 className="font-display text-[16px] font-semibold text-foreground sm:text-[16.5px]">
                        {item.q}
                      </h3>
                      <Plus
                        size={18}
                        className="shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                        aria-hidden
                      />
                    </summary>
                    <div className="px-5 pb-5 text-[14.5px] leading-relaxed text-muted-foreground sm:px-6">
                      {item.a}
                    </div>
                  </details>
                ))}
              </Reveal>
            </section>
          ))}
        </div>

        {/* CTA */}
        <section className="section-container mt-16 sm:mt-20">
          <div className="panel flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="max-w-xl">
              <p className="klabel mb-2">Still have questions?</p>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Let&apos;s talk about your AI project.
              </h2>
              <p className="mt-2 text-muted-foreground">
                Book a free discovery call and get a tailored automation assessment and ROI projection.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link to="/" className="btn-ghost inline-flex items-center gap-2">
                <ArrowLeft size={16} /> Home
              </Link>
              <a href="/#send-message" className="btn-primary group inline-flex items-center gap-2">
                Book a call
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
