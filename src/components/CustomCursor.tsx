import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// A two-part cursor: a crisp dot that tracks the pointer 1:1, and a ring that
// lags behind on a spring and reacts to context — it expands over links/buttons
// and pinches on click. Desktop (fine pointer) only; disabled for reduced motion.
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 26, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 320, damping: 26, mass: 0.55 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const interactive = 'a, button, [role="button"], input, textarea, select, label, summary, .cursor-pointer';
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      setHovering(Boolean(el?.closest?.(interactive)));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot — tracks the pointer exactly */}
      <motion.div
        aria-hidden
        style={{ left: x, top: y }}
        animate={{ scale: hovering ? 0 : down ? 0.6 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="pointer-events-none fixed z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-primary mix-blend-difference"
      />
      {/* Ring — springy follow, grows on interactive elements */}
      <motion.div
        aria-hidden
        style={{ left: ringX, top: ringY }}
        animate={{
          scale: hovering ? 1.6 : down ? 0.85 : 1,
          opacity: hovering ? 1 : 0.55,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        className="pointer-events-none fixed z-[100] -ml-4 -mt-4 h-8 w-8 rounded-full border border-primary"
      />
    </>
  );
};

export default CustomCursor;
