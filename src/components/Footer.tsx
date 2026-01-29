import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import logo from '@/assets/oltaflock-logo.png';

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
              <img src={logo} alt="Oltaflock AI" className="h-10 w-auto" />
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
            <a href="#book-call" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
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
              href="mailto:hello@oltaflock.ai" 
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Mail size={18} className="text-muted-foreground" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Twitter size={18} className="text-muted-foreground" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Linkedin size={18} className="text-muted-foreground" />
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
