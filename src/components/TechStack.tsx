import { motion } from 'framer-motion';

// Each tool carries its real brand hue so the marquee reads as a living tech stack, not grey chips.
type Tool = { label: string; color: string };

const row1: Tool[] = [
  { label: 'Claude', color: '#D97757' },
  { label: 'OpenAI / GPT', color: '#10A37F' },
  { label: 'LangChain', color: '#1C3C3C' },
  { label: 'Python', color: '#3776AB' },
  { label: 'TypeScript', color: '#3178C6' },
  { label: 'React', color: '#61DAFB' },
  { label: 'Next.js', color: '#888888' },
  { label: 'Node.js', color: '#5FA04E' },
  { label: 'PostgreSQL', color: '#4169E1' },
  { label: 'Supabase', color: '#3ECF8E' },
];
const row2: Tool[] = [
  { label: 'n8n', color: '#EA4B71' },
  { label: 'Pinecone', color: '#3B82F6' },
  { label: 'Playwright', color: '#2EAD33' },
  { label: 'Twilio', color: '#F22F46' },
  { label: 'WhatsApp API', color: '#25D366' },
  { label: 'Telegram', color: '#26A5E4' },
  { label: 'Sarvam AI', color: '#FF6B35' },
  { label: 'Docker', color: '#2496ED' },
  { label: 'AWS', color: '#FF9900' },
  { label: 'NVIDIA', color: '#76B900' },
  { label: 'GitHub', color: '#8B8B8B' },
  { label: 'Vercel', color: '#888888' },
];

const Pill = ({ tool }: { tool: Tool }) => (
  <div
    className="group relative flex items-center gap-2.5 mx-1.5 px-5 h-12 rounded-full border border-border bg-card shrink-0 transition-all duration-300 hover:border-border-strong hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-14px_hsl(var(--foreground)/0.25)]"
    style={{ ['--dot' as string]: tool.color }}
  >
    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-40 blur-[2px] transition-opacity duration-300 group-hover:opacity-90"
        style={{ background: 'var(--dot)' }}
      />
      <span
        className="relative inline-flex h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:h-2 group-hover:w-2"
        style={{ background: 'var(--dot)' }}
      />
    </span>
    <span className="text-sm font-medium whitespace-nowrap text-foreground/85 group-hover:text-foreground transition-colors">
      {tool.label}
    </span>
  </div>
);

const Row = ({ items, reverse, duration }: { items: Tool[]; reverse?: boolean; duration: string }) => {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-group marquee-mask">
      <div
        className={`marquee-track ${reverse ? 'reverse' : ''}`}
        style={{ ['--marquee-duration' as string]: duration }}
      >
        {doubled.map((t, i) => (
          <Pill key={`${t.label}-${i}`} tool={t} />
        ))}
      </div>
    </div>
  );
};

const TechStack = () => {
  return (
    <section id="stack" className="py-14 sm:py-20 scroll-mt-20 border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <p className="klabel mb-4">Tech Stack</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Built on a modern <span className="text-primary">AI stack</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            We assemble best-in-class models, frameworks, and infrastructure into systems engineered for
            your workflow — no lock-in, no off-the-shelf templates.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3">
        <Row items={row1} duration="46s" />
        <Row items={row2} reverse duration="52s" />
      </div>
    </section>
  );
};

export default TechStack;
