import { useState } from 'react';
import { motion } from 'framer-motion';

type Program = {
  id: string;
  logo: string;
  alt: string;
  logoClass: string;
  fallbackTitle: string;
  fallbackSubtitle: string;
  description: string;
};

const programs: Program[] = [
  {
    id: 'nvidia',
    logo: '/nvidia-inception.png',
    alt: 'NVIDIA Inception Program member',
    logoClass: 'max-h-14 max-w-full w-auto object-contain',
    fallbackTitle: 'NVIDIA',
    fallbackSubtitle: 'Inception Program',
    description:
      "A member of NVIDIA's program for cutting-edge AI startups, giving us advanced compute, tooling, and infrastructure that we build directly into the systems we ship for you.",
  },
  {
    id: 'sarvam',
    logo: '/sarvam.svg',
    alt: 'Sarvam AI Startup Program member',
    logoClass: 'max-h-8 max-w-full w-auto object-contain',
    fallbackTitle: 'SARVAM',
    fallbackSubtitle: 'Startup Program',
    description:
      "A member of Sarvam's startup program, giving us early access to India's sovereign AI models for speech, language, and voice, so the systems we build work natively across Indian languages.",
  },
];

const ProgramCard = ({ program }: { program: Program }) => {
  const [hasLogo, setHasLogo] = useState(true);

  return (
    <div className="panel h-full p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5">
      {/* Official program badge — always on a white plate so it reads in both themes */}
      <div className="shrink-0 rounded-lg bg-white border border-border px-5 flex items-center justify-center w-full sm:w-[240px] h-[88px]">
        {hasLogo ? (
          <img
            src={program.logo}
            alt={program.alt}
            className={program.logoClass}
            onError={() => setHasLogo(false)}
          />
        ) : (
          <span className="text-center leading-tight">
            <span className="block font-display font-extrabold text-lg text-black tracking-tight">
              {program.fallbackTitle}
            </span>
            <span className="block text-[10px] tracking-[0.2em] text-black/70 uppercase">
              {program.fallbackSubtitle}
            </span>
          </span>
        )}
      </div>

      <div className="sm:flex-1 sm:border-l sm:border-border sm:pl-5">
        <p className="text-muted-foreground text-sm">{program.description}</p>
      </div>
    </div>
  );
};

const NvidiaInception = () => {
  return (
    <section id="nvidia" className="py-12 sm:py-14 scroll-mt-20 border-t border-border">
      <div className="section-container">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
          style={{ color: 'hsl(var(--nvidia))' }}
        >
          Backed by
        </motion.h1>

        <div className="grid gap-4 lg:grid-cols-2">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.05 + index * 0.05 }}
              className="h-full"
            >
              <ProgramCard program={program} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6"
        >
          <a href="#send-message" className="btn-ghost">Work with us</a>
        </motion.div>
      </div>
    </section>
  );
};

export default NvidiaInception;
