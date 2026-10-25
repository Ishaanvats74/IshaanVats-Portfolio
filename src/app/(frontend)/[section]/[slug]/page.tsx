import { getPresentation } from '@/lib/data'
import { copyReader } from '@/lib/presentation'
import { Copy } from '@/components/presentation'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CMSLink as Link } from '@/components/presentation'
import { getEntry, getEntries } from '@/lib/data'
import { ExternalLink, Gallery, MediaImage, ProjectLinks, Related, RichContent } from '@/components/content'
import { dateLabel } from '@/lib/utils'

const collectionFor: Record<string, string> = { projects: 'projects', events: 'events', hackathons: 'hackathons', writing: 'articles' }
export async function generateStaticParams() {
  return (await Promise.all(Object.entries(collectionFor).map(async ([section, collection]) => (await getEntries(collection)).filter(e => e.slug).map(e => ({ section, slug: e.slug! }))))).flat()
}
export async function generateMetadata({ params }: { params: Promise<{ section: string; slug: string }> }): Promise<Metadata> {
  const { section, slug } = await params
  const entry = collectionFor[section] ? await getEntry(collectionFor[section], slug) : undefined
  if (!entry) return { title: copyReader(await getPresentation())('meta.notFound') }
  return { title: entry.seo?.title || entry.title, description: entry.seo?.description || entry.tagline || entry.excerpt || entry.description, openGraph: { title: entry.title, images: (entry.seo?.image || entry.coverImage)?.url ? [(entry.seo?.image || entry.coverImage)!.url!] : [] } }
}
export default async function Detail({ params }: { params: Promise<{ section: string; slug: string }> }) {
  const copy = copyReader(await getPresentation())
  const { section, slug } = await params
  if (!collectionFor[section]) notFound()
  const entry = await getEntry(collectionFor[section], slug)
  if (!entry) notFound()
  return <article id="top" className="container inner-page detail-page"><Link className="back-link mono" href={`/${section}`}><Copy id="app.frontend.section.slug.page.tsx.1" /> {section.toUpperCase()}</Link>
    <header className="detail-heading"><div className="eyebrow">{entry.category || section} {entry.startDate && `/ ${dateLabel(entry.startDate)}`}</div><h1>{entry.title}<span className="blue">.</span></h1>{(entry.tagline || entry.excerpt) && <p>{entry.tagline || entry.excerpt}</p>}<ProjectLinks entry={entry} /><ExternalLink href={entry.eventURL} className="text-link"><Copy id="app.frontend.section.slug.page.tsx.2" /></ExternalLink></header>
    <MediaImage media={entry.coverImage || entry.poster} priority />
    <div className="detail-layout"><aside><dl>{[
      [copy('detail.role'), entry.caseStudy?.role || entry.role], [copy('detail.organization'), entry.organization?.title || entry.organizer?.title], [copy('detail.location'), entry.location], [copy('detail.track'), entry.track], [copy('detail.status'), entry.status],
      [copy('detail.dates'), entry.startDate ? `${dateLabel(entry.startDate)}${entry.endDate ? ` — ${dateLabel(entry.endDate)}` : ''}` : undefined],
    ].filter(([, value]) => Boolean(value)).map(([label, value]) => <div key={String(label)}><dt>{String(label)}</dt><dd>{String(value)}</dd></div>)}</dl>{entry.technologies?.length ? <><h3 className="eyebrow"><Copy id="app.frontend.section.slug.page.tsx.3" /></h3><div className="tags">{entry.technologies.map(t => <span key={t.name}>{t.name}</span>)}</div></> : null}{entry.team?.length ? <><h3 className="eyebrow"><Copy id="app.frontend.section.slug.page.tsx.4" /></h3><ul>{entry.team.map(t => <li key={t.name}>{t.name}{t.role ? ` / ${t.role}` : ''}</li>)}</ul></> : null}</aside>
      <div>{entry.description && <section><h2><Copy id="app.frontend.section.slug.page.tsx.5" /></h2><p>{entry.description}</p></section>}{Object.entries(entry.caseStudy || {}).filter(([key, value]) => key !== 'role' && value && typeof value === 'object').map(([key, value]) => <section key={key}><h2>{copy(`detail.${key}`)}</h2><RichContent value={value} /></section>)}<RichContent value={entry.content} />
        {entry.responsibilities?.length ? <section><h2><Copy id="app.frontend.section.slug.page.tsx.6" /></h2><ul>{entry.responsibilities.map(r => <li key={r.item}>{r.item}</li>)}</ul></section> : null}{entry.verifiedAchievement && <section><h2><Copy id="app.frontend.section.slug.page.tsx.7" /></h2><p>{entry.verifiedAchievement}</p></section>}
      </div></div><Gallery entry={entry} /><Related title={copy('app.frontend.section.slug.page.tsx.prop.1')} entries={entry.relatedProjects} type="projects" /><Related title={copy('app.frontend.section.slug.page.tsx.prop.2')} entries={entry.relatedEvents} type="events" /><Related title={copy('app.frontend.section.slug.page.tsx.prop.3')} entries={entry.relatedHackathons} type="hackathons" />
  </article>
}
