import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

type DivProps = Omit<HTMLMotionProps<'div'>, 'children'> & { children?: ReactNode };

/** Fades + rises into view once, when scrolled into the viewport. */
export const Reveal = ({
  children,
  className,
  delay = 0,
  y = 24,
  ...rest
}: DivProps & { delay?: number; y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: EASE }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

/**
 * Container whose direct <StaggerItem> children reveal one after another as the
 * group scrolls into view. Reduced-motion is handled globally by MotionConfig.
 */
export const StaggerGroup = ({
  children,
  className,
  stagger = 0.09,
  ...rest
}: DivProps & { stagger?: number }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-60px' }}
    variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const StaggerItem = ({ children, className, ...rest }: DivProps) => (
  <motion.div variants={itemVariants} className={className} {...rest}>
    {children}
  </motion.div>
);
