# GSAP scrolling and responsive motion � 27 October 2026

Replaced public Motion scroll hooks, continuous section perspective/rotation, nested entry scaling and archive layout animation with a shared GSAP/ScrollTrigger engine. Desktop ScrollSmoother uses a short 0.55-second catch-up; touch, narrow and reduced-motion layouts retain native scrolling. Fixed header/cursor/progress UI lives outside the transformed content. Route and breakpoint cleanup owns all contexts/listeners/observers; same-page anchors, initial deep links and skip-link focus are handled explicitly. A single debounced size observer waits for scrolling to stop before refreshing geometry.

Tech cards are static. Cursor/magnetic interactions use quickTo; project image parallax is limited to eight pixels on desktop. The frame-by-frame React title scramble and duplicate intro/route overlays are removed from rendering. Hero ambient effects pause offscreen, while mobile omits particles, parallax, cursor, fixed grain and backdrop blur. The public site no longer imports Motion; GSAP was already installed, so no dependency installation was needed.

Browser verification caught and fixed a development portrait crash: local Payload media returned an absolute loopback URL while the public URL was configured for Vercel. `mediaSource` now maps local development `/api/media/file/` URLs to relative paths, with production and unrelated remote sources unchanged. A regression test covers this combination and the boundary cases. Also removed inherited double anchor spacing (90px root padding plus 96px target margin).

Verified no horizontal overflow at 320px, 390px, 768px and desktop 1280px. All seven homepage images loaded; mobile navigation opened and closed with Escape. Desktop smooth mode uses one wrapper, header top remains 0px, and the Arsenal deep link settles at approximately 96px. Client navigation to Projects resets scroll to the top and reconciles body/content heights. Production wheel scrolling advances the progress indicator without moving the header. Production browser error/warning log was empty. Temporary viewport overrides were reset. Screenshot: docs/mobile-gsap-preview.png.

TypeScript, lint, all twenty-one tests and `git diff --check` passed. The production webpack build passed (all sixteen generated pages), as did all fifteen public route smoke checks. The production preview temporarily disabled first-user bootstrap only in its own process; no .env values were changed. Development preview was restored afterward. No database/content writes were made for this animation pass. These are functional and layout checks, not a hardware-wide FPS benchmark. See docs/motion-guide.md for tuning and implementation details.

# Verification — 26 October 2026

## About community, certificates and static tech cards — 26 October 2026

Removed tech-card hover translation/rotation and hover-border changes. The Community homepage block and standalone Community content are removed. `/community` redirects to `/about#community`; navigation is now Projects, Certificates and About. About reads its community details/logo from Site Settings and published Experience records from the existing collection.

Added the Certificates collection with participated/organized involvement, event title/date, issuer/organization, optional related event, preview image, certificate image/PDF, credential link, display order and visibility. The homepage preview and `/certificates` gallery use published records; empty states and the involvement filters work without fabricated entries. New headings, filters and About visibility controls live in Website presentation.

Migration `20261026_053300` was reviewed and applied to Neon. The seed moved the requested navigation and content once, then imported the official Geek Room profile logo into persistent Payload Media. Existing custom settings, projects, skills, events, experience and contributions were retained. The organization logo can be overridden from Site settings → Community on About. Source attribution is stored on the Media record.

Browser verification confirmed Projects/Certificates navigation, the loaded logo on About, the experience empty state, certificate filtering, and mobile layout without horizontal overflow at 390px. Screenshots: docs/about-community-preview.png and docs/mobile-certificates-preview.png. TypeScript, ESLint and all nineteen tests passed. A production build exposed a Neon connection timeout with eleven static workers, so static generation is now limited to two workers with bounded per-worker concurrency and one retry. The production build then passed, including all sixteen generated pages and trace collection. All fifteen route smoke checks passed, including `/certificates`, the missing-project 404 and the legacy Community redirect. `git diff --check` reported no whitespace errors. The development preview was restarted at http://127.0.0.1:3000/.

## Responsive layout, compact skills and About portrait — 26 October 2026

About previously rendered only the monogram, even with a populated Site Settings portrait. It now renders the uploaded portrait with a reserved responsive frame, CMS alt text/name fallback, responsive sizes and a monogram fallback when unset. The asset was verified loaded at 390px and 768px in the browser.

Skill cards now use compact icon/name/category rows, 28–32px icons, smaller padding and subtle offset borders. Six real CMS skill icons loaded during verification; desktop cards measured approximately 177 × 77px, while a phone card measured 148 × 68px. The group grid wraps to two columns on phones and one column on narrow 320px screens. The hero, navigation, filters, content grids, footer links, and embedded resume have mobile rules that preserve the existing palette and routes.

