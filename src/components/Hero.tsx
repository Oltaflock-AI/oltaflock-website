import { motion } from 'framer-motion';
import { ArrowRight, Store, Rocket, Building2 } from 'lucide-react';
import Magnetic from '@/components/ui/magnetic';

const SEGMENTS = [
  { id: 'small-business', label: "I'm a Small Business", icon: Store, tagline: 'Compete without the overhead' },
  { id: 'startups', label: "I'm a Startup", icon: Rocket, tagline: 'Scale fast from day one' },
  { id: 'enterprises', label: "I'm an Enterprise", icon: Building2, tagline: 'Complex workflows, integrated' },
];

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const Hero = () => {
  return (
    <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
      {/* Subtle modular grid, fading out — replaces the old particle/mesh noise */}
      <div
        className="absolute inset-0 grid-fade opacity-[0.6] dark:opacity-[0.4] pointer-events-none"
        style={{
          maskImage: 'radial-gradient(ellipse 95% 78% at 50% 0%, #000 18%, transparent 82%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 78% at 50% 0%, #000 18%, transparent 82%)',
        }}
      />

      <div className="section-container relative z-10 text-center">
        <motion.div custom={0} variants={fade} initial="hidden" animate="show" className="flex justify-center mb-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="klabel text-foreground/70">Custom AI Automation Agency</span>
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1.02] mx-auto max-w-[15ch]"
        >
          Your business.<br />
          <span className="text-primary">Fully automated.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-7 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Our <strong className="text-foreground font-semibold">AI agents</strong> resolve 80% of customer
          inquiries instantly. Business automation that reclaims <strong className="text-foreground font-semibold">10+ hours every week</strong> from day one.
        </motion.p>

        <motion.p
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-3 font-mono text-[13px] text-primary"
        >
          Custom AI systems · workflow automation · 24/7 · production-grade · no templates
        </motion.p>

        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Magnetic>
            <a href="#services" className="btn-primary group">
              See What We Can Automate
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#send-message" className="btn-ghost">Send a message</a>
          </Magnetic>
        </motion.div>

        {/* NVIDIA Inception — credibility line */}
        <motion.div
          custom={5}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-7 flex justify-center"
        >
          <span className="inline-flex items-center gap-2.5 text-[13px] text-muted-foreground">
            <span className="h-4 w-4 rounded-[3px] bg-nvidia inline-block" aria-hidden />
            Proud member of <span className="text-foreground font-medium">NVIDIA&nbsp;Inception</span>
          </span>
        </motion.div>

        {/* Audience segments — modular bordered strip */}
        <motion.div
          custom={6}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-14 grid sm:grid-cols-3 border border-border rounded-xl overflow-hidden max-w-3xl mx-auto bg-card"
        >
          {SEGMENTS.map((seg) => (
            <a
              key={seg.id}
              href={`#${seg.id}`}
              className="group flex items-center gap-3 p-4 text-left border-b sm:border-b-0 sm:border-r border-border last:border-0 hover:bg-secondary/60 transition-colors"
            >
              <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <seg.icon className="text-primary" size={18} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">{seg.label}</span>
                <span className="block text-xs text-muted-foreground">{seg.tagline}</span>
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
