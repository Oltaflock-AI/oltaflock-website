import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps
  extends Omit<HTMLMotionProps<'div'>, 'onMouseMove' | 'onMouseLeave' | 'style' | 'children'> {
  children?: React.ReactNode;
  /** Max tilt in degrees on each axis. */
  max?: number;
}

/**
 * Card that tilts in 3D toward the cursor and shows a pointer-following glow.
 * Forwards framer props (initial/whileInView/…) so it can also carry the
 * section's entrance animation. Add `group` to className for the glow to react.
 */
const TiltCard = ({ children, className, max = 6, ...rest }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.4 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);
  const glow = useMotionTemplate`radial-gradient(240px circle at ${mx}% ${my}%, hsl(var(--primary) / 0.10), transparent 60%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx.set((0.5 - py) * max * 2);
    ry.set((px - 0.5) * max * 2);
    mx.set(px * 100);
    my.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn('relative', className)}
      {...rest}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      {children}
    </motion.div>
  );
};

export default TiltCard;
