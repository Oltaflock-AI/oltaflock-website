import { useState } from 'react';
import { motion } from 'framer-motion';

const NvidiaInception = () => {
  const [hasLogo, setHasLogo] = useState(true);

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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="panel p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5"
        >
          {/* Official NVIDIA Inception Program badge — always on a white plate so it reads in both themes */}
          <div className="shrink-0 rounded-lg bg-white border border-border px-6 py-4 flex items-center justify-center min-w-[180px] min-h-[72px]">
            {hasLogo ? (
              <img
                src="/nvidia-inception.png"
                alt="NVIDIA Inception Program member"
                className="h-14 w-auto"
                onError={() => setHasLogo(false)}
              />
            ) : (
              <span className="text-center leading-tight">
                <span className="block font-display font-extrabold text-lg text-black tracking-tight">NVIDIA</span>
                <span className="block text-[10px] tracking-[0.2em] text-black/70 uppercase">Inception Program</span>
              </span>
            )}
          </div>

          <div className="sm:flex-1 sm:border-l sm:border-border sm:pl-5">
            <p className="text-muted-foreground text-sm">
              A member of NVIDIA's program for cutting-edge AI startups — giving us advanced compute,
              tooling, and infrastructure that we build directly into the systems we ship for you.
            </p>
          </div>

          <a href="#send-message" className="btn-ghost shrink-0">Work with us</a>
        </motion.div>
      </div>
    </section>
  );
};

export default NvidiaInception;
