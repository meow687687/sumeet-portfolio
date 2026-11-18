# Sumeet Basfore — portfolio

A single-page portfolio built with Next.js App Router, React, TypeScript, Framer Motion, and Three.js. The earlier design prototypes and static export are preserved in `prototypes/`.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run lint`, `npm test`, `npm run typecheck`, and `npm run build` to check the project. Run `npm run start` after a successful build to serve it.

## Structure and motion

`lib/projects.ts` holds typed project content. `app/page.tsx` assembles the server-rendered page, and small components own navigation, moving-text controls, artwork, and interactions. `app/globals.css` contains the visual system.

The primary hero and content render without WebGL. Three.js loads on the client for optional decorative particles and pauses when the hero is off screen, the tab is hidden, looping animation is paused, or the visitor prefers reduced motion. Framer Motion handles scroll-driven decorative depth, with reduced-motion fallbacks. Either pause control pauses the looping decorative elements and both text strips. Google Fonts are loaded with system fallbacks.

Project descriptions are summarized from repository documentation; project illustrations are conceptual. A canonical URL and social preview image are not configured because the production domain is undecided.

`next.config.ts` uses Next.js's documented TypeScript compiler API mode because the CLI configuration parser failed in this environment. Type checking remains enabled during builds.
