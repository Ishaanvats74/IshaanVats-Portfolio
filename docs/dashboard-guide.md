# Editing the portfolio

Open `/admin` and sign in with your existing account.

| What to edit | Dashboard location |
| --- | --- |
| Name, biography, education, photo, email, phone, social links, navigation, SEO | Globals → Site settings |
| Hero tagline, buttons, episode headings, Japanese accents, empty states, footer labels | Globals → Website presentation → Page copy, Japanese accents and links |
| Homepage section order and visibility; route content visibility | Website presentation → Section visibility and order |
| Education/focus/community fact cards | Website presentation → Origin cards |
| Community chips | Website presentation → Community badges |
| Observe/Connect/Experiment/Build/Learn | Website presentation → Process steps |
| Order of skill groups | Website presentation → Skill category order |
| Technology names, icons, links, categories, ordering | Portfolio → Skills |
| Projects, events, experience, community contributions and articles | Their existing Portfolio collections |
| Images and resume PDF | Assets → Media; Portfolio → Resume |

Drag array rows to reorder them. Disable a section with Visible to keep its data while hiding it. Keep stable section keys and copy keys unchanged. Use the editor label and the copy audit to find text. Clear optional Japanese text to remove it; the name hover falls back to English when its Japanese translation is empty.

Skills support Icon, Icon for dark surfaces and Icon for light surfaces. The dark site prefers a populated dark icon, then the regular icon, then the light alternate. Without a working image it shows an initial badge. Set meaningful Media alt text and publish the skill. Media is publicly readable so a published skill can display its associated upload. SVG uploads are converted to PNG during ingestion.

The About photo uses Site settings → Portrait, the same uploaded portrait as Origin on the homepage. It has a reserved responsive image frame and falls back to the monogram when no portrait is selected.

Saving globals or publishing/unpublishing collection content invalidates the public portfolio cache. Draft initialization does not invalidate during admin rendering. Existing routes and the monochrome/crimson palette are retained.

## Initializing a new environment

Run `npm run db:migrate` (or `pnpm db:migrate`) before starting an app with the new schema, then `npm run seed` / `pnpm seed`. The seed adds missing presentation keys and leaves existing settings and edited copy intact. It does not invent skills or projects. To hide seeded copy permanently, clear its Value instead of removing its stable-key row. Do not remove the `__initialized` seed marker.

Required cloud configuration: `DATABASE_URL` (direct Neon connection), `DATABASE_URL_POOLED` for runtime if supplied, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL` set to the real HTTPS deployment origin, `S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_ENDPOINT_URL_S3` for the S3-compatible endpoint and `AWS_REGION`. Legacy `S3_*` aliases remain supported. No credentials should be committed. Vercel requires persistent storage; it must not rely on local uploads.

The source for the new global is `src/cms/presentation.ts`; the audited copy defaults are in `src/lib/ui-defaults.json`. The migration is `20261025_151208`. Payload types and import map have been regenerated. Live inline preview is not configured; saves appear on subsequent public requests through cache invalidation.

## Why skill icons were missing

The existing Skill icon was already an upload relationship and the public collection query used depth 2. The homepage rendered only a plus badge and text, omitting the icon field. The card component now reads a populated icon and handles a failed/missing image. Public media access also prevents a draft media status from hiding an icon referenced by a published skill. The existing S3 adapter continues to serve persistent uploads through `/api/media/file/...`; no storage-provider migration was needed.

## Projects, About community, experience and certificates

Navigation now uses Projects, Certificates and About. The standalone Community page is removed; `/community` redirects to `/about#community`. Its old homepage block is removed. The Organizations and Contributions collections retain their existing records for use in About.

- **Community text, role, logo and link:** Site settings → Community on About. Select an Organization to reuse its logo, or upload a separate Logo. The Geek Room logo was imported from [its official Linktree profile](https://linktr.ee/geekroom) into Media, with attribution stored on the asset. Replace it in this same field at any time.
- **Experience on About:** add and publish records in Portfolio → Experience. The About timeline reads the same published records as the Experience page. It shows an editable empty state until records are published.
- **Certificates:** Portfolio → Certificates → Create New. Enter Title, Event name and Event involvement (Participated or Organized). Add a date, issuer/organization, short note, optional related event, preview image, image/PDF certificate and verification URL. Publish and keep Visible enabled. Display order controls ordering. Records appear in the homepage section and `/certificates`, where the involvement filters apply.
- **Headings and filter/button labels:** Website presentation → Page copy, Japanese accents and links. Look for keys beginning `certificates.` or `about.community.` / `about.experience.`.
- **Visibility:** Website presentation → Section visibility and order includes `certificates`, `certificates-page`, `about-community` and `about-experience`.

The seed applies the requested navigation/layout migration once, marked by `__about_certificates_v1`, and imports the logo once, marked by `__community_logo_v1`. Keep both marker rows. Future runs preserve dashboard edits. Tech cards keep their scroll reveal but have no hover lift, tilt or border change.

Payload manages the site content, uploaded media, links, labels, ordering and visibility. The Next.js/TypeScript/CSS source stays in the repository.


### Local admin login and save errors

`NEXT_PUBLIC_SERVER_URL` may keep the deployed URL for SEO and public links. In `next dev`, Payload now selects a loopback server URL when that setting points at a remote deployment, so authenticated local POST/PATCH/DELETE requests pass the CSRF check. Localhost, 127.0.0.1 and IPv6 loopback aliases are accepted on the configured local port only. Production continues to trust only its configured origin. Restart Next after changing server configuration; sign in again if an earlier rejected refresh cleared the session. Browser sessions are separate between the in-app browser and an external browser.
