import { copyReader } from '@/lib/presentation'
import { CMSAnchor } from '@/components/presentation'
import { HomeSections } from '@/components/presentation'
import { SkillCard } from '@/components/skill-card'
import { Copy } from '@/components/presentation'
import { CMSLink as Link } from '@/components/presentation'
import { ArrowDown, ArrowUpRight, Code2, GraduationCap, Users, MapPin } from 'lucide-react'
import { getEntries, getSettings, getPresentation } from '@/lib/data'
import { AnimeBackground } from '@/components/anime-background'
import { AnimeTitle } from '@/components/anime-title'
import { OpeningSequence } from '@/components/opening-sequence'
import {
  Approach,
  MagneticLink,
  Reveal,
} from '@/components/experience'
import {
  EventRow,
  ExternalLink,
  MediaImage,
  ProjectCard,
} from '@/components/content'
import { dateLabel } from '@/lib/utils'

function Episode({
  number,
  title,
  japanese,
}: {
  number: string
  title: string
  japanese: string
}) {
  return (
    <div className="episode-label">
      <span>
        <i /> <Copy id="app.frontend.page.tsx.1" /> {number}: {title}
      </span>
      <span lang="ja" aria-hidden="true">
        {japanese}
      </span>
    </div>
  )
}

export default async function Home() {
  const [settings, projects, events, skills, experience] = await Promise.all([
    getSettings(),
    getEntries('projects'),
    getEntries('events'),
    getEntries('skills'),
    getEntries('experience'),
  ])
  const selected = (
    projects.some((p) => p.featured)
      ? projects.filter((p) => p.featured)
      : projects
  ).slice(0, 4)
  const github =
    settings.socialLinks?.filter(
      (link) => link.label.toLowerCase() === 'github',
    ) || []
  const presentation = await getPresentation()
  const copy = copyReader(presentation)
  const categoryOrder = presentation.categories.map(row => row.label)
  const groups = [...new Set(skills.map(skill => skill.category || 'Other'))].sort((a,b) => { const rank=(v:string)=>{const i=categoryOrder.indexOf(v);return i<0?categoryOrder.length:i};return rank(a)-rank(b) })
  return (
    <HomeSections>
      <OpeningSequence name={settings.name} />
      <section id="hero" className="opening-hero" aria-label={copy('app.frontend.page.tsx.prop.1')}>
        <AnimeBackground />
        <div className="hero-topline container">
          <span className="mono"><Copy id="app.frontend.page.tsx.2" /></span>
          <span className="mono">
            <MapPin size={12} />
            {settings.location}
          </span>
        </div>
        <div className="hero-content container">
          <div className="hero-kicker">
            <span /> <Copy id="app.frontend.page.tsx.3" /> </div>
          <AnimeTitle name={settings.name} />
          <div className="hero-description">
            <h2><Copy id="app.frontend.page.tsx.4" /></h2>
          </div>
          <div className="hero-actions-new">
            <MagneticLink href="#work" className="button"> <Copy id="app.frontend.page.tsx.5" /> <ArrowUpRight size={18} />
            </MagneticLink>
            <CMSAnchor href="#contact" className="text-link"> <Copy id="app.frontend.page.tsx.6" /> <ArrowUpRight size={16} />
            </CMSAnchor>
          </div>
        </div>
        <div className="hero-ending container">
          <span className="mono">{settings.homepage?.eyebrow}</span>
          <CMSAnchor href="#profile" className="scroll-prompt">
            <span><Copy id="app.frontend.page.tsx.7" /></span>
            <ArrowDown size={16} />
          </CMSAnchor>
          <span className="hero-japanese" lang="ja" aria-hidden="true"> <Copy id="app.frontend.page.tsx.8" /> </span>
        </div>
      </section>
      <div id="chapters" className="chapter-navigation">
        <div className="container">
          <CMSAnchor href="#profile">
            <span>01</span><Copy id="app.frontend.page.tsx.9" /> <ArrowUpRight size={14} />
          </CMSAnchor>
          <CMSAnchor href="#arsenal">
            <span>02</span><Copy id="app.frontend.page.tsx.10" /> <ArrowUpRight size={14} />
          </CMSAnchor>
          <CMSAnchor href="#work">
            <span>03</span><Copy id="app.frontend.page.tsx.11" /> <ArrowUpRight size={14} />
          </CMSAnchor>
          <CMSAnchor href="#contact">
            <span>→</span><Copy id="app.frontend.page.tsx.12" /> <ArrowUpRight size={14} />
          </CMSAnchor>
        </div>
      </div>
      <section
        className="origin-section container episode-section"
        id="profile"
      >
        <Reveal>
          <Episode number="01" title={copy('app.frontend.page.tsx.prop.2')} japanese={copy('app.frontend.page.tsx.prop.3')} />
          <div className="origin-grid">
            <div className="origin-visual">
              {settings.portrait?.url ? (
                <MediaImage
                  media={settings.portrait}
                  className="origin-portrait"
                />
              ) : (
                <div className="origin-monogram" aria-hidden="true">
                  <span><Copy id="app.frontend.page.tsx.13" /></span>
                  <i />
                  <b lang="ja"><Copy id="app.frontend.page.tsx.14" /></b>
                </div>
              )}
              <div className="origin-caption">
                <span>{settings.name} <Copy id="app.frontend.page.tsx.15" /></span>
                <Code2 size={20} />
              </div>
            </div>
            <div className="origin-copy">
              <span className="eyebrow"><Copy id="app.frontend.page.tsx.16" /></span>
              <h2> <Copy id="app.frontend.page.tsx.17" /> <br />
                <em><Copy id="app.frontend.page.tsx.18" /></em>
              </h2>
              <div className="origin-facts">
                {presentation.originCards.map((card, index) => {
                  const Icon = { education: GraduationCap, code: Code2, users: Users }[card.icon] || Code2
                  return <Reveal className="origin-fact" key={index} delay={Math.min(index,5) * 0.09}>
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    <div><h3>{card.title}</h3><p>{card.description}</p></div>
                  </Reveal>
                })}
              </div>
              <Link href="/about" className="text-link"> <Copy id="app.frontend.page.tsx.19" /> <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="arsenal-section episode-section" id="arsenal">
        <div className="container">
          <Reveal>
            <Episode number="02" title={copy('app.frontend.page.tsx.prop.4')} japanese={copy('app.frontend.page.tsx.prop.5')} />
            <div className="episode-heading">
              <h2> <Copy id="app.frontend.page.tsx.20" /> <br />
                <em><Copy id="app.frontend.page.tsx.21" /></em>
              </h2>
              <div>
                <p> <Copy id="app.frontend.page.tsx.22" /> </p>
                <Link href="/experience" className="text-link"> <Copy id="app.frontend.page.tsx.23" /> <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
            {skills.length ? (
              <div className="arsenal-sheet">
                <div className="sheet-header">
                  <span><Copy id="app.frontend.page.tsx.24" /></span>
                  <span>{skills.length} <Copy id="app.frontend.page.tsx.25" /></span>
                </div>
                <div className="skill-groups">
                  {groups.map((category) => (
                    <div className="skill-group" key={category}>
                      <h3>{category}</h3>
                      {skills
                        .filter(
                          (skill) => (skill.category || 'Other') === category,
                        )
                        .map((skill,index) => <SkillCard key={skill.id} entry={skill} index={index} />)}
                    </div>
                  ))}
                </div>
                <p className="sheet-note"> <Copy id="app.frontend.page.tsx.27" /> </p>
              </div>
            ) : (
              <div className="arsenal-empty">
                <div className="loadout-emblem" aria-hidden="true">
                  ⌘
                </div>
                <div>
                  <span className="eyebrow"><Copy id="app.frontend.page.tsx.28" /></span>
                  <h3><Copy id="app.frontend.page.tsx.29" /></h3>
                  <p> <Copy id="app.frontend.page.tsx.30" /> </p>
                </div>
                <span className="loadout-stamp" lang="ja" aria-hidden="true"> <Copy id="app.frontend.page.tsx.31" /> </span>
              </div>
            )}
          </Reveal>
        </div>
      </section>
      <section className="missions-section container episode-section" id="work">
        <Reveal>
          <Episode number="03" title={copy('app.frontend.page.tsx.prop.6')} japanese={copy('app.frontend.page.tsx.prop.7')} />
          <div className="episode-heading">
            <h2> <Copy id="app.frontend.page.tsx.32" /> <br />
              <em><Copy id="app.frontend.page.tsx.33" /></em>
            </h2>
            <div>
              <p> <Copy id="app.frontend.page.tsx.34" /> </p>
              <Link href="/projects" className="text-link"> <Copy id="app.frontend.page.tsx.35" /> <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
        {selected.length ? (
          <div className="mission-grid">
            {selected.map((entry, index) => (
              <Reveal key={entry.id} className="mission-item" delay={(index % 2) * 0.12}>
                <ProjectCard entry={entry} index={index} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="empty-mission">
              <div className="mission-illustration" aria-hidden="true">
                <span className="mission-number">01</span>
                <span className="mission-slash" />
                <span className="mission-sfx" lang="ja"> <Copy id="app.frontend.page.tsx.36" /> </span>
                <span className="mono"><Copy id="app.frontend.page.tsx.37" /></span>
              </div>
              <div className="empty-mission-copy">
                <span className="eyebrow"> <Copy id="app.frontend.page.tsx.38" /> </span>
                <h3> <Copy id="app.frontend.page.tsx.39" /> <br /> <Copy id="app.frontend.page.tsx.40" /> </h3>
                <p> <Copy id="app.frontend.page.tsx.41" /> </p>
                {github.map((link) => (
                  <ExternalLink
                    key={link.url}
                    href={link.url}
                    className="text-link"
                  > <Copy id="app.frontend.page.tsx.42" /> </ExternalLink>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </section>
      {experience.length > 0 && (
        <section
          className="journey-section container episode-section"
          id="journey"
        >
          <Reveal>
            <Episode number="04" title={copy('app.frontend.page.tsx.prop.8')} japanese={copy('app.frontend.page.tsx.prop.9')} />
            <div className="episode-heading">
              <h2> <Copy id="app.frontend.page.tsx.43" /> <br />
                <em><Copy id="app.frontend.page.tsx.44" /></em>
              </h2>
              <Link href="/experience" className="text-link"> <Copy id="app.frontend.page.tsx.45" /> <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="timeline">
              {[...experience]
                .sort((a, b) =>
                  (b.startDate || '').localeCompare(a.startDate || ''),
                )
                .slice(0, 3)
                .map((entry) => (
                  <article className="timeline-item" key={entry.id}>
                    <div className="timeline-date">
                      {dateLabel(entry.startDate)}
                      {entry.startDate &&
                        ` — ${entry.endDate ? dateLabel(entry.endDate) : copy('present')}`}
                    </div>
                    <div>
                      <span className="eyebrow">
                        {entry.organization?.title}
                      </span>
                      <h2>{entry.role || entry.title}</h2>
                      <p>{entry.description}</p>
                    </div>
                  </article>
                ))}
            </div>
          </Reveal>
        </section>
      )}
      <section className="community-sector episode-section" id="community">
        <div className="container">
          <Reveal>
            <Episode number="05" title={copy('app.frontend.page.tsx.prop.10')} japanese={copy('app.frontend.page.tsx.prop.11')} />
            <div className="community-grid">
              <div>
                <span className="eyebrow"><Copy id="app.frontend.page.tsx.46" /></span>
                <h2> <Copy id="app.frontend.page.tsx.47" /> <br /> <Copy id="app.frontend.page.tsx.48" /> <em><Copy id="app.frontend.page.tsx.49" /></em>
                </h2>
                <div className="allies-mark" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="community-message">
                <span className="message-tag"> <Copy id="app.frontend.page.tsx.50" /> </span>
                <ul className="community-badges" aria-label={copy('app.frontend.page.tsx.prop.12')}>
                  {presentation.communityTags.map((tag,index) => <li key={index}>{tag.label}</li>)}
                </ul>
                <div className="community-actions">
                  <MagneticLink href="/community" className="button"> <Copy id="app.frontend.page.tsx.51" /> <ArrowUpRight size={16} />
                  </MagneticLink>
                  <Link href="/activities" className="text-link"> <Copy id="app.frontend.page.tsx.52" /> <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {events.filter((e) => e.featured).length > 0 && (
        <section id="events" className="events-sector container episode-section">
          <Reveal>
            <Episode number="06" title={copy('app.frontend.page.tsx.prop.13')} japanese={copy('app.frontend.page.tsx.prop.14')} />
            <div className="episode-heading">
              <h2> <Copy id="app.frontend.page.tsx.53" /> <br />
                <em><Copy id="app.frontend.page.tsx.54" /></em>
              </h2>
              <Link href="/events" className="text-link"> <Copy id="app.frontend.page.tsx.55" /> <ArrowUpRight size={16} />
              </Link>
            </div>
            {events
              .filter((e) => e.featured)
              .slice(0, 3)
              .map((entry, index) => (
                <EventRow entry={entry} index={index} key={entry.id} />
              ))}
          </Reveal>
        </section>
      )}
      <section id="process" className="process-sector container episode-section">
        <Reveal>
          <div className="episode-label">
            <span><Copy id="app.frontend.page.tsx.56" /></span>
            <Link href="/hackathons"><Copy id="app.frontend.page.tsx.57" /> <ArrowUpRight size={14} aria-hidden="true" /></Link>
          </div>
          <Approach />
        </Reveal>
      </section>
    </HomeSections>
  )
}
