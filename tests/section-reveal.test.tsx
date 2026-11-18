import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { MarqueeProvider } from '../components/marquees';
import { SectionReveal } from '../components/section-reveal';

vi.mock('framer-motion', async () => {
  const React = await import('react');
  return {
    useInView: () => true,
    motion: { div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { initial?: unknown; animate?: { y?: unknown }; transition?: { duration?: number } }>(function Div({ initial, animate, transition, ...props }, ref) {
      void initial;
      return <div ref={ref} data-y={JSON.stringify(animate?.y)} data-duration={transition?.duration} {...props} />;
    }) },
  };
});

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it('stops the reveal immediately when reduced motion changes after mount', () => {
  let reduced = false;
  let listener: (() => void) | undefined;
  vi.stubGlobal('matchMedia', () => ({
    get matches() { return reduced; },
    addEventListener: (_event: string, callback: () => void) => { listener = callback; },
    removeEventListener: () => { listener = undefined; },
  }));
  render(<MarqueeProvider><SectionReveal className="reveal">Visible content</SectionReveal></MarqueeProvider>);
  const reveal = screen.getByText('Visible content');
  expect(reveal.getAttribute('data-y')).toBe('[14,0]');
  act(() => { reduced = true; listener?.(); });
  expect(reveal.getAttribute('data-y')).toBe('0');
  expect(reveal.getAttribute('data-duration')).toBe('0');
  expect(reveal.textContent).toBe('Visible content');
});