Browser checks covered 320px and 390px phones, 768px tablet and 1280px desktop. The inspected layouts had no horizontal document overflow, the mobile menu opened and dismissed with Escape, and the portrait and skill icons loaded. Screenshots are in docs/mobile-about-preview.png and docs/mobile-skills-preview.png. Temporary viewport overrides were reset.

The installed pg parser warned that require/verify-ca aliases would change behavior in a future release. Neon runtime URLs now explicitly select verify-full, preserving certificate/hostname checks without changing credentials or editing .env. Regression expectations reflect the explicit mode.

TypeScript, ESLint and all nineteen tests passed. The production Next.js build also passed, including static route generation and trace collection. No new database schema changes or content writes were needed for this responsive pass.

## Blank collection creation forms — 24 October 2026

Payload's Document view creates an empty autosave draft during the Create New GET render. The unconditional collection afterChange hook called revalidateTag at that point, which Next rejects during render. Shared publishedHooks now invalidates only when the new or previous document is published. Draft initialization and subsequent draft-only autosaves skip invalidation; publishing, published edits, unpublishing, and deletion still invalidate. This is applied to every portfolio collection and Media. Global settings retain their existing save hook.

Validation: all fourteen tests pass, including a regression test using an invalidator that throws during draft initialization and coverage of publication transitions and deletion. Browser interaction was not verified in this pass.

## Admin media picker authentication and storage schema — 23 October 2026

The admin media picker lost its session on POST because Payload trusted `http://localhost:3000` while the browser was using `http://127.0.0.1:3000`. The installed Payload cookie strategy accepts same-origin browser GETs without an Origin header, but rejects cookies on POSTs whose Origin is outside the configured CSRF list. `adminCSRFOrigins` now supplies explicit localhost/IPv4/IPv6 loopback aliases only when the configured server itself is loopback, preserving its scheme and port. For a public host it supplies only the canonical origin. No wildcard, arbitrary request-host trust, authentication bypass, or media-access change was added.

Once authentication passed, the live check exposed missing S3 plugin columns. The reviewed `20261023_083809_neon_storage_fields` migration adds nullable `media._objectkey` and `_media_v.version__objectkey` columns only. It was applied to Neon successfully; no existing content was deleted or rewritten. The generated schema snapshot is retained for future migrations.

Validation: twelve tests pass, including reproducing the old cookie rejection with the real Payload extractor, accepting both local hosts, rejecting unrelated origins and ports, and keeping production origins strict. TypeScript passes. A live disposable-account check verified REST login, cookie authentication from both local origins, rejection of an unrelated origin, draft image upload to Neon storage, and the exact `render-list` POST to `/admin/globals/site-settings`. The action returned 200 and included the uploaded draft in its list. The temporary media record, stored files, test account, and sessions were removed. Existing accounts/content and the owner's running server were left intact.

## Neon connected and missing users table fixed — 23 October 2026

The owner supplied Neon credentials in the ignored `.env`. Both the direct and pooled PostgreSQL connections were verified. The existing `projects` bucket passed a read-only S3 HeadBucket check. No credentials were displayed or written into source files.

The target Neon database was confirmed to have no public tables. The existing `20261019_194222_initial` migration was then applied successfully, creating the Payload schema and recording the migration. A subsequent `select count(*) from users` succeeds and returns zero, ready for the owner to create the first administrator. The existing non-overwriting seed initialized Ishaan's supplied Site Settings and verified Geek Room organization. This is initialization of the new database, not a dump/restore of any additional records in the unavailable old Docker database. Local Docker data was not modified.

The app accepts `DATABASE_URL` (direct), `DATABASE_URL_POOLED` (runtime), and the supplied `AWS_*` storage values. The previous S3 aliases and `DATABASE_URL_DIRECT` override remain supported. Migration subprocesses explicitly clear the pooled override so schema changes use the direct connection. Ten tests and TypeScript pass, including the hydration regression, connection routing, migration target guards, and storage environment compatibility.

Live HTTP checks: `/admin` and `/admin/create-first-user` return 200; the latter has the title `Create first user — Ishaan / Studio`, the expected setup component, and no streamed server error or missing-table error. The admin response includes the patched stylesheet identity. The homepage returns 200 with Ishaan's name and without the preview-mode notice. All 13 public-route HTTP checks passed. The unknown-project route uses Next.js documented streaming behavior: HTTP 200 with a 404 boundary and noindex. The smoke test now validates both markers when the status has already streamed, while still rejecting a generic 200. These are HTTP/source checks, not browser-interaction tests. The owner's already-running dev server was reused and left running. After creating the first account, set `ALLOW_FIRST_USER=false` and restart.

