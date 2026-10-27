'use client'
import { useState } from 'react'
import Image from 'next/image'
import { mediaSource, skillIcon } from '@/lib/media'
import { ArrowUpRight } from 'lucide-react'
import type { Entry } from '@/lib/content'
import { safeURL } from '@/lib/links'
import { useCopy } from './presentation'
export function SkillCard({entry}:{entry:Entry;index?:number}) {
 const {media,alt,initial}=skillIcon(entry)
 const src=media?.url ? mediaSource(media.url, process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000') : undefined
 const [failed,setFailed]=useState<string>()
 const copy=useCopy()
 const link=safeURL(entry.website)
 return <article className="skill-sticker">
  <div className="skill-icon">{src&&failed!==src ? <Image src={src} alt={alt} width={32} height={32} sizes="32px" onError={()=>setFailed(src)} unoptimized={media?.mimeType==='image/svg+xml'} /> : <span aria-hidden="true">{initial}</span>}</div>
  <h3>{entry.title}</h3><span className="skill-category">{entry.category}</span>
  <span className="skill-power" aria-hidden="true"><i/><i/><i/><i/><i/></span>
  {link&&<a className="skill-website" href={link} target="_blank" rel="noopener noreferrer" aria-label={`${copy('skills.website')}: ${entry.title}`}><ArrowUpRight size={15} aria-hidden="true"/></a>}
 </article>
}
