'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
const MotionContext = createContext({ paused: false, reduced: false, toggle: () => {} });
export function MarqueeProvider({ children }: {children: ReactNode}) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return <MotionContext.Provider value={{ paused: paused || reduced, reduced, toggle: () => setPaused(value => !value) }}><div className="site-motion" data-paused={paused || reduced}>{children}</div></MotionContext.Provider>;
}
export function Ticker() {
  const { paused, reduced, toggle } = useContext(MotionContext);
  return <div className="ticker"><div className="ticker-window" aria-hidden="true"><div className="ticker-track" data-paused={paused}>{Array.from({length: 4}, (_, i) => <span key={i}>Creative development ✳ Useful ideas ✳ Built with curiosity ✳</span>)}</div></div><button type="button" onClick={toggle} disabled={reduced} aria-pressed={paused} aria-label={reduced ? 'Animation disabled by system preference' : paused ? 'Play looping animations' : 'Pause looping animations'}>{reduced ? 'Motion off' : paused ? 'Play' : 'Pause'}</button></div>;
}
export function TypeBreak() {
  const { paused, reduced, toggle } = useContext(MotionContext);
  return <div className="type-break"><div className="type-break-window" aria-hidden="true"><div className="type-break-track" data-paused={paused}>{['MAKE SOMETHING ✳','STAY CURIOUS ✳','MAKE SOMETHING ✳','STAY CURIOUS ✳'].map((item, i) => <span key={i}>{item}</span>)}</div></div><button type="button" className="type-break-control" onClick={toggle} disabled={reduced} aria-pressed={paused} aria-label={reduced ? 'Animation disabled by system preference' : paused ? 'Play looping animations' : 'Pause looping animations'}>{reduced ? 'Motion off' : paused ? 'Play' : 'Pause'}</button></div>;
}

export function useLoopingMotion() { return useContext(MotionContext); }
