import { ActionLink } from '../components/action-link';
import { AnimatedArt } from '../components/animated-art';
import { Hero } from '../components/hero';
import { MarqueeProvider, Ticker, TypeBreak } from '../components/marquees';
import { Navigation } from '../components/navigation';
import { ProjectIllustration } from '../components/project-illustration';
import { SectionReveal } from '../components/section-reveal';
import { projects } from '../lib/projects';

const tools = [
  { category: '01 · Languages', title: 'Languages', description: 'The languages powering these projects.', items: ['Rust', 'TypeScript', 'JavaScript'] },
  { category: '02 · Web', title: 'Web tools', description: 'For building the Dylani studio.', items: ['React', 'Vite'] },
  { category: '03 · More', title: 'Systems & tools.', description: 'The supporting cast, from workflows to data.', items: ['Node.js', 'GitHub Actions', 'Cedar', 'SQLite'] },
];

export default function Home() {
  return <MarqueeProvider>
    <a className="skip" href="#main">Skip to content</a>
    <Ticker />
    <header className="hero-band" id="top"><Navigation /><Hero /></header>
    <main id="main" tabIndex={-1}>
      <section className="band band--paper" id="projects"><div className="wrap">
        <SectionReveal className="section-head"><span className="label">01 / Selected work</span><h2>Ideas in action.</h2><p>Four projects spanning creative tools, security, developer workflows and storage.</p></SectionReveal>
        <div className="project-list">{projects.map((project, index) => <article className="project" key={project.id}>
          <AnimatedArt><ProjectIllustration id={project.id} /></AnimatedArt>
          <SectionReveal className="project-body"><span className="tag">{String(index + 1).padStart(2, '0')} · {project.category}</span><h3>{project.name}</h3><p>{project.description}</p><p className="tech">{project.technologies.join(' · ')}</p><ActionLink href={project.href}>View {project.name} repository</ActionLink></SectionReveal>
        </article>)}</div>
        <p className="illustration-note">Illustrations are conceptual, not screenshots.</p>
      </div></section>
      <TypeBreak />
      <section className="band band--gray" id="stack"><div className="wrap">
        <SectionReveal className="section-head"><span className="label">02 / The toolkit</span><h2>Made with<br/>the right tools.</h2><p>A closer look at the technologies behind the projects.</p></SectionReveal>
        <div className="tools">{tools.map((tool, index) => <article className="tool-card" key={tool.title}><SectionReveal className="tool-card-content" delay={index * .08}><span className="tag">{tool.category}</span><h3>{tool.title}</h3><p>{tool.description}</p><div className="chips">{tool.items.map(item => <span className="tag" key={item}>{item}</span>)}</div></SectionReveal></article>)}</div>
      </div></section>
      <section className="band band--sky" id="contact"><div className="wrap contact"><div><span className="label">03 / Say hello</span><h2>Let’s make<br/>something.</h2><p>Have an idea, a question, or a project in mind? I’d love to hear about it.</p><div className="contact-links"><ActionLink href="mailto:sumeetbasfore210@gmail.com">Email Sumeet</ActionLink><ActionLink href="https://www.linkedin.com/in/sumeet-basfore-405037399/">LinkedIn</ActionLink></div></div><div className="contact-note"><span className="tag">A note from Sumeet ✳</span><p>Good ideas start with a conversation.</p><a href="mailto:sumeetbasfore210@gmail.com">sumeetbasfore210@gmail.com ↗</a></div></div></section>
    </main>
    <footer className="footer"><div className="wrap"><p>© Sumeet Basfore</p><p><a href="#top">Back to top ↑</a></p></div></footer>
  </MarqueeProvider>;
}
