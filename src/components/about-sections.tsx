import type { Entry, Settings } from '@/lib/content'
import { copyReader, type Presentation } from '@/lib/presentation'
import { dateLabel } from '@/lib/utils'
import { ExternalLink, MediaImage } from './content'
import { Visible } from './presentation'
import { Reveal } from './experience'

export function ExperienceTimeline({entries,present}:{entries:Entry[];present:string}) {
 return <div className="timeline">{[...entries].sort((a,b)=>(b.startDate||'').localeCompare(a.startDate||'')).map((entry,index)=><Reveal key={entry.id} delay={Math.min(index,5)*.08}>
  <article className="timeline-item"><div className="timeline-date">{entry.startDate&&<time dateTime={entry.startDate}>{dateLabel(entry.startDate)}</time>}{entry.startDate&&` — ${entry.endDate?dateLabel(entry.endDate):present}`}</div>
   <div><MediaImage media={entry.logo || entry.organization?.logo} className="organization-logo" fit="contain"/><span className="eyebrow">{entry.organization?.title}</span><h2>{entry.role || entry.title}</h2>{entry.title!==entry.role&&<p>{entry.title}</p>}{entry.description&&<p>{entry.description}</p>}
    {entry.responsibilities?.length ? <ul>{entry.responsibilities.map((row,i)=><li key={i}>{row.item}</li>)}</ul>:null}
    {entry.achievements?.length ? <ul>{entry.achievements.map((row,i)=><li key={i}>{row.item}</li>)}</ul>:null}
   </div>
  </article>
 </Reveal>)}</div>
}
export function AboutSections({settings,presentation,experience,contributions}:{settings:Settings;presentation:Presentation;experience:Entry[];contributions:Entry[]}) {
 const copy=copyReader(presentation)
 const community=settings.community
 const organization=community?.organization
 const name=community?.name || organization?.title
 const logo=community?.logo || organization?.logo
 return <>
  {community?.enabled!==false&&name&&<Visible name="about-community"><section id="community" aria-labelledby="community-heading" className="about-community about-chapter">
   <Reveal><div className="episode-label"><h2 id="community-heading">{copy('about.community.title')}</h2></div>
    <div className="about-community-card">{logo?.url ? <MediaImage media={{...logo,alt:logo.alt || name}} className="community-logo" sizes="96px" fit="contain"/> : <div className="community-logo-mark" aria-hidden="true">{name.split(' ').map(word=>word[0]).slice(0,2).join('')}</div>}
     <div><h3>{name}</h3>{community?.role&&<p className="community-role">{community.role}</p>}{community?.description&&<p>{community.description}</p>}
      {presentation.communityTags.length>0&&<ul className="community-badges">{presentation.communityTags.map((tag,i)=><li key={i}>{tag.label}</li>)}</ul>}
      <ExternalLink href={community?.website || organization?.website} className="text-link">{copy('about.community.website')}</ExternalLink>
     </div>
    </div>
    {contributions.length>0&&<div className="about-contributions">{contributions.map(entry=><article key={entry.id}><span className="eyebrow">{entry.role}</span><h3>{entry.title}</h3>{entry.description&&<p>{entry.description}</p>}</article>)}</div>}
   </Reveal>
  </section></Visible>}
  <Visible name="about-experience"><section id="experience" aria-labelledby="experience-heading" className="about-chapter"><Reveal><div className="episode-label"><h2 id="experience-heading">{copy('about.experience.title')}</h2></div><p>{copy('about.experience.description')}</p></Reveal>{experience.length ? <ExperienceTimeline entries={experience} present={copy('present')}/> : <p>{copy('about.experience.empty')}</p>}</section></Visible>
 </>
}
