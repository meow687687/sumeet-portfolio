'use client';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

export function AnimatedArt({ children }: {children: ReactNode}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const scale = useTransform(scrollYProgress, [0, 1], [.96, 1.04]);
  return <div className="project-art" ref={ref} aria-hidden="true"><motion.div className="art-motion" style={reduced ? undefined : { y, scale }}>{children}</motion.div></div>;
}
