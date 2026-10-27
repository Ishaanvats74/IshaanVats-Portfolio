# Ishaan Vats — Portfolio

A responsive anime-inspired portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, a shadcn-style Radix button, Lucide, Motion, GSAP, and Payload CMS. PostgreSQL stores content; the official S3 adapter provides persistent production media.

The public UI is an original anime opening sequence for Ishaan Vats: near-black, neon crimson, electric violet, self-hosted Bebas Neue headings, and Space Grotesk body text. CSS/SVG create the eclipse, torii silhouette, energy ring, embers, halftone textures, and speed lines. Episode sections introduce the biography, toolkit, projects, experience, community, interactive lab, and contact finale. GSAP, Motion, and CSS provide scroll reveals, a short name scramble, card tilt, route slashes, and an energy cursor. The non-blocking opening caption lasts 1.7 seconds once per tab. System reduced-motion preferences are respected silently; there are no motion toggles. Skill energy bars are decorative, not invented proficiency scores. Existing Payload collections, content queries, routes, filters, and links remain intact.

Theme colors and font tokens live in `src/app/(frontend)/theme.css`. Background, title, opening caption, and cursor each have separate components. The only new direct dependency for this redesign is `@fontsource/bebas-neue`, which serves the display font locally. Existing GSAP and Motion packages are reused; no WebGL or external-image dependency was added.

## Run the preview

Node.js 22+ is recommended. Install dependencies with `npm ci`, then `npm run dev`. Open http://localhost:3000. Without database credentials the frontend explicitly runs in local preview mode, using only the supplied biography and GitHub URL. All content archives are empty. Preview mode does not provide a functioning admin/database.

## Connect Payload to Neon

Docker is optional. The default cloud setup uses Neon with the existing Payload PostgreSQL adapter.

1. Run `npm run setup:neon`. It creates an ignored `.env` only if one does not already exist.
2. Set `DATABASE_URL` to the Neon direct URL and `DATABASE_URL_POOLED` to the pooled URL for the same branch/database. The previous `DATABASE_URL_DIRECT` override also works. Keep the supplied TLS parameters. Preserve `PAYLOAD_SECRET` when moving existing content.
3. **Existing local data:** export and restore it to an empty Neon database before switching. See [the migration notes](docs/neon.md). Changing connection strings does not copy content or media.
4. **New empty database:** run `npm run db:migrate`, then `npm run seed`. The seed only adds the supplied biography and verified Geek Room organization; it does not invent projects or achievements.
5. Run `npm run dev` and visit `/admin`. For a fresh database, create the first administrator with `ALLOW_FIRST_USER=true`, then set it to `false` and restart.

Cloud databases always use migrations, including during local development. `npm run db:status` inspects migration state. The old `setup:local` command and Docker compose file remain available for recovering existing local data. Neon hosts the database; production uploads still need the existing S3 storage configuration.

## Admin hydration compatibility

A narrow, repeatable patch gives Payload's CSS-layer style a stable React resource identity so browser-injected styles do not cause the reported hydration mismatch. It runs after installation and before dev/build, and is covered by a regression test that injects the reported CSS. See [the implementation notes](docs/admin-hydration.md). No hydration warnings are suppressed. The new `jsdom` and `@types/jsdom` dependencies are development-only test tools.

## Editing content

- **Projects:** upload a cover and screenshot gallery, add technology tags and case-study sections. Live/repository buttons use your entered URLs. Cards lead to internal detail pages.
- **Events / Hackathons:** select organizations and related projects, record the exact role and dates, upload real photographs. Events and hackathons feed the Activities archive automatically.
- **Experience / Contributions:** add responsibilities, relationships, and only verified achievements or metrics.
- **Skills:** the supplied inventory is intentionally not bulk-published. Add and publish technologies you confirm reflect your experience.
- **Articles:** use the Lexical editor for writing and technical breakdowns.
- **Resume:** upload a PDF in Media, attach it to a Resume record, set its update date and visibility, and publish. The latest visible published record is selected automatically. Unpublish or hide old versions.
- **Site Settings:** biography, contact fields, social URLs, navigation, homepage pillars, footer, and default SEO. Missing email/phone/social fields are omitted publicly.

All primary published portfolio content comes from Payload when configured. No frontend component requires edits to add portfolio records. Missing images use a neutral typographic cover rather than unrelated photos. Media also has a draft/publish workflow: publish the media record before publishing the project, event, or resume that uses it. Unpublished media is protected by Payload's read access, including when stored in a private S3 bucket. Public access excludes draft content and draft relationships. Published files are public, so only publish documents intended for your portfolio.

## Production deployment

Deploy to a Node-compatible Next.js host (for example a container host or Vercel), with managed PostgreSQL and a private S3-compatible bucket. This application uses standard Next.js/Payload and is not packaged for the Sites Cloudflare Worker runtime.

