import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';
import { Hero } from '../components/hero';
import { MarqueeProvider } from '../components/marquees';

vi.mock('framer-motion', async () => {
  const React = await import('react');
  return {
    motion: { div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { initial?: unknown; animate?: unknown }>(function Div({ initial, animate, ...props }, ref) { void initial; void animate; return <div ref={ref} {...props} />; }) },
    useReducedMotion: () => false,
    useScroll: () => ({ scrollYProgress: 0 }),
    useTransform: () => 0,
  };
});

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('decorative motion', () => {
  it('renders the ribbon on a separate scroll transform layer', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener() {}, removeEventListener() {} }));
    const { container } = render(<MarqueeProvider><Hero /></MarqueeProvider>);
    expect(container.querySelector('.ribbon-offset > .ribbon')).not.toBeNull();
    expect(container.querySelector('h1')?.textContent).toBe('Sumeet');
  });
  it('keeps the hero available when WebGL is unavailable', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
    const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    const { container } = render(<MarqueeProvider><Hero /></MarqueeProvider>);
    await waitFor(() => expect(getContext).toHaveBeenCalled());
    expect(container.querySelector('.ribbon')).not.toBeNull();
    expect(container.querySelector('.three-motion-layer canvas')).toBeNull();
  });
});
