import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Code2, MapPin } from 'lucide-react'
import { getEntries, getSettings } from '@/lib/data'
import { AnimeBackground } from '@/components/anime-background'
import { AnimeTitle } from '@/components/anime-title'
import { OpeningSequence } from '@/components/opening-sequence'
import { StudioVisual } from '@/components/visual'
import {
  Approach,
  MagneticLink,
  Reveal,
  SkillEnergy,
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
        <i />
        EPISODE {number}: {title}
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
  const groups = [...new Set(skills.map((skill) => skill.category || 'Other'))]
  return (
    <div className="crimson-home" id="top">
      <OpeningSequence name={settings.name} />
      <section className="opening-hero" aria-label="Introduction">
        <AnimeBackground />
        <div className="hero-topline container">
          <span className="mono">AN ORIGINAL STORY / A PERSONAL PORTFOLIO</span>
          <span className="mono">
            <MapPin size={12} />
            {settings.location}
          </span>
        </div>
        <div className="hero-content container">
          <div className="hero-kicker">
            <span />
            CODE. CURIOSITY. CONVICTION.
          </div>
          <AnimeTitle name={settings.name} />
          <div className="hero-description">
            <h2>{settings.headline}</h2>
            <p>{settings.homepage?.intro}</p>
          </div>
          <div className="hero-actions-new">
            <MagneticLink href="#work" className="button">
              Explore the work
              <ArrowUpRight size={18} />
            </MagneticLink>
            <a href="#contact" className="text-link">
              Start a conversation
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-ending container">
          <span className="mono">{settings.homepage?.eyebrow}</span>
          <a href="#profile" className="scroll-prompt">
            <span>THE STORY CONTINUES</span>
            <ArrowDown size={16} />
          </a>
          <span className="hero-japanese" lang="ja" aria-hidden="true">
            ポートフォリオ
          </span>
        </div>
      </section>
      <div className="chapter-navigation">
        <div className="container">
          <a href="#profile">
            <span>01</span>ORIGIN
            <ArrowUpRight size={14} />
          </a>
          <a href="#arsenal">
            <span>02</span>ARSENAL
            <ArrowUpRight size={14} />
          </a>
          <a href="#work">
            <span>03</span>MISSIONS
            <ArrowUpRight size={14} />
          </a>
          <a href="#contact">
            <span>→</span>NEXT CHAPTER
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <section
        className="origin-section container episode-section"
        id="profile"
      >
        <Reveal>
          <Episode number="01" title="ORIGIN" japanese="始まり" />
          <div className="origin-grid">
            <div className="origin-visual">
              {settings.portrait?.url ? (
                <MediaImage
                  media={settings.portrait}
                  className="origin-portrait"
                />
              ) : (
                <div className="origin-monogram" aria-hidden="true">
                  <span>IV</span>
                  <i />
                  <b lang="ja">好奇心</b>
                </div>
              )}
              <div className="origin-caption">
                <span>{settings.name} / THE HUMAN BEHIND THE CODE</span>
                <Code2 size={20} />
              </div>
            </div>
            <div className="origin-copy">
              <span className="eyebrow">EVERY STORY STARTS SOMEWHERE.</span>
              <h2>
                A CURIOUS MIND.
                <br />
                <em>AN UNFINISHED STORY.</em>
              </h2>
              <p>{settings.biography}</p>
              <div className="education-data">
                <span className="mono">CURRENT CHAPTER</span>
                <p>{settings.education}</p>
              </div>
              <Link href="/about" className="text-link">
                Read my story
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="arsenal-section episode-section" id="arsenal">
        <div className="container">
          <Reveal>
            <Episode number="02" title="ARSENAL" japanese="技術" />
            <div className="episode-heading">
              <h2>
                TOOLS OF
                <br />
                <em>THE TRADE.</em>
              </h2>
              <div>
                <p>
                  Full-stack development, intelligent systems, and developer
                  tools. The toolkit grows with the idea.
                </p>
                <Link href="/experience" className="text-link">
                  Explore experience
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
            {skills.length ? (
              <div className="arsenal-sheet">
                <div className="sheet-header">
                  <span>TECHNOLOGY LOADOUT</span>
                  <span>{skills.length} PUBLISHED ENTRIES</span>
                </div>
                <div className="skill-groups">
                  {groups.map((category) => (
                    <div className="skill-group" key={category}>
                      <h3>{category}</h3>
                      {skills
                        .filter(
                          (skill) => (skill.category || 'Other') === category,
                        )
                        .map((skill) => (
                          <Reveal key={skill.id} className="skill-row">
                            <div className="skill-name">
                              <span className="skill-badge" aria-hidden="true">
                                +
                              </span>
                              <strong>{skill.title}</strong>
                              {skill.website && (
                                <ExternalLink href={skill.website}>
                                  Website
                                </ExternalLink>
                              )}
                            </div>
                            <SkillEnergy />
                          </Reveal>
                        ))}
                    </div>
                  ))}
                </div>
                <p className="sheet-note">
                  Published toolkit entries. Decorative energy bars are not
                  proficiency scores.
                </p>
              </div>
            ) : (
              <div className="arsenal-empty">
                <div className="loadout-emblem" aria-hidden="true">
                  ⌘
                </div>
                <div>
                  <span className="eyebrow">THE LOADOUT IS EVOLVING</span>
                  <h3>New tools. New possibilities.</h3>
                  <p>
                    My technology inventory will appear here as it’s published.
                  </p>
                </div>
                <span className="loadout-stamp" lang="ja" aria-hidden="true">
                  進化
                </span>
              </div>
            )}
          </Reveal>
        </div>
      </section>
      <section className="missions-section container episode-section" id="work">
        <Reveal>
          <Episode number="03" title="MISSIONS" japanese="制作" />
          <div className="episode-heading">
            <h2>
              IDEAS INTO
              <br />
              <em>REALITY.</em>
            </h2>
            <div>
              <p>
                Applications, experiments, and the thinking behind the code.
              </p>
              <Link href="/projects" className="text-link">
                All projects
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
        {selected.length ? (
          <div className="mission-grid">
            {selected.map((entry, index) => (
              <Reveal key={entry.id} className="mission-item">
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
                <span className="mission-sfx" lang="ja">
                  ドン!
                </span>
                <span className="mono">TO BE CONTINUED.</span>
              </div>
              <div className="empty-mission-copy">
                <span className="eyebrow">
                  THE NEXT MISSION IS TAKING SHAPE
                </span>
                <h3>
                  EVERY BUILD
                  <br />
                  STARTS WITH AN IDEA.
                </h3>
                <p>
                  Case studies will appear here as they’re published. Explore my
                  code on GitHub in the meantime.
                </p>
                {github.map((link) => (
                  <ExternalLink
                    key={link.url}
                    href={link.url}
                    className="text-link"
                  >
                    Explore GitHub
                  </ExternalLink>
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
            <Episode number="04" title="THE JOURNEY" japanese="経験" />
            <div className="episode-heading">
              <h2>
                LEARNING
                <br />
                <em>BY DOING.</em>
              </h2>
              <Link href="/experience" className="text-link">
                Full timeline
                <ArrowUpRight size={16} />
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
                        ` — ${entry.endDate ? dateLabel(entry.endDate) : 'Present'}`}
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
            <Episode number="05" title="ALLIES" japanese="仲間" />
            <div className="community-grid">
              <div>
                <span className="eyebrow">BEYOND THE KEYBOARD</span>
                <h2>
                  NO GREAT STORY
                  <br />
                  IS BUILT <em>ALONE.</em>
                </h2>
                <div className="allies-mark" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="community-message">
                <span className="message-tag">
                  COMMUNITY / COLLABORATION / CONNECTION
                </span>
                <p>{settings.homepage?.communityIntro}</p>
                <div className="community-actions">
                  <Link href="/community" className="button">
                    Meet the community
                    <ArrowUpRight size={16} />
                  </Link>
                  <Link href="/activities" className="text-link">
                    Activities
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="lab-section container episode-section" id="lab">
        <Reveal>
          <Episode number="06" title="EXPERIMENTS" japanese="探求" />
          <div className="episode-heading">
            <h2>
              FOLLOW
              <br />
              <em>THE WHAT IF.</em>
            </h2>
            <div>
              <p>
                Three connected interests. Pick a channel and rearrange the
                nodes to explore the connections.
              </p>
              <Link href="/writing" className="text-link">
                Notes & explorations
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <StudioVisual pillars={settings.homepage?.pillars || []} />
        </Reveal>
      </section>
      {events.filter((e) => e.featured).length > 0 && (
        <section className="events-sector container episode-section">
          <Reveal>
            <Episode number="07" title="FIELD NOTES" japanese="記録" />
            <div className="episode-heading">
              <h2>
                OUT IN
                <br />
                <em>THE WORLD.</em>
              </h2>
              <Link href="/events" className="text-link">
                All events
                <ArrowUpRight size={16} />
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
      <section className="process-sector container episode-section">
        <Reveal>
          <div className="episode-label">
            <span>THE BUILD SEQUENCE / LEARNING IS A LOOP</span>
            <Link href="/hackathons">HACKATHONS ↗</Link>
          </div>
          <Approach />
        </Reveal>
      </section>
    </div>
  )
}
