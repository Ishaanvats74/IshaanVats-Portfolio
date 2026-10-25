'use client'
import { useState } from 'react'
import Image from 'next/image'
import { mediaSource, skillIcon } from '@/lib/media'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { Entry } from '@/lib/content'
import { safeURL } from '@/lib/links'
import { useCopy } from './presentation'
export function SkillCard({entry,index=0}:{entry:Entry;index?:number}) {
 const {media,alt,initial}=skillIcon(entry)
 const src=media?.url ? mediaSource(media.url, process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000') : undefined
 const [failed,setFailed]=useState<string>()
 const reduced=useReducedMotion()
 const copy=useCopy()
 const link=safeURL(entry.website)
 return <motion.article className="skill-sticker" initial={false}
  whileInView={reduced ? {opacity:[0.6,1]} : {opacity:[0,1],y:[28,0],scale:[0.97,1]}}
  viewport={{once:true,amount:0.2}} transition={{duration:0.65,delay:Math.min(index,5)*0.09}}
  whileHover={reduced?undefined:{y:-4,rotate: index%2?2:-2}}>
  <div className="skill-icon">{src&&failed!==src ? <Image src={src} alt={alt} width={48} height={48} sizes="48px" onError={()=>setFailed(src)} unoptimized={media?.mimeType==='image/svg+xml'} /> : <span aria-hidden="true">{initial}</span>}</div>
  <h3>{entry.title}</h3><span className="skill-category">{entry.category}</span>
  <span className="skill-power" aria-hidden="true"><i/><i/><i/><i/><i/></span>
  {link&&<a className="text-link" href={link} target="_blank" rel="noopener noreferrer">{copy('skills.website')}<ArrowUpRight size={14}/></a>}
 </motion.article>
}
