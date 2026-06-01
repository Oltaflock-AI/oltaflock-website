import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border py-14">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-10"
        >
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/OFfavicon.png" alt="Oltaflock AI" className="h-7 w-7" loading="lazy" width="28" height="28" />
              <span className="font-display font-bold text-[17px]">
                Oltaflock <span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              We build the AI systems that free your team from repetitive work.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {[
              { href: 'https://x.com/Oltaflock_AI', label: 'X (Twitter)', svg: <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-current" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
              { href: 'https://www.youtube.com/@Oltaflock', label: 'YouTube', icon: Youtube },
              { href: 'https://www.instagram.com/oltaflock.ai/', label: 'Instagram', icon: Instagram },
              { href: 'https://www.linkedin.com/company/oltaflock-ai', label: 'LinkedIn', icon: Linkedin },
              { href: 'https://www.facebook.com/profile.php?id=61585295918151', label: 'Facebook', icon: Facebook },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-border-strong transition-colors"
              >
                {s.icon ? <s.icon size={16} /> : s.svg}
              </a>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-faint text-[12.5px] font-mono">
            © {new Date().getFullYear()} OLTAFLOCK AI LLP · LLPIN ACV-6705 · GSTIN 24AAKFO1104B1Z1
          </p>
          <p className="text-faint text-[12.5px] font-mono">
            <a href="mailto:admin@oltaflock.ai" className="hover:text-foreground transition-colors">
              admin@oltaflock.ai
            </a>{' '}·{' '}
            <a
              href="https://wa.me/919589594181?text=Hello%20Oltaflock%20AI%2C%20I%27d%20like%20to%20know%20more."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              +91 95895 94181
            </a>{' '}· Ahmedabad, Gujarat{' '}·{' '}
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>{' '}·{' '}
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
