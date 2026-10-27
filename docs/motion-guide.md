# Portfolio motion — 27 October 2026

The public site uses the existing GSAP dependency with ScrollTrigger and ScrollSmoother. No packages were added. Payload keeps its separate layout and styling.

## Scroll and motion ownership

- `src/components/scroll-stage.tsx` owns the single public scroll stage. Desktop uses 0.55-second smoothing at widths of at least 900px with a fine hover pointer. Touch devices, narrow windows, reduced-motion users and no-JS visitors retain native scrolling. It never prevents wheel or touch events or normalizes native scroll input.
- Header, progress indicator and cursor stay outside transformed content. The header remains fixed during smoothing, with its normal flow height reserved in the content. Native layouts keep the existing sticky header.
- Same-page links update the hash and smoothly reach their sections. Modified clicks, downloads, external links and cross-route links retain their normal behavior. Skip-to-content also moves keyboard focus. Initial hashes and browser hash navigation are supported. Resize refreshes wait for scrolling to settle, avoiding interruptions to native anchor scrolling.
- One content size observer refreshes scroll measurements after image loads and filter changes. GSAP contexts, observers, listeners, pending refreshes and the smoother are cleaned up on route changes and breakpoint changes.

## Lighter effects

`experience.tsx` supplies short, one-time translate/opacity reveals. Nested reveals do not stack; wrappers clear their animation styles after entry. Initially visible content is never hidden before hydration. Whole-section perspective, rotation and scaling have been removed. Archive filtering no longer animates grid layout positions.

Project image parallax is limited to eight pixels in each direction on desktop. Magnetic links cache bounds on pointer entry and use GSAP quickTo instead of springs plus repeated layout reads. The cursor shares GSAP's ticker instead of running its own RAF loop. Skills stay static. Hero text no longer rerenders React on every animation frame, and the extra intro/route overlay is removed from the page. Hero ambient effects pause offscreen. Phones omit particles, custom cursor, parallax, magnetic motion, fixed grain and backdrop blur. Mobile navigation uses ordinary React state without loading a second animation engine.

## Tuning

Change desktop catch-up time in `ScrollStage` (`smooth: 0.55`). Reveal durations/distances and project parallax live in `experience.tsx`. Public motion CSS is at the end of `src/app/(frontend)/theme.css`. Keep the 900px threshold consistent across JavaScript and CSS. Motion preferences are respected silently; no visible control is added.

The existing CMS content, routes, forms, section visibility, order, copy controls and palette are retained. Local development media URLs are normalized to the existing `/api/media/file/` route so a deployed public URL in .env does not break Next Image or the portrait. Production image host restrictions remain unchanged.

## Verification

Browser checks covered 320px and 390px phones, 768px tablet, and the default 1280px desktop viewport. The checked layouts had no horizontal overflow. All seven homepage images (portrait and six skill icons) loaded. Mobile navigation opened and closed with Escape. Desktop Projects anchor settled at approximately 96px below the viewport top, the header stayed at 0px, and the progress indicator advanced. Mobile anchor spacing was also verified at approximately 96px after removing an inherited duplicate scroll-padding offset. Client navigation to Projects reset to the top and updated content/body heights correctly. Temporary viewport overrides were reset.

Screenshot: `docs/mobile-gsap-preview.png`. TypeScript, lint and all twenty-one tests passed, including a regression for local CMS media with a deployed public URL. Production build results are recorded in VERIFICATION.md. These are functional/layout checks, not a device-wide FPS benchmark.

References: [ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/).
