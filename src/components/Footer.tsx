import { motion } from 'framer-motion';
import { Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-10 items-center">
          {/* Logo & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
              <img src="/OFfavicon.png" alt="Oltaflock AI - Custom AI automation for businesses" className="h-12 w-12" loading="lazy" width="48" height="48" />
              <span className="font-display font-bold text-xl text-foreground">
                Oltaflock <span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              The AI Automation Partner for Every Business Need.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center gap-8"
          >
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Services
            </a>
            <a href="#process" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Process
            </a>
            <a href="#use-cases" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Use Cases
            </a>
            <a href="#send-message" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Contact
            </a>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center md:justify-end gap-4"
          >
            <a
              href="https://x.com/Oltaflock_AI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current text-muted-foreground" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@Oltaflock"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={18} className="text-muted-foreground" />
            </a>
            <a
              href="https://www.instagram.com/oltaflock.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} className="text-muted-foreground" />
            </a>
            <a
              href="https://www.linkedin.com/company/oltaflock-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} className="text-muted-foreground" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61585295918151"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} className="text-muted-foreground" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border text-center"
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Oltaflock AI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
