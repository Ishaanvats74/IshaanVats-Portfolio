# Monochrome manga refactor

## SVG icons, Katakana and scroll depth

The updated Origin grid uses Lucide GraduationCap, Code2 and Users SVGs, with the Focus copy “Full-Stack Systems & AI Engineering”. Community roles are charcoal pill badges. UI emoji and decorative pictographs have been replaced with SVGs. The favicon uses the same monochrome/crimson palette.

`anime-title.tsx`, `navigation.tsx` and the `.name-switch` CSS layer reveal イシャーン / ヴァツ and イシャーン・ヴァツ on hover or keyboard focus. English remains the accessible name. Reserved English geometry prevents layout shift; the short clipped glitch and transitions are disabled for reduced motion.

`Reveal` now uses `whileInView` for once-only fade/slide entry, a per-item delay for stagger, and `useScroll` / `useTransform` for a subtle 3D page tilt. `ProjectSurface` maps card scroll progress to a bounded image offset, composed with the existing pointer movement. `motion-layer.tsx` drives a 2px crimson progress bar directly from page scroll progress.

```tsx
const { scrollYProgress } = useScroll({
  target: card,
  offset: ['start end', 'end start'],
})
const scrollY = useTransform(scrollYProgress, [0, 1], [14, -14])
// A clipped media window holds the moving image without layout changes.
<motion.div style={{ y: reduced ? 0 : scrollY }}>{media}</motion.div>
```

```tsx
<Reveal delay={(index % 2) * 0.12}>
  <ProjectCard entry={entry} index={index} />
</Reveal>
```

Tailwind v4's CSS-first `@theme inline` in globals.css exposes `bg-canvas`, `bg-panel`, `text-copy`, `text-ash`, `border-panel-border` and `text-crimson` / `bg-crimson`. Their values come from the root tokens in theme.css; no JavaScript Tailwind configuration is needed.

1. `src/app/(frontend)/page.tsx`: removes Experiments and its canvas; replaces the hero copy, Origin biography and Allies description with the requested concise copy, three fact cards and role badges. The biography remains on About and CMS data is untouched. Field Notes becomes Episode 06.
2. `src/app/(frontend)/theme.css` and `globals.css`: ink black, charcoal panels, paper white, ash gray and crimson; old violet/pink values and canvas selectors removed. The top-level theme variables control the palette. Crimson buttons use dark text for contrast.
3. `src/components/experience.tsx`: Motion-powered `Reveal`, `MagneticLink` and `ProjectSurface`. Reveals run once upon entering the viewport. Links use bounded spring offsets. Cards scale to 1.02 and their media tracks the mouse subtly. Touch and reduced-motion preferences skip these movements. Existing GSAP effects elsewhere are retained.
4. `src/components/content.tsx`: shared project cards use ProjectSurface; external/social links use MagneticLink while retaining URL validation, target and rel attributes. The footer email CTA in `layout.tsx` is magnetic too. The existing cursor now uses crimson for both its dot and expanding ring.
5. `src/components/visual.tsx` deleted along with all canvas-only CSS. No CMS collections, migrations or dependencies were changed in this UI refactor.

## Reuse the components

```tsx
import { MagneticLink, Reveal } from '@/components/experience'

<Reveal>
  <section aria-labelledby="episode-title">
    <h2 id="episode-title">Next chapter</h2>
    <MagneticLink href="#contact" className="button">Let's build</MagneticLink>
  </section>
</Reveal>
```

The actual card interaction uses Motion (already installed, imported from `motion/react`):

```tsx
<motion.article
  whileHover={reduced ? undefined : { scale: 1.02 }}
  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
>
  {children}
</motion.article>
```

## Run

`npm run dev` starts the preview at http://127.0.0.1:3000. `npm run typecheck` checks the component interfaces. `node scripts/smoke.mjs` checks public routes against that running server. No package installation or database migration is needed for these changes.
