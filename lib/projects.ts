export type Project = {
  id: 'dylani' | 'relay' | 'caver' | 'spacer';
  name: string;
  category: string;
  description: string;
  technologies: string[];
  href: string;
};

export const projects: Project[] = [
  { id: 'dylani', name: 'Dylani', category: 'Creative tools', description: 'An early local-first studio exploring how design systems can guide prompt-to-UI generation. Its documentation describes web source export; mobile export is unfinished.', technologies: ['React', 'Vite', 'JavaScript', 'TypeScript'], href: 'https://github.com/Sumeet-basfore/Dylani' },
  { id: 'relay', name: 'Relay', category: 'Agent security', description: 'A local-first security gateway for AI agent tools, with documented policy checks and credential isolation.', technologies: ['Rust', 'Cedar', 'SQLite'], href: 'https://github.com/Sumeet-basfore/relay' },
  { id: 'caver', name: 'caver-ci', category: 'Developer tools', description: 'A command-line tool for comparing how GitHub Actions workflow changes affect pull request trigger eligibility.', technologies: ['TypeScript', 'Node.js', 'GitHub Actions'], href: 'https://github.com/meow687687/caver-ci' },
  { id: 'spacer', name: 'spacer', category: 'Terminal tools', description: 'A terminal storage manager for exploring disk use and finding duplicate files.', technologies: ['Rust', 'Terminal UI'], href: 'https://github.com/meow687687/spacer' },
];
