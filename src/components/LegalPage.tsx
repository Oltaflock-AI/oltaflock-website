import { type ReactNode, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ScrollProgress from '@/components/ScrollProgress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type LegalPageProps = {
  title: string;
  updated: string;
  docTitle: string;
  children: ReactNode;
};

const LegalPage = ({ title, updated, docTitle, children }: LegalPageProps) => {
  useEffect(() => {
    const prev = document.title;
    document.title = docTitle;
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, [docTitle]);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />

      <main className="pt-28 sm:pt-32">
        <section className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={15} /> Back home
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">{title}</h1>
            <p className="mt-3 text-faint text-[13px] font-mono">Last updated · {updated}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="legal-prose mt-12 max-w-3xl pb-24"
          >
            {children}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