## Earlier preparation notes (superseded by the connection above)

## Admin hydration fix and Neon preparation

The reported admin mismatch was reproduced in a React/JSDOM regression: an injected `body[unresolved]` style precedes Payload's anonymous CSS-layer style. Giving Payload's style stable React `href` and `precedence` properties fixes this case without suppressing hydration warnings, deleting the injected style, or replacing the server-rendered button. The hydrated click handler is verified. The narrow patch in `scripts/patch-payload-style.mjs` runs on install and before dev/build, is idempotent, and rejects unexpected upstream changes. See `docs/admin-hydration.md`.

The optimized production build passes in preview mode with process-only database overrides; `.env` is unchanged. TypeScript and seven tests pass (the hydration regression, four database/migration checks, and the two existing link checks). The database tests verify TLS expectations for Neon, disabled cloud schema push, optional local development behavior, credential-safe errors, and refusal to migrate using a pooled endpoint or a different database target. The Neon setup command was checked against the existing `.env` and left it unchanged.

Cloud setup is implemented using the existing Payload PostgreSQL adapter: five pooled runtime connections, a direct migration URL, TLS from the provider URL, and no automatic schema push or database creation on remote hosts. `setup:neon`, `db:migrate`, `db:migration`, and `db:status` are documented in `docs/neon.md`. Only test dependencies (`jsdom` and `@types/jsdom`) were added for this fix. The migration files and CMS collections are unchanged.

**Neon is not yet connected.** The owner chose API-key access instead of the optional integration. A `NEON_API_KEY` in the ignored `.env`, or the Neon connection URLs, is still required. No API key or database password was written into source or logs, no remote database was created, and no data was moved. The previous `.env` and Docker data remain intact. Docker's engine is unavailable, so source data cannot currently be exported or reconciled. Live admin/database checks and an end-to-end browser confirmation remain pending.

## Earlier redesign verification

## Crimson anime redesign

The public UI now uses near-black, crimson, and violet, with locally served Bebas Neue headings. Original CSS/SVG create the eclipse, energy ring, torii silhouette, embers, halftone textures, and speed lines. The homepage follows Origin, Arsenal, Missions, published Experience, Community, the interactive lab, featured Events, Process, and the shared Contact ending. Existing archive and detail layouts receive the same theme.

The name scrambles for 650ms with reserved text geometry, the non-blocking opening caption lasts 1.7 seconds once per tab, sections reveal on scroll, skill energy bars fill on entry, project panels tilt, route changes show a short slash, and a pointer energy ring follows desktop movement. Reduced motion is handled silently. No pause/stop/reduce-motion control is rendered. Skill bars are decorative; no ratings or achievements were invented. The previous image asset remains on disk but is not loaded by the new homepage.

## Checks completed for this revision

- `npm run typecheck` passed after the final presentation changes.
- `npm test` passed both existing tests: required project-link combinations and executable/malformed URL rejection.
- Optimized Next.js webpack production build passed, with all public routes plus Payload admin/API routes compiled.
- The production build and temporary server used the existing preview mode through process-only empty `DATABASE_URL` and `PAYLOAD_SECRET` overrides. The `.env` file was not changed.
- HTTP smoke checks returned 200 for home, projects, community, activities, hackathons, events, experience, resume, writing, about, sitemap, robots, and icon. An unknown project returned 404.
- Rendered HTML checks confirmed Ishaan Vats, episode sections, original SVG scenery, the retained interactive lab and GitHub URL, and the absence of motion toggles or the prior raster hero. The compiled stylesheet and all four referenced local font files returned 200.
- CMS collections/settings, migrations, Payload routes, Payload configuration, public data queries, and default personal details were compared by SHA-256 and remained unchanged. No database records were edited.
- Source formatting completed for all touched TSX and theme CSS files. The only new direct dependency is `@fontsource/bebas-neue`; existing GSAP and Motion are reused.
- The owned temporary verification server was stopped after checks. Temporary build/HTTP drivers were removed.

## Limits of this verification

