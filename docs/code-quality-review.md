# Code quality review

Date: 2026-11-18
Scope: current Next.js application, runtime interactions, styling, configuration, and verification setup. There is no usable Git repository in this workspace, so this reviews the current application rather than a branch diff. Prototype galleries and historic static copies were considered only where they affect maintenance of the application.

**Overall rating: 4/10. Recommendation: do not treat the current implementation as production-ready until the high-priority structural and motion issues are addressed.**

## High-priority findings

### 1. The Next.js application is a raw HTML string with a second, unrelated behavior layer

- Evidence: `app/page.tsx:6`, `app/markup.ts:1`, `public/site-interactions.js:1`, `components/motion-layer.tsx:15`.
- The entire page is serialized into a single approximately 11 KB string and inserted through `dangerouslySetInnerHTML`. Navigation, animation targets and content then depend on document-wide selectors in both an external JavaScript file and a React client component. The project data and repeated actions cannot be maintained or type-checked as React components; changing a class or element can silently disconnect behavior.
- The markup is currently a repository-controlled constant, so this is **not** evidence of an exploitable injection vulnerability. It is a fragile ownership boundary and would become a security risk if untrusted data were ever inserted into that string.
- **Remedy:** replace the HTML string with server-rendered React components and typed project data. Own the menu, marquee, section animation, and corresponding refs in small client components. Delete the external interaction script and its global DOM queries. Keep static copy and links server-rendered.

### 2. The stylesheet is an accumulation of superseded designs, not one coherent system

- Evidence: `app/globals.css:2`, `app/globals.css:17`, `app/globals.css:23`, `app/globals.css:28`, `app/globals.css:32`, `app/globals.css:37`, `app/globals.css:43`.
- The same hero, section, project, contact, and mobile selectors are redefined repeatedly in long minified lines. Multiple earlier layouts, retired motion-control rules, and later overrides remain in the cascade. The final appearance depends on ordering and specificity across the whole file. The small reported line count hides over 22 KB of styling.
- **Remedy:** reconstruct one canonical definition per component and breakpoint, remove obsolete override blocks and `motion-off` rules for the removed control, and keep tokens in a small shared foundation. Format the CSS normally. Use the existing `buttons.css` for the selected button pattern only, rather than duplicating a full gallery in production.

### 3. The large repeated-text strip has no pause mechanism

- Evidence: `app/globals.css:28`, `app/markup.ts:1`, `public/site-interactions.js:1`.
- `.type-break-track` runs continuously for 28 seconds and repeats indefinitely. The existing pause button controls only `.ticker`; it does not pause this second moving region. The system reduced-motion preference stops it, but visitors without that setting cannot stop the strip. This is a likely WCAG 2.2.2 issue because the motion starts automatically and lasts over five seconds; verify against the rendered behavior and applicable conformance criteria.
- **Remedy:** make the strip static, or connect it to an accessible, clearly labeled shared pause mechanism. Test both strips with keyboard and reduced motion.

### 4. Ribbon parallax is overridden by its own entrance animation

- Evidence: `components/motion-layer.tsx:23-28`, `app/globals.css:14-15`.
- Framer Motion updates `--ribbon-shift`, but `.hero .ribbon` has `animation: ribbon-in ... both`; the animation's final keyframe applies `transform: translateX(0)`. The filled animation continues to own `transform`, preventing the normal `transform: translate3d(0,var(--ribbon-shift),0)` from taking effect. This makes the intended scroll-depth code ineffective after the entrance.
- **Remedy:** assign entrance and scroll transforms to separate wrapper elements, or combine both values under one motion owner. Avoid a persistent animation fill that overrides the scroll transform. Confirm the fix by measuring the ribbon's computed transform before and after scroll in a browser.

## Medium-priority findings

### 5. Motion infrastructure is over-coupled to selectors and the scroll hot path

- Evidence: `components/motion-layer.tsx:14-37`, `components/motion-layer.tsx:39-93`.
- One component manages reduced-motion detection, global element discovery, per-scroll DOM measurement, CSS mutations, a portal, asynchronous Three.js initialization, visibility state, frame scheduling and disposal. Every scroll event queries the whole document and measures project visuals. This is avoidable complexity and a performance risk, not a demonstrated performance regression.
- **Remedy:** move the WebGL scene into a dedicated decorative component mounted directly in the hero. Use refs and Framer Motion values scoped to each animated visual, or a single bounded transform over a cached set of elements. Keep scroll handling separate from WebGL lifecycle.

### 6. WebGL failures are silently swallowed, and partial initialization can leak resources

- Evidence: `components/motion-layer.tsx:44-49`, `components/motion-layer.tsx:80-92`.
- Failure to create the optional renderer can legitimately fall back to the static illustration. However, the empty import catch also suppresses unexpected programming errors. If an error occurs after creating a renderer but before the cleanup function is assigned, the catch can leave partially created resources or a canvas behind.
- **Remedy:** handle expected WebGL unavailability explicitly; report unexpected development errors. Register disposal as resources are acquired, or isolate scene initialization in a function with a `try/finally` cleanup contract. Test unavailable WebGL, unmount during import and context loss.

### 7. There is no repeatable behavior or accessibility test suite

- Evidence: `package.json:5-10`; no test or lint script is configured.
- Builds and TypeScript validate compilation, not the external script's DOM assumptions, focus handling, marquee pause, reduced motion, scroll effects or responsive layout. The untyped external script is especially vulnerable to regressions that a successful build will not catch.
- **Remedy:** after moving interactions into components, add focused tests for the menu, ticker pause, reduced-motion preference, decorative fallback and key navigation, plus a small browser smoke test at narrow and desktop sizes. Add a lint command and run these checks in CI.

## Verification and limits

- `npm run typecheck`: passed during this review.
- `npm run build`: passed during this review; `/` is statically prerendered. The project uses Next.js's experimental `useTypeScriptCli: false` setting, which still runs type checking through the compiler API.
- No automated test or lint command exists in `package.json`.
- No browser, assistive technology, device, performance, WebGL failure, or visual regression tests were run during this review. Findings about animation precedence follow from the CSS and code and should be confirmed in a browser.
- No source-code changes were made during this review. This report is the only new project file.

## Recommended order

1. Replace the raw markup and external script with typed React components and one owner for each behavior.
2. Consolidate the CSS to one set of rules per component, retaining the approved visual design.
3. Resolve continuous-motion controls and the ribbon transform conflict.
4. Split and harden WebGL initialization and cleanup; measure whether the decorative effect justifies its bundle and runtime cost.
5. Add behavioral, accessibility, and responsive browser coverage, then repeat the visual review.

## Remediation follow-up — 2026-11-18

The subsequent refactor replaced the serialized markup and global interaction script with React components and typed project data, consolidated the active stylesheet, and separated the Three.js scene from the scroll effects. Both moving text strips now have synchronized pause controls. The ribbon's scroll and entrance transforms use separate elements. WebGL initialization handles unavailable contexts, cleans up partial initialization, and logs unexpected failures during development.

Added ESLint and six focused Vitest/React Testing Library checks covering project data, menu behavior, synchronized pause, reduced-motion changes, ribbon structure, and unavailable WebGL. `npm run lint`, `npm test`, `npm run typecheck`, and `npm run build` passed after the application refactor. Browser-based visual, keyboard, performance, and WebGL context-loss testing remain outstanding; the earlier score is a historical assessment and has not been reassigned.
