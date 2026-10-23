import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getEntries, getSettings } from '@/lib/data'
import { Archive } from '@/components/archive'
import { EmptyState, ExternalLink, MediaImage, PageHeading, Related, SectionLabel } from '@/components/content'
import { dateLabel } from '@/lib/utils'
import { safeURL } from '@/lib/links'

const sections: Record<string, { eyebrow: string; title: string; description: string; collection?: string }> = {
  projects: { eyebrow: 'THE WORK / AN EVOLVING COLLECTION', title: 'Built with intention', description: 'Applications, experiments, and systems. A closer look at the thinking behind the code.', collection: 'projects' },
  community: { eyebrow: 'BEYOND THE CODE', title: 'People & possibilities', description: 'The conversations, collaborations, and communities that make building worthwhile.' },
  activities: { eyebrow: 'THE FIELD NOTES', title: 'Out in the world', description: 'Hackathons, events, workshops, and the experiences in between.' },
  hackathons: { eyebrow: 'BUILD / LEARN / REPEAT', title: 'The hackathon notebook', description: 'A record of participation, teamwork, experiments, and lessons.', collection: 'hackathons' },
  events: { eyebrow: 'GATHERINGS & SHARED IDEAS', title: 'Making things happen', description: 'Events organized, supported, and attended. Every contribution has its own story.', collection: 'events' },
  experience: { eyebrow: 'THE JOURNEY SO FAR', title: 'Learning by doing', description: 'Professional and organizational chapters, with the work behind each role.', collection: 'experience' },
  writing: { eyebrow: 'THINKING OUT LOUD', title: 'Notes from the process', description: 'Technical explorations, project breakdowns, and things learned along the way.', collection: 'articles' },
  about: { eyebrow: 'A LITTLE CONTEXT', title: 'Curiosity is the thread', description: 'Engineering, AI, and community. Connected by a desire to understand, build, and contribute.' },
  resume: { eyebrow: 'THE SHORT VERSION', title: 'Résumé', description: 'A current snapshot of my background and experience.' },
}
export const dynamicParams = false
export function generateStaticParams() { return Object.keys(sections).map(section => ({ section })) }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> { const data = sections[(await params).section]; return { title: data?.title, description: data?.description } }
export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  const data = sections[section]
  if (!data) notFound()
  const settings = await getSettings()
  const entries = data.collection ? await getEntries(data.collection) : []
  return <div id="top" className="container inner-page"><PageHeading {...data} />
    {data.collection && !['experience'].includes(section) && <Archive kind={data.collection} entries={entries} />}
    {section === 'activities' && <Archive kind="activities" entries={[...(await getEntries('events')).map(e => ({ ...e, entryType: 'events' })), ...(await getEntries('hackathons')).map(e => ({ ...e, entryType: 'hackathons' }))].sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''))} />}
    {section === 'about' && <><div className="about-layout"><div className="about-monogram" aria-hidden="true">iv<span>✳</span></div><div><SectionLabel number="01">HELLO, I’M ISHAAN</SectionLabel><h2>{settings.headline}</h2><p>{settings.biography}</p><div className="education-note">{settings.education}</div>{settings.socialLinks?.map(link => <ExternalLink key={link.url} href={link.url} className="text-link">{link.label}</ExternalLink>)}</div></div><div className="pillars">{settings.homepage?.pillars?.map((p, i) => <div className="pillar" key={p.title}><span className="mono">0{i + 1}</span><h3>{p.title}</h3><p>{p.description}</p></div>)}</div><div className="about-next"><h2>Where curiosity goes next.</h2><p>Explore the work, the community, and the experiences behind it.</p><Link className="button" href="/projects">Explore projects<ArrowUpRight size={17} /></Link></div></>}
    {section === 'community' && <><div className="community-intro"><span className="community-mark blue" aria-hidden="true">✳</span><div><h2>Good things start<br />with people.</h2><p>{settings.homepage?.communityIntro}</p></div></div>{(await getEntries('contributions')).map(entry => <article className="contribution" key={entry.id} data-reveal><span className="eyebrow">{entry.organization?.title} / {entry.role}</span><h2>{entry.title}</h2><p>{entry.description}</p><ul>{entry.responsibilities?.map(r => <li key={r.item}>{r.item}</li>)}</ul>{entry.verifiedMetrics?.length ? <div className="metrics">{entry.verifiedMetrics.map(m => <div key={m.label}><strong>{m.value}</strong><span>{m.label}</span>{m.sourceURL && <ExternalLink href={m.sourceURL}>Source</ExternalLink>}</div>)}</div> : null}<Related title="Related events" type="events" entries={entry.relatedEvents} /><Related title="Related work" type="projects" entries={entry.relatedProjects} /></article>)}<div className="link-group"><Link className="button" href="/events">Events<ArrowUpRight size={17} /></Link><Link className="button outline" href="/hackathons">Hackathons<ArrowUpRight size={17} /></Link><Link className="button outline" href="/activities">All activities<ArrowUpRight size={17} /></Link></div></>}
    {section === 'experience' && (entries.length ? <div className="timeline">{entries.sort((a, b) => (b.startDate || '').localeCompare(a.startDate || '')).map((entry, i) => <article className="timeline-item" key={entry.id} tabIndex={0} data-reveal><div className="timeline-date"><span className="mono">{String(i + 1).padStart(2, '0')}</span>{dateLabel(entry.startDate)} {entry.startDate && '—'} {entry.startDate && (dateLabel(entry.endDate) || 'Present')}</div><div><MediaImage media={entry.logo || entry.organization?.logo} className="organization-logo" /><span className="eyebrow">{entry.organization?.title}</span><h2>{entry.role || entry.title}</h2><p>{entry.description}</p><ul>{entry.responsibilities?.map(r => <li key={r.item}>{r.item}</li>)}</ul>{entry.achievements?.length ? <ul>{entry.achievements.map(r => <li key={r.item}>{r.item}</li>)}</ul> : null}<Related title="Related work" type="projects" entries={entry.relatedProjects} /><Related title="Related events" type="events" entries={entry.relatedEvents} /></div></article>)}</div> : <EmptyState kind="Experience entries" />)}
    {section === 'resume' && await (async () => {
      const resume = (await getEntries('resume')).filter(r => r.visible && safeURL(r.pdf?.url ? new URL(r.pdf.url, process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').href : '') && r.pdf?.mimeType === 'application/pdf').sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || ''))[0]
      return resume ? <section><p className="mono">UPDATED {dateLabel(resume.lastUpdated)}</p><div className="link-group"><a className="button" href={resume.pdf!.url} download>Download PDF ↓</a><a className="button outline" href={resume.pdf!.url} target="_blank" rel="noopener noreferrer">Open in new tab ↗</a></div><iframe title={`${settings.name} resume PDF`} src={resume.pdf!.url} className="resume-frame" /><p className="quiet-copy">If the embedded preview is unavailable, open the PDF in a new tab.</p></section> : <EmptyState kind="The resume PDF" />
    })()}
  </div>
}
