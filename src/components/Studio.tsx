import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clapperboard, Image as ImageIcon, Megaphone, Crop, ArrowRight } from 'lucide-react';
import HoverVideo from '@/components/HoverVideo';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/reveal';
import { featuredVideos } from '@/data/studioWork';

const capabilities = [
  { icon: Clapperboard, label: 'AI Video Generation' },
  { icon: ImageIcon, label: 'Image Generation' },
  { icon: Megaphone, label: 'Ad & Campaign Creative' },
  { icon: Crop, label: 'Reframe & Repurpose' },
];

const Studio = () => {
  return (
    <section id="studio" className="py-14 sm:py-20 scroll-mt-20 border-t border-border">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <p className="klabel mb-4">05 / Oltaflock Studio</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Generative video &amp; image, <span className="text-primary">on brand.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            The creative arm of Oltaflock. Production-ready AI video and image generation for product films,
            ads, and campaign visuals — built into the same automation pipelines that run the rest of your business.
          </p>
        </motion.div>

        {/* Capability strip — staggers in as you scroll */}
        <StaggerGroup className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-border rounded-xl overflow-hidden bg-card mb-6">
          {capabilities.map((c) => (
            <StaggerItem
              key={c.label}
              className="group flex items-center gap-3 p-4 border-b border-r border-border hover:bg-secondary/50 transition-colors"
            >
              <c.icon
                className="text-primary shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                size={18}
              />
              <span className="text-sm font-medium">{c.label}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Showcase reel — featured clip autoplays in view, the rest play on hover */}
        <StaggerGroup stagger={0.12} className="grid lg:grid-cols-3 gap-4">
          <StaggerItem className="lg:col-span-2">
            <HoverVideo {...featuredVideos[0]} featured className="aspect-video" />
          </StaggerItem>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <StaggerItem>
              <HoverVideo {...featuredVideos[1]} className="aspect-video" />
            </StaggerItem>
            <StaggerItem>
              <HoverVideo {...featuredVideos[2]} className="aspect-video" />
            </StaggerItem>
          </div>
        </StaggerGroup>

        <div className="mt-8 flex justify-center sm:justify-start">
          <Link to="/studio-work" className="btn-primary group inline-flex items-center gap-2">
            View all our work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Studio;
