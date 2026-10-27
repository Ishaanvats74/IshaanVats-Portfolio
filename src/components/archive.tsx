'use client'
import { useCopy } from '@/components/presentation'
import { Copy } from '@/components/presentation'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Reveal } from './experience'
import type { Entry } from '@/lib/content'
import { EmptyState, EventRow, ProjectCard, MediaImage } from './content'
import { CMSLink as Link } from '@/components/presentation'

export function Archive({ entries, kind }: { entries: (Entry & { entryType?: string })[]; kind: string }) {
 const copy=useCopy()

  const [category, setCategory] = useState('All')
  const [year, setYear] = useState('All')
  const [role, setRole] = useState('All')
  const categories = [...new Set(entries.map(e => e.category || (e.entryType === 'hackathons' ? 'Hackathon' : undefined)).filter(Boolean))] as string[]
  const years = [...new Set(entries.filter(e => e.startDate).map(e => new Date(e.startDate!).getFullYear().toString()))].sort().reverse()
  const roles = [...new Set(entries.map(e => e.role).filter(Boolean))] as string[]
  const filtered = useMemo(() => entries.filter(e => (category === 'All' || (e.category || (e.entryType === 'hackathons' ? 'Hackathon' : undefined)) === category) && (year === 'All' || (e.startDate && new Date(e.startDate).getFullYear().toString() === year)) && (role === 'All' || e.role === role)), [entries, category, year, role])
  if (!entries.length) return <EmptyState kind={kind === 'articles' ? 'Articles' : kind.charAt(0).toUpperCase() + kind.slice(1)} />
  return <><div className="archive-controls"><div className="filter-tabs" aria-label={copy('components.archive.tsx.prop.1')}>{['All', ...categories].map(c => <button key={c} aria-pressed={c === category} onClick={() => setCategory(c)}>{c === 'All' ? copy('archive.all') : c}</button>)}</div><div className="select-filters">{years.length > 0 && <label><Copy id="components.archive.tsx.1" /><select value={year} onChange={e => setYear(e.target.value)}><option value="All"><Copy id="components.archive.tsx.2" /></option>{years.map(y => <option key={y}>{y}</option>)}</select></label>}{roles.length > 0 && <label><Copy id="components.archive.tsx.3" /><select value={role} onChange={e => setRole(e.target.value)}><option value="All"><Copy id="components.archive.tsx.4" /></option>{roles.map(r => <option key={r}>{r}</option>)}</select></label>}</div></div><p className="mono result-count" aria-live="polite">{filtered.length} {copy(filtered.length === 1 ? 'archive.entry' : 'archive.entries')}</p>
    <div className={kind === 'projects' || kind === 'articles' ? 'project-grid' : 'event-list'}>{filtered.map((entry, i) => <Reveal key={`${entry.entryType || kind}-${entry.id}`} delay={Math.min(i,3)*.06}>{kind === 'projects' ? <ProjectCard entry={entry} index={i} /> : kind === 'articles' ? <article className="article-card"><Link href={`/writing/${entry.slug}`}><MediaImage media={entry.coverImage} /><span className="eyebrow">{entry.tags?.map(t => t.name).join(' / ')}</span><h2>{entry.title} <ArrowUpRight size={20} aria-hidden="true" /></h2><p>{entry.excerpt}</p></Link></article> : <EventRow entry={entry} index={i} type={entry.entryType || kind} />}</Reveal>)}</div>{!filtered.length && <p className="empty-state"><Copy id="components.archive.tsx.5" /></p>}</>
}
