import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, ArrowRight } from 'lucide-react';

const BookCall = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="book-call" className="py-24 relative">
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, hsl(234 89% 60% / 0.15) 0%, transparent 60%)',
      }} />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Let's Build Your{' '}
              <span className="gradient-text">AI Automation System</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to eliminate repetitive work and unlock growth? Book a free strategy call 
              and let's design your custom automation roadmap.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Calendar Placeholder */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      Book a Strategy Call
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      30 min • Free consultation
                    </p>
                  </div>
                </div>

                <div className="glass-card p-6 space-y-4">
                  <p className="text-foreground font-medium">What you'll get:</p>
                  <ul className="space-y-3">
                    {[
                      'Personalized automation assessment',
                      'Custom strategy recommendations',
                      'ROI projection for your business',
                      'Clear next steps roadmap',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <ArrowRight size={16} className="text-primary" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="Acme Inc."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="john@acme.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    What do you want to automate?
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder="Tell us about your automation needs..."
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <span>Book Free Strategy Call</span>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookCall;
