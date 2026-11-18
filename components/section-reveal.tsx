'use client';

import { motion, useInView } from 'framer-motion';
import { useLoopingMotion } from './marquees';
import { useRef, type ReactNode } from 'react';

type SectionRevealProps = {
  children: ReactNode;
  className: string;
  delay?: number;
};

/** Content is visible before enhancement and stays visible with reduced motion. */
export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: .15 });
  const { reduced } = useLoopingMotion();

  return <motion.div
    ref={ref}
    className={className}
    initial={false}
    animate={visible && !reduced ? { y: [14, 0], opacity: [.85, 1] } : { y: 0, opacity: 1 }}
    transition={reduced ? { duration: 0 } : { duration: .55, delay, ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.div>;
}