Local PostgreSQL was unavailable because Docker Desktop's backend was not running. CMS-backed publishing and data refresh were not retested for this revision. Restore the database connection and rebuild with the real environment before deployment. Browser automation remains unavailable under the previously returned browser-access policy, so this revision has no new screenshot, interaction, console, viewport, or Lighthouse measurements. Responsive breakpoints and reduced-motion behavior are implemented but are not a substitute for device testing. Earlier screenshots and browser checks below describe previous designs.

## Files changed for the redesign

- `src/app/(frontend)/page.tsx`, `layout.tsx`, `theme.css`: homepage, shared contact/footer, typography, tokens, responsive layouts, archive/detail styling.
- `src/components/anime-background.tsx`, `anime-title.tsx`, `opening-sequence.tsx`, `energy-cursor.tsx`: separated original scenery and opening/cursor effects.
- `src/components/experience.tsx`, `motion-layer.tsx`, `navigation.tsx`, `visual.tsx`: scroll wrappers, skill fills, route slash, navigation, and retained interactive lab without motion controls.
- `src/app/icon.svg`: matching crimson/violet icon.
- `package.json`, `package-lock.json`: local display-font package.
- `README.md`, `VERIFICATION.md`: setup, design, and verification notes.

## Previously completed CMS and implementation checks (earlier revisions)

- Production Next.js build with PostgreSQL-backed Payload content, including all public routes, REST API, and admin routes.
- TypeScript validation and unit tests for the four project URL combinations and executable URL rejection.
- Initial SQL migration applied successfully to a separate clean PostgreSQL database. Automatic schema push is disabled in production.
- Local PostgreSQL integration checks: anonymous writes denied; draft records and draft relationships excluded publicly; publish/unpublish visibility; image uploads, resizing, and populated galleries; draft media access; valid PDF resume uploads; rejection of images as resume PDFs and PDFs as cover images.
- Production-server checks: authenticated REST publishing and unpublishing invalidate cached pages without a restart; a project created after build gets a working detail route; unpublishing returns that detail route to 404; published media delivery succeeds.
- HTTP smoke checks passed for every requested public page, sitemap, robots, and icon; unknown project routes correctly return 404.
- Browser inspection of the CMS-connected desktop homepage and project archive. A scroll-effect hydration race was found and fixed. The reload then showed no hydration issue.
- Responsive browser checks in 390px and 768px iframe viewports. The mobile menu opens, and Escape closes it. These checks validate viewport layout, not physical touch hardware.
- `/admin` reaches the first-administrator setup screen. No administrator credentials have been assigned to the owner.
- The verified biography, education, GitHub link, and Geek Room organization are seeded. Disposable integration fixtures and temporary administrators were removed. No fabricated achievements or projects remain.

## Before public deployment

- Supply production PostgreSQL, private S3-compatible storage, a public HTTPS origin, and secrets. Local media uploads have been tested; remote S3 persistence and provider permissions require the actual bucket credentials.
- Create your administrator privately and disable `ALLOW_FIRST_USER`. Configure a Payload email adapter if password recovery should send real email; the default development adapter only logs messages.
- Add actual projects, event photographs, verified experience/skills, contact profiles, and the resume through `/admin`. Publish media as well as content records.
- Review the dependency audit: `audit-report.json` currently reports 11 transitive advisories (6 high, 5 moderate). Sass and DOMPurify were updated through overrides. Remaining chains include `braces` through storage discovery tooling and an older `esbuild` through Drizzle tooling; npm currently reports no compatible complete fix. Do not treat the build passing as a clean security audit.
- Physical touch-device testing, screen-reader testing, remote storage restart persistence, and multi-instance cache invalidation have not been performed. Reduced-motion and touch cursor behavior are implemented using media queries.

## Reproduce

See README.md for setup. `npm run typecheck`, `npm test`, and `npm run build` run the standard checks. The disposable integration script is restricted to the local Docker database. With a local built server running, set `TEST_ORIGIN` to its URL and run `npx tsx --env-file=.env scripts/integration.ts`, then `node scripts/smoke.mjs`.

Screenshots: `docs/homepage.png` and `docs/responsive.png`.

## Earlier UI route checks (21 October)

The 21 October preview-mode production server returned 200 for home, projects, community, activities, hackathons, events, experience, resume, writing, about, sitemap, robots, and the favicon. An unknown project returned 404. Rendered HTML checks confirmed Ishaan Vats, the current CMS-default headline, playground, process, ambient-motion control, and preserved navigation destinations; the pasted prompt's Vani.Create identity was absent. These are HTTP and source checks, not browser interaction or screenshot tests. The temporary verification server was stopped afterward.






