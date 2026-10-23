import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Entry, Media } from '@/lib/content'
import { projectLinks, safeURL } from '@/lib/links'
import { dateLabel } from '@/lib/utils'

export function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) { return <div className="section-label"><span>({number})</span>{children}<ArrowDown size={14} /></div> }
export function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) { return <div className="page-heading"><div className="eyebrow">{eyebrow}</div><h1>{title}<span className="blue">.</span></h1>{description && <p>{description}</p>}</div> }
export function MediaImage({ media, priority = false, className = '' }: { media?: Media; priority?: boolean; className?: string }) {
  if (!media?.url) return null
  const origin = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const src = media.url.startsWith(`${origin}/`) ? media.url.slice(origin.length) : media.url
  return <div className={`media-image ${className}`}><Image src={src} alt={media.alt || ''} fill sizes="(max-width: 700px) 100vw, 55vw" priority={priority} style={{ objectFit: 'cover' }} /></div>
}
export function ExternalLink({ href, children, className }: { href?: string; children: React.ReactNode; className?: string }) {
  const url = safeURL(href)
  return url ? <a href={url} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={16} /></a> : null
}
export function ProjectLinks({ entry }: { entry: Entry }) { return <div className="link-group">{projectLinks(entry).map(link => <ExternalLink key={link.href} href={link.href} className="button">{link.label}</ExternalLink>)}</div> }
export function EmptyState({ kind }: { kind: string }) { return <div className="empty-state"><span className="empty-symbol">[ ↗ ]</span><div><h3>A little more to come.</h3><p>{kind} will appear here as they’re published.</p></div><span className="mono">STAY CURIOUS</span></div> }
export function ProjectCard({ entry, index }: { entry: Entry; index: number }) { return <article className="project-card" data-reveal>
  <Link href={`/projects/${entry.slug}`} data-cursor="VIEW PROJECT" className="project-image-link">
    {entry.coverImage?.url ? <MediaImage media={entry.coverImage} /> : <div className="project-fallback"><span>{String(index + 1).padStart(2, '0')}</span><MoveUpRight size={70} strokeWidth={1} /></div>}
    <span className="image-arrow"><ArrowUpRight size={22} /></span>
  </Link>
  <div className="card-meta"><span>{entry.category}</span><span>{entry.status}</span></div>
  <Link href={`/projects/${entry.slug}`} className="card-title"><h3>{entry.title}</h3><ArrowUpRight /></Link>
  {entry.tagline && <p>{entry.tagline}</p>}{entry.technologies?.length ? <div className="tags">{entry.technologies.map(t => <span key={t.name}>{t.name}</span>)}</div> : null}<ProjectLinks entry={entry} />
  </article> }
export function EventRow({ entry, type = 'events', index }: { entry: Entry; type?: string; index: number }) { return <Link href={`/${type}/${entry.slug}`} className="event-row" data-cursor="VIEW EVENT" data-reveal>
  <span className="event-index">{String(index + 1).padStart(2, '0')}</span><div><span className="eyebrow">{entry.category || (type === 'hackathons' ? 'Hackathon' : 'Event')} / {dateLabel(entry.startDate)}</span><h3>{entry.title}</h3></div><span className="role-tag">{entry.role}</span><ArrowUpRight />
  {entry.coverImage?.url && <div className="event-preview"><MediaImage media={entry.coverImage} /></div>}
  </Link> }
export function RichContent({ value }: { value?: unknown }) { return value && typeof value === 'object' && 'root' in value ? <div className="prose"><RichText data={value as SerializedEditorState} /></div> : null }
export function Gallery({ entry }: { entry: Entry }) { return entry.gallery?.length ? <div className="gallery">{entry.gallery.map((item, i) => <figure key={i}><MediaImage media={item.image} />{item.caption && <figcaption>{item.caption}</figcaption>}</figure>)}</div> : null }
export function Related({ entries, type, title }: { entries?: Entry[]; type: string; title: string }) { return entries?.length ? <section className="related"><h2>{title}</h2>{entries.filter(e => e?.slug).map(e => <Link key={e.id} href={`/${type}/${e.slug}`}>{e.title}<ArrowUpRight size={18} /></Link>)}</section> : null }
