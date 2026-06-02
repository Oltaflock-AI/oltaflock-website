import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HoverVideo from '@/components/HoverVideo';
import StudioGallery from '@/components/StudioGallery';
import CountUp from '@/components/ui/count-up';
import { Reveal } from '@/components/ui/reveal';
import { studioVideos } from '@/data/studioWork';

const filters = ['All', 'Automotive', 'Product travel', 'Live-action', 'Stylized', 'Product'] as const;

const WORK_TITLE = 'Our Work — Oltaflock Studio | AI Video & Image Generation';
const WORK_DESC =
  'Showreel of production-ready AI video and image generation by Oltaflock Studio — product films, ads, brand lifestyle, and stylized scenes, generated in-house.';
const WORK_URL = 'https://oltaflock.ai/studio-work';

const studioStats = [
  { value: studioVideos.length, suffix: '', label: 'AI-generated clips' },
  { value: new Set(studioVideos.map((v) => v.tag)).size, suffix: '', label: 'creative categories' },
  { value: 100, suffix: '%', label: 'generated in-house' },
  { value: 24, suffix: '/7', label: 'production pipeline' },
];

const Work = () => {
  const [active, setActive] = useState<(typeof filters)[number]>('All');

  const visible = useMemo(
    () => (active === 'All' ? studioVideos : studioVideos.filter((v) => v.tag === active)),
    [active]
  );

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{WORK_TITLE}</title>
        <meta name="description" content={WORK_DESC} />
        <link rel="canonical" href={WORK_URL} />
        <meta property="og:title" content={WORK_TITLE} />
        <meta property="og:description" content={WORK_DESC} />
        <meta property="og:url" content={WORK_URL} />
      </Head>
      <ScrollProgress />
      <Navbar />

      <main className="pt-28 sm:pt-32">
        {/* Header */}
        <section className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <p className="klabel mb-4">Oltaflock Studio · Showreel</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Our <span className="text-primary">work.</span>
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">
              Production-ready AI video and image generation — product films, ads, brand lifestyle, and
              stylized scenes. Every frame generated and finished in-house at Oltaflock Studio.
            </p>
          </motion.div>

          {/* Filter chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`rounded-full border px-4 h-9 text-sm font-medium transition-all duration-200 ${
                  active === f
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border-strong text-muted-foreground hover:text-foreground hover:border-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Stats — count up as they scroll into view */}
        <section className="section-container mt-10">
          <Reveal className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-border rounded-xl overflow-hidden bg-card">
            {studioStats.map((s) => (
              <div key={s.label} className="p-6 sm:p-7 border-b border-r border-border">
                <div className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight tabular-nums">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-1.5 text-[13.5px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* Video gallery — tiles reveal as you scroll down the grid */}
        <section className="section-container mt-10">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((v, i) => (
              <motion.div
                key={v.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <HoverVideo {...v} className="aspect-video" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Image portfolio — brand stills */}
        <section className="section-container mt-16 sm:mt-20">
          <Reveal className="mb-8 max-w-2xl">
            <p className="klabel mb-3">Stills</p>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Brand campaign imagery</h2>
            <p className="mt-3 text-muted-foreground">
              Generative product and lifestyle stills crafted for brands — every frame produced in-house at
              Oltaflock Studio. Tap any image to view it full screen.
            </p>
          </Reveal>
          <StudioGallery />
        </section>

        {/* CTA */}
        <section className="section-container mt-16 sm:mt-20">
          <div className="panel p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="max-w-xl">
              <p className="klabel mb-2">Let&apos;s talk</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Want creative like this for your brand?
              </h2>
              <p className="mt-2 text-muted-foreground">
                We build generative video and image pipelines straight into your marketing workflow.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/" className="btn-ghost inline-flex items-center gap-2">
                <ArrowLeft size={16} /> Home
              </Link>
              <a href="/#send-message" className="btn-primary group inline-flex items-center gap-2">
                Work with us
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

export default Work;
