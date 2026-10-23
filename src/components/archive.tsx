'use client'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { Entry } from '@/lib/content'
import { EmptyState, EventRow, ProjectCard, MediaImage } from './content'
import Link from 'next/link'

export function Archive({ entries, kind }: { entries: (Entry & { entryType?: string })[]; kind: string }) {
  const [category, setCategory] = useState('All')
  const [year, setYear] = useState('All')
  const [role, setRole] = useState('All')
  const reduced = useReducedMotion()
  const categories = [...new Set(entries.map(e => e.category || (e.entryType === 'hackathons' ? 'Hackathon' : undefined)).filter(Boolean))] as string[]
  const years = [...new Set(entries.filter(e => e.startDate).map(e => new Date(e.startDate!).getFullYear().toString()))].sort().reverse()
  const roles = [...new Set(entries.map(e => e.role).filter(Boolean))] as string[]
  const filtered = useMemo(() => entries.filter(e => (category === 'All' || (e.category || (e.entryType === 'hackathons' ? 'Hackathon' : undefined)) === category) && (year === 'All' || (e.startDate && new Date(e.startDate).getFullYear().toString() === year)) && (role === 'All' || e.role === role)), [entries, category, year, role])
  if (!entries.length) return <EmptyState kind={kind === 'articles' ? 'Articles' : kind.charAt(0).toUpperCase() + kind.slice(1)} />
  return <><div className="archive-controls"><div className="filter-tabs" aria-label="Category filters">{['All', ...categories].map(c => <button key={c} aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="select-filters">{years.length > 0 && <label>Year<select value={year} onChange={e => setYear(e.target.value)}><option value="All">All years</option>{years.map(y => <option key={y}>{y}</option>)}</select></label>}{roles.length > 0 && <label>Role<select value={role} onChange={e => setRole(e.target.value)}><option value="All">All roles</option>{roles.map(r => <option key={r}>{r}</option>)}</select></label>}</div></div><p className="mono result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'ENTRY' : 'ENTRIES'}</p>
    <div className={kind === 'projects' || kind === 'articles' ? 'project-grid' : 'event-list'}><AnimatePresence mode="popLayout">{filtered.map((entry, i) => <motion.div key={`${entry.entryType || kind}-${entry.id}`} layout={!reduced} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }}>{kind === 'projects' ? <ProjectCard entry={entry} index={i} /> : kind === 'articles' ? <article className="article-card"><Link href={`/writing/${entry.slug}`}><MediaImage media={entry.coverImage} /><span className="eyebrow">{entry.tags?.map(t => t.name).join(' / ')}</span><h2>{entry.title} ↗</h2><p>{entry.excerpt}</p></Link></article> : <EventRow entry={entry} index={i} type={entry.entryType || kind} />}</motion.div>)}</AnimatePresence></div>{!filtered.length && <p className="empty-state">No entries match these filters. Try another selection.</p>}</>
}
