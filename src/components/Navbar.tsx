import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Magnetic from '@/components/ui/magnetic';

const navLinks = [
  { name: 'Services', href: '/#services' },
  { name: 'Process', href: '/#process' },
  { name: 'Why Us', href: '/#why-us' },
  { name: 'Studio', href: '/#studio' },
  { name: 'Work', href: '/studio-work', route: true },
  { name: 'FAQ', href: '/#faq' },
];

const calComLink = import.meta.env.VITE_CALCOM_LINK ?? '';
const bookCallHref = calComLink ? `https://cal.com/${calComLink}` : '#send-message';
const bookCallTarget = calComLink ? '_blank' : '_self';
const bookCallRel = calComLink ? 'noopener noreferrer' : undefined;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/OFfavicon.png"
              alt="Oltaflock AI"
              className="h-7 w-7"
              width={28}
              height={28}
            />
            <span className="font-display font-bold text-[17px] tracking-tight text-foreground">
              Oltaflock <span className="text-primary">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) =>
              link.route ? (
                <Link key={link.name} to={link.href} className="nav-link">
                  {link.name}
                </Link>
              ) : (
                <a key={link.name} href={link.href} className="nav-link">
                  {link.name}
                </a>
              )
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Magnetic>
              <a href={bookCallHref} target={bookCallTarget} rel={bookCallRel} className="btn-primary">
                Book a Call
              </a>
            </Magnetic>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="section-container py-5 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.route ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-foreground py-2.5 text-base font-medium border-b border-border last:border-0"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-foreground py-2.5 text-base font-medium border-b border-border last:border-0"
                  >
                    {link.name}
                  </a>
                )
              )}
              <a href={bookCallHref} target={bookCallTarget} rel={bookCallRel} className="btn-primary mt-3">
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