Set the variables in `.env.example` using the host's secret manager. Use HTTPS for `NEXT_PUBLIC_SERVER_URL`, a unique long secret, TLS for the database connection, and production S3 credentials scoped to this bucket. Set `S3_ENDPOINT` for R2/MinIO or leave unset for AWS S3; set the region appropriately. Media URLs are served through Payload with its storage adapter; bucket credentials never enter client components. Local `media/` is only for development.

Before exposing production, bootstrap your administrator through a private environment and set `ALLOW_FIRST_USER=false`. There is no public user registration after bootstrap. Every administrator is trusted to edit all content and manage other administrators; do not invite untrusted users.

1. Run `npm ci`.
2. The initial migration is included in `src/migrations` and has been applied successfully to a clean local PostgreSQL database. For future schema changes, run `npm run db:migration` in development and review/commit the new migration files. Test migrations against a disposable database first. Production disables automatic schema push.
3. Back up the production database. Run `npm run db:migrate` with production credentials as a single release step, before starting the new application. Never run migration creation against production.
4. Run `node --env-file=.env scripts/check-env.mjs` to validate production configuration (on a host that injects variables, omit `--env-file`).
5. Run `npm run generate:importmap`, `npm run typecheck`, `npm test`, and `npm run build`. Start with `npm start`.
6. Run the seed script once against the configured database, or populate settings manually in the admin. Ensure Site Settings exists before making the site public.

The app uses tagged Next.js data caching. CMS changes and deletions expire the portfolio tag immediately, so the next request refreshes published content before serving it. No redeployment is required. Dynamic detail routes support records published after deployment. If using multiple self-hosted replicas, configure a shared Next.js cache handler or a cache invalidation mechanism for every instance.

## Checks

- `npm run typecheck` — TypeScript validation.
- `npm test` — admin hydration with injected styles, database configuration, external-link safety, and project button combinations.
- `npm run build` — production compilation and route generation.
- `npm audit` — dependency advisories; review transitive advisories before release.
- `npx tsx --env-file=.env scripts/integration.ts` — disposable CMS integration tests, restricted to the local Docker database. Set `TEST_ORIGIN` to a running local server to additionally verify REST publishing, public media, dynamic case-study routes, and cache invalidation.
- `node scripts/smoke.mjs` — check all public routes on a running local server; `TEST_ORIGIN` defaults to `http://127.0.0.1:3000`.

Live acceptance checks require PostgreSQL and storage credentials: first-user bootstrap restrictions, unauthorized mutations, saving and publishing a project, draft-only relationship visibility, image upload/gallery display, publish/unpublish cache refresh, replacing the resume PDF, and restarting the deployment to confirm media persistence. Also verify keyboard navigation, mobile filters/menu, touch cursor disabling, reduced motion, and screen-reader labels using real content.

## Structure

- `src/cms` — collection/global schemas, access rules, publishing hooks.
- `src/app/(payload)` — `/admin` and REST API.
- `src/app/(frontend)` — public pages, styles, layouts, loading/error states.
- `src/components` — reusable page blocks, galleries, cursor, navigation, archive filters.
- `src/lib` — cached public queries, safe links, verified seed content.
- `scripts` — initial content seed and production environment check.

See `VERIFICATION.md` for the checks performed in the authoring environment and outstanding service-dependent checks.





## Dashboard editing and responsive UI

Use [the dashboard guide](docs/dashboard-guide.md) for every editable content area and [the copy audit](docs/cms-copy-audit.md) to locate labels, Japanese accents and static link destinations. The Website presentation global controls homepage section order, visibility, Origin cards, community badges and process steps. Site settings controls the portrait used on both Home and About.

Skills display uploaded icons, optional dark/light variants and an initial fallback in compact cards. Categories are editable text and their order is managed in Website presentation. SVG uploads are converted to PNG. Existing S3-compatible storage remains the persistent upload destination; Vercel requires the S3 credentials and correct NEXT_PUBLIC_SERVER_URL (see the guide).

Initialize another environment with `pnpm db:migrate` then `pnpm seed` (the equivalent npm scripts also work). The seed preserves existing settings and edited values. Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` to verify. ESLint uses an isolated TypeScript 6 API adapter because the application compiler is TypeScript 7; production code does not use that lint adapter.

## About community and certificates

The community content and editable logo live under Site settings → Community on About. Published Experience records now appear on About. `/community` redirects to `/about#community`; navigation uses Projects and Certificates.

Portfolio → Certificates stores participated/organized event certificates, image/PDF uploads, issuer details, dates and optional verification links. Publish records to show them on Home and `/certificates`. Website presentation controls the section visibility and labels. See [the updated dashboard guide](docs/dashboard-guide.md). Apply `npm run db:migrate` then `npm run seed` in another environment; migration `20261026_053300` adds the new fields and collection. No new runtime dependency is required.


GSAP scrolling and responsive motion behavior are documented in [docs/motion-guide.md](docs/motion-guide.md). No new dependencies are required; use `npm run dev` for local editing.
