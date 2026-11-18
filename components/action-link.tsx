import type { ReactNode } from 'react';

export function ActionLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="action-link" href={href}>
    <span>{children}</span>
    <span className="action-corners" aria-hidden="true"><i/><i/><i/><i/></span>
    <svg className="action-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>
  </a>;
}
