'use client';
import { useRef } from 'react';

const links = [{ href: '#projects', label: 'Projects' }, { href: '#stack', label: 'Stack' }, { href: '#contact', label: 'Contact' }];
export function Navigation() {
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => { if (menu.current) menu.current.open = false; };
  return <nav className="nav wrap" aria-label="Main navigation">
    <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">S</span><span>Sumeet Basfore</span></a>
    <div className="nav-links">{links.map(link => <a key={link.href} className="pill" href={link.href}>{link.label} ↘</a>)}</div>
    <details className="menu" ref={menu} onKeyDown={event => { if (event.key === 'Escape' && menu.current?.open) { close(); menu.current.querySelector('summary')?.focus(); } }}>
      <summary className="pill">Menu +</summary>
      <div className="menu-panel">{links.map(link => <a key={link.href} className="pill" href={link.href} onClick={close}>{link.label} ↘</a>)}</div>
    </details>
  </nav>;
}
