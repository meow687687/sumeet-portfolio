import type { Project } from '../lib/projects';

const illustrations: Record<Project['id'], React.ReactNode> = {
  dylani: (<svg viewBox="0 0 300 180"><rect x="20" y="15" width="260" height="150" rx="20" fill="#fff" stroke="#000"/><path d="M20 48h260M100 48v117" stroke="#000"/><circle cx="38" cy="32" r="5" fill="#fb4903"/><circle cx="54" cy="32" r="5" fill="#ffd731"/><rect x="35" y="65" width="48" height="62" rx="10" fill="#dceeff" stroke="#000"/><rect x="118" y="65" width="145" height="82" rx="12" fill="#ffd731" stroke="#000"/><path d="M134 86h62m-62 15h106" stroke="#000" strokeWidth="3" strokeLinecap="round"/></svg>),
  relay: (<svg viewBox="0 0 300 180"><rect x="10" y="60" width="72" height="55" rx="20" fill="#fff" stroke="#000"/><rect x="218" y="60" width="72" height="55" rx="20" fill="#fff" stroke="#000"/><path d="M82 88h36m64 0h36" stroke="#000" strokeWidth="2" strokeDasharray="5 5"/><path d="M150 18l48 18v50c0 31-22 51-48 65-26-14-48-34-48-65V36z" fill="#55db9c" stroke="#000"/><rect x="135" y="76" width="30" height="26" rx="5" fill="#fff" stroke="#000"/><path d="M141 76v-7a9 9 0 0118 0v7" fill="none" stroke="#000"/></svg>),
  caver: (<svg viewBox="0 0 300 180"><rect x="20" y="20" width="260" height="140" rx="20" fill="#fff" stroke="#000"/><path d="M20 52h260M75 76v56m0-28 40-28m-40 28 40 28" fill="none" stroke="#000" strokeWidth="2"/><circle cx="75" cy="76" r="7" fill="#5c4ade"/><circle cx="75" cy="132" r="7" fill="#ffd731"/><rect x="142" y="65" width="112" height="30" rx="15" fill="#e9ccff" stroke="#000"/><rect x="142" y="110" width="112" height="30" rx="15" fill="#dceeff" stroke="#000"/></svg>),
  spacer: (<svg viewBox="0 0 300 180"><rect x="20" y="20" width="260" height="140" rx="20" fill="#fff" stroke="#000"/><path d="M20 52h260" stroke="#000"/><rect x="38" y="68" width="90" height="74" rx="10" fill="#dceeff" stroke="#000"/><rect x="138" y="68" width="123" height="30" rx="8" fill="#55db9c" stroke="#000"/><rect x="138" y="106" width="57" height="36" rx="8" fill="#ffd731" stroke="#000"/><rect x="203" y="106" width="58" height="36" rx="8" fill="#e9ccff" stroke="#000"/></svg>),
};

export function ProjectIllustration({ id }: { id: Project['id'] }) {
  return <>{illustrations[id]}</>;
}
