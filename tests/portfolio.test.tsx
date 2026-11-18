import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MarqueeProvider, Ticker, TypeBreak } from '../components/marquees';
import { Navigation } from '../components/navigation';
import { projects } from '../lib/projects';

let prefersReduced = false;
let listener: (() => void) | undefined;
beforeEach(() => {
  prefersReduced = false;
  listener = undefined;
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    get matches() { return prefersReduced; },
    addEventListener: (_event: string, callback: () => void) => { listener = callback; },
    removeEventListener: () => { listener = undefined; },
  })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('portfolio content', () => {
  it('contains four unique, valid project links', () => {
    expect(projects).toHaveLength(4);
    expect(new Set(projects.map(project => project.id)).size).toBe(4);
    for (const project of projects) expect(new URL(project.href).hostname).toBe('github.com');
  });
});

describe('navigation', () => {
  it('opens the menu and closes on a link or Escape', () => {
    const { container } = render(<Navigation />);
    const details = container.querySelector('details')!;
    details.open = true;
    fireEvent.click(screen.getAllByRole('link', { name: /projects/i })[1]);
    expect(details.open).toBe(false);
    details.open = true;
    fireEvent.keyDown(details, { key: 'Escape' });
    expect(details.open).toBe(false);
    expect(document.activeElement).toBe(details.querySelector('summary'));
  });
});

describe('moving text', () => {
  it('pauses and resumes both strips together', () => {
    const { container } = render(<MarqueeProvider><Ticker /><TypeBreak /></MarqueeProvider>);
    fireEvent.click(screen.getAllByRole('button', { name: 'Pause looping animations' })[0]);
    expect(container.querySelector('.ticker-track')?.getAttribute('data-paused')).toBe('true');
    expect(container.querySelector('.type-break-track')?.getAttribute('data-paused')).toBe('true');
    fireEvent.click(screen.getAllByRole('button', { name: 'Play looping animations' })[1]);
    expect(container.querySelector('.ticker-track')?.getAttribute('data-paused')).toBe('false');
    expect(container.querySelector('.type-break-track')?.getAttribute('data-paused')).toBe('false');
  });
  it('honors a system reduced-motion change', () => {
    const { container } = render(<MarqueeProvider><Ticker /><TypeBreak /></MarqueeProvider>);
    prefersReduced = true;
    act(() => listener?.());
    expect(container.querySelectorAll('button:disabled')).toHaveLength(2);
  });
});
