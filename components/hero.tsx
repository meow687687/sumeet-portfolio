'use client';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ActionLink } from './action-link';
import { ParticleScene } from './particle-scene';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -35]);
  return <div className="wrap hero" ref={ref}>
    <motion.div className="ribbon-offset" style={reduced ? undefined : { y }} aria-hidden="true"><svg className="ribbon" viewBox="0 0 1200 300" preserveAspectRatio="none"><path d="M-20 210 C190 50 410 310 630 170 S1020 40 1220 150" fill="none" stroke="#000" strokeWidth="86" strokeLinecap="round"/><path d="M-20 210 C190 50 410 310 630 170 S1020 40 1220 150" fill="none" stroke="#4da2ff" strokeWidth="80" strokeLinecap="round"/></svg></motion.div>
    <ParticleScene />
    <div className="hero-copy"><span className="tag">Portfolio · Sumeet Basfore</span><h1>Sumeet</h1><p className="tagline">Curious ideas, made useful.</p><ActionLink href="#projects">Explore projects</ActionLink></div>
    <div className="sticker-cluster" aria-hidden="true"><div className="coin"><span>S</span></div><svg className="star" viewBox="0 0 100 100"><path d="M50 3 60 33 91 20 74 47 98 65 67 65 62 96 48 69 22 87 30 57 2 45 34 42 33 11z" fill="#55db9c" stroke="#000" strokeWidth="1.5"/></svg></div>
  </div>;
}
