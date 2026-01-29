import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Bot, BadgeCheck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 animated-gradient-bg" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 70% 30%, hsl(239 84% 67% / 0.2) 0%, transparent 50%)',
        }}
      />
      
      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            width: Math.random() * 8 + 4 + 'px',
            height: Math.random() * 8 + 4 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6"
            >
              <Sparkles size={16} />
              <span className="text-sm font-medium">AI Automation Agency</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              Your business.{' '}
              <span className="gradient-text">Fully automated.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Custom AI workflows that eliminate manual work and unlock scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="#services" className="btn-primary flex items-center justify-center gap-2">
                <span>See What We Can Automate</span>
                <ArrowRight size={18} />
              </a>
              <a href="#book-call" className="btn-secondary flex items-center justify-center gap-2">
                Book Free Consultation
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Animated Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[500px]">
              {/* Central Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/20 blur-[100px]" />
              
              {/* Floating Cards */}
              <motion.div
                className="floating-card absolute top-10 left-10"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Bot className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">AI Agent</p>
                    <p className="text-xs text-muted-foreground">Processing...</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="floating-card absolute top-20 right-0"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Zap className="text-accent" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Automation</p>
                    <p className="text-xs text-muted-foreground">+340% efficiency</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="floating-card absolute bottom-20 left-5"
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-soft-cyan/20 flex items-center justify-center">
                    <BadgeCheck className="text-soft-cyan" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Lead Qualified</p>
                    <p className="text-xs text-muted-foreground">Scored + routed</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="floating-card absolute bottom-10 right-10"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-soft-cyan/20 flex items-center justify-center">
                    <Sparkles className="text-soft-cyan" size={16} />
                  </div>
                  <span className="text-sm font-medium text-foreground">24/7 Active</span>
                </div>
              </motion.div>

              {/* Center Visual - Workflow Diagram */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div 
                  className="w-48 h-48 rounded-full border-2 border-dashed border-primary/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-dashed border-accent/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center animate-pulse-glow">
                  <Sparkles className="text-primary" size={24} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
