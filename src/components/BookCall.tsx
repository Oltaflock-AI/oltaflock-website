import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ClientOnly } from 'vite-react-ssg';
import Cal, { getCalApi } from '@calcom/embed-react';

const CAL_NAMESPACE = 'oltaflock-ai-demo';
const CAL_LINK = 'khush0030/oltaflock-ai-demo';

const BookCall = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal('ui', {
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <section id="send-message" className="py-14 sm:py-20 scroll-mt-20 border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <p className="klabel mb-4">07 / Let's talk</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Book your <span className="text-primary">AI automation demo</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Pick a time that works for you. We'll map your workflow, surface automation opportunities,
            and outline a clear ROI in 30 minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="panel p-2 sm:p-3 overflow-hidden"
        >
          <ClientOnly fallback={<div style={{ width: '100%', height: '700px' }} />}>
            {() => (
              <Cal
                namespace={CAL_NAMESPACE}
                calLink={CAL_LINK}
                style={{ width: '100%', height: '700px', overflow: 'scroll' }}
                config={{ layout: 'month_view', theme: isDark ? 'dark' : 'light' }}
              />
            )}
          </ClientOnly>
        </motion.div>
      </div>
    </section>
  );
};

export default BookCall;
