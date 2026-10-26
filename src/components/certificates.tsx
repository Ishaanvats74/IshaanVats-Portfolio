'use client'
import { useState } from 'react'
import { Award, ArrowUpRight, FileText } from 'lucide-react'
import type { Entry } from '@/lib/content'
import { safeURL } from '@/lib/links'
import { mediaSource } from '@/lib/media'
import { dateLabel } from '@/lib/utils'
import { CMSAnchor, useCopy } from './presentation'
import { MediaImage } from './content'
import { Reveal } from './experience'

type Filter = 'all' | 'participated' | 'organized'
export function CertificateGrid({entries,filters=true,limit}:{entries:Entry[];filters?:boolean;limit?:number}) {
 const [filter,setFilter]=useState<Filter>('all')
 const copy=useCopy()
 const shown=entries.filter(entry=>entry.visible!==false && (filter==='all'||entry.activityType===filter)).slice(0,limit)
 return <>
  {filters&&<div className="certificate-filters filter-tabs" aria-label={copy('certificates.title')}>
   {(['all','participated','organized'] as const).map(value=><button type="button" key={value} aria-pressed={filter===value} onClick={()=>setFilter(value)}>{copy(`certificates.${value}`)}</button>)}
  </div>}
  {shown.length ? <div className="certificate-grid">{shown.map((entry,index)=>{
   const file=entry.certificateFile
   const preview=entry.previewImage || (file?.mimeType?.startsWith('image/')?file:undefined)
   const fileURL=file?.url?mediaSource(file.url,process.env.NEXT_PUBLIC_SERVER_URL||'http://localhost:3000'):undefined
   const verify=safeURL(entry.credentialURL)
   return <Reveal key={entry.id} delay={Math.min(index,5)*.09}><article className="certificate-card">
    {preview?.url ? <MediaImage media={preview} className="certificate-preview" sizes="(max-width:700px) calc(100vw - 36px), (max-width:1100px) 45vw, 380px"/> : <div className="certificate-placeholder" aria-hidden="true"><Award size={52} strokeWidth={1}/></div>}
    <div className="certificate-body"><div className="certificate-meta"><span>{copy(`certificates.${entry.activityType || 'participated'}`)}</span>{entry.date&&<time dateTime={entry.date}>{dateLabel(entry.date)}</time>}</div>
     <h2>{entry.title}</h2><p className="certificate-event">{entry.eventName || entry.event?.title}</p>
     {(entry.issuerName || entry.organization?.title)&&<p>{entry.issuerName || entry.organization?.title}</p>}
     {entry.description&&<p>{entry.description}</p>}
     <div className="link-group">{fileURL&&<CMSAnchor className="text-link" href={fileURL} target="_blank" rel="noopener noreferrer">{copy('certificates.open')}<FileText size={15}/></CMSAnchor>}{verify&&<CMSAnchor className="text-link" href={verify} target="_blank" rel="noopener noreferrer">{copy('certificates.verify')}<ArrowUpRight size={15}/></CMSAnchor>}</div>
    </div>
   </article></Reveal>
  })}</div> : <p className="certificate-empty">{copy('certificates.empty')}</p>}
 </>
}
