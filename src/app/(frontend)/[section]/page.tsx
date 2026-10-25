import { Visible } from '@/components/presentation'
import { getPresentation } from '@/lib/data'
import { copyReader } from '@/lib/presentation'
import { CMSAnchor } from '@/components/presentation'
import { Copy } from '@/components/presentation'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CMSLink as Link } from '@/components/presentation'
import { ArrowUpRight, ArrowDown, Users, Asterisk } from 'lucide-react'
import { getEntries, getSettings } from '@/lib/data'
import { Archive } from '@/components/archive'
import { EmptyState, ExternalLink, MediaImage, PageHeading, Related, SectionLabel } from '@/components/content'
import { dateLabel } from '@/lib/utils'
import { safeURL } from '@/lib/links'

const sections: Record<string, { eyebrow: string; title: string; description: string; collection?: string }> = {
  projects: { eyebrow: "route.projects.eyebrow", title: "route.projects.title", description: "route.projects.description", collection: 'projects' },
  community: { eyebrow: "route.community.eyebrow", title: "route.community.title", description: "route.community.description" },
  activities: { eyebrow: "route.activities.eyebrow", title: "route.activities.title", description: "route.activities.description" },
  hackathons: { eyebrow: "route.hackathons.eyebrow", title: "route.hackathons.title", description: "route.hackathons.description", collection: 'hackathons' },
  events: { eyebrow: "route.events.eyebrow", title: "route.events.title", description: "route.events.description", collection: 'events' },
  experience: { eyebrow: "route.experience.eyebrow", title: "route.experience.title", description: "route.experience.description", collection: 'experience' },
  writing: { eyebrow: "route.writing.eyebrow", title: "route.writing.title", description: "route.writing.description", collection: 'articles' },
  about: { eyebrow: "route.about.eyebrow", title: "route.about.title", description: "route.about.description" },
  resume: { eyebrow: "route.resume.eyebrow", title: "route.resume.title", description: "route.resume.description" },
}
export const dynamicParams = false
export function generateStaticParams() { return Object.keys(sections).map(section => ({ section })) }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> { const data = sections[(await params).section]; return { title: copyReader(await getPresentation())(data?.title || ''), description: copyReader(await getPresentation())(data?.description || '') } }
export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const copy = copyReader(await getPresentation())
  const { section } = await params
  const data = sections[section]
  if (!data) notFound()
  const settings = await getSettings()
  const entries = data.collection ? await getEntries(data.collection) : []
  return <Visible name={`${section}-page`}><div id="top" className="container inner-page"><PageHeading eyebrow={copy(data.eyebrow)} title={copy(data.title)} description={copy(data.description)} />
    {data.collection && !['experience'].includes(section) && <Archive kind={data.collection} entries={entries} />}
    {section === 'activities' && <Archive kind="activities" entries={[...(await getEntries('events')).map(e => ({ ...e, entryType: 'events' })), ...(await getEntries('hackathons')).map(e => ({ ...e, entryType: 'hackathons' }))].sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''))} />}
    {section === 'about' && <><div className="about-layout"><div className="about-monogram" aria-hidden="true"><Copy id="app.frontend.section.page.tsx.1" /><span><Asterisk size={44} aria-hidden="true" /></span></div><div><SectionLabel number="01"><Copy id="app.frontend.section.page.tsx.2" /></SectionLabel><h2>{settings.headline}</h2><p>{settings.biography}</p><div className="education-note">{settings.education}</div>{settings.socialLinks?.map(link => <ExternalLink key={link.url} href={link.url} className="text-link">{link.label}</ExternalLink>)}</div></div><div className="pillars">{settings.homepage?.pillars?.map((p, i) => <div className="pillar" key={p.title}><span className="mono">0{i + 1}</span><h3>{p.title}</h3><p>{p.description}</p></div>)}</div><div className="about-next"><h2><Copy id="app.frontend.section.page.tsx.3" /></h2><p><Copy id="app.frontend.section.page.tsx.4" /></p><Link className="button" href="/projects"><Copy id="app.frontend.section.page.tsx.5" /><ArrowUpRight size={17} /></Link></div></>}
    {section === 'community' && <><div className="community-intro"><span className="community-mark blue" aria-hidden="true"><Users size={100} strokeWidth={1} /></span><div><h2><Copy id="app.frontend.section.page.tsx.6" /><br /><Copy id="app.frontend.section.page.tsx.7" /></h2><p>{settings.homepage?.communityIntro}</p></div></div>{(await getEntries('contributions')).map(entry => <article className="contribution" key={entry.id} data-reveal><span className="eyebrow">{entry.organization?.title} / {entry.role}</span><h2>{entry.title}</h2><p>{entry.description}</p><ul>{entry.responsibilities?.map(r => <li key={r.item}>{r.item}</li>)}</ul>{entry.verifiedMetrics?.length ? <div className="metrics">{entry.verifiedMetrics.map(m => <div key={m.label}><strong>{m.value}</strong><span>{m.label}</span>{m.sourceURL && <ExternalLink href={m.sourceURL}><Copy id="app.frontend.section.page.tsx.8" /></ExternalLink>}</div>)}</div> : null}<Related title={copy('app.frontend.section.page.tsx.prop.2')} type="events" entries={entry.relatedEvents} /><Related title={copy('app.frontend.section.page.tsx.prop.3')} type="projects" entries={entry.relatedProjects} /></article>)}<div className="link-group"><Link className="button" href="/events"><Copy id="app.frontend.section.page.tsx.9" /><ArrowUpRight size={17} /></Link><Link className="button outline" href="/hackathons"><Copy id="app.frontend.section.page.tsx.10" /><ArrowUpRight size={17} /></Link><Link className="button outline" href="/activities"><Copy id="app.frontend.section.page.tsx.11" /><ArrowUpRight size={17} /></Link></div></>}
    {section === 'experience' && (entries.length ? <div className="timeline">{entries.sort((a, b) => (b.startDate || '').localeCompare(a.startDate || '')).map((entry, i) => <article className="timeline-item" key={entry.id} tabIndex={0} data-reveal><div className="timeline-date"><span className="mono">{String(i + 1).padStart(2, '0')}</span>{dateLabel(entry.startDate)} {entry.startDate && '—'} {entry.startDate && (dateLabel(entry.endDate) || copy('present'))}</div><div><MediaImage media={entry.logo || entry.organization?.logo} className="organization-logo" /><span className="eyebrow">{entry.organization?.title}</span><h2>{entry.role || entry.title}</h2><p>{entry.description}</p><ul>{entry.responsibilities?.map(r => <li key={r.item}>{r.item}</li>)}</ul>{entry.achievements?.length ? <ul>{entry.achievements.map(r => <li key={r.item}>{r.item}</li>)}</ul> : null}<Related title={copy('app.frontend.section.page.tsx.prop.4')} type="projects" entries={entry.relatedProjects} /><Related title={copy('app.frontend.section.page.tsx.prop.5')} type="events" entries={entry.relatedEvents} /></div></article>)}</div> : <EmptyState kind={copy('app.frontend.section.page.tsx.prop.6')} />)}
    {section === 'resume' && await (async () => {
      const resume = (await getEntries('resume')).filter(r => r.visible && safeURL(r.pdf?.url ? new URL(r.pdf.url, process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').href : '') && r.pdf?.mimeType === 'application/pdf').sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''))[0]
      return resume ? <section><p className="mono"><Copy id="app.frontend.section.page.tsx.12" /> {dateLabel(resume.lastUpdated)}</p><div className="link-group"><CMSAnchor className="button" href={resume.pdf!.url} download><Copy id="app.frontend.section.page.tsx.13" /> <ArrowDown size={16} /></CMSAnchor><CMSAnchor className="button outline" href={resume.pdf!.url} target="_blank" rel="noopener noreferrer"><Copy id="app.frontend.section.page.tsx.14" /> <ArrowUpRight size={16} /></CMSAnchor></div><iframe title={`${settings.name} resume PDF`} src={resume.pdf!.url} className="resume-frame" /><p className="quiet-copy"><Copy id="app.frontend.section.page.tsx.15" /></p></section> : <EmptyState kind={copy('app.frontend.section.page.tsx.prop.7')} />
    })()}
  </div></Visible>
}
