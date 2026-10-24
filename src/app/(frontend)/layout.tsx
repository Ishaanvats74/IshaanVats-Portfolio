import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getSettings, cmsConfigured } from '@/lib/data'
import { Navigation } from '@/components/navigation'
import { MotionLayer } from '@/components/motion-layer'
import { MagneticLink, Reveal } from '@/components/experience'
import { ExternalLink } from '@/components/content'
import './globals.css'
import '@fontsource-variable/space-grotesk'
import '@fontsource/bebas-neue/latin-400.css'
import './theme.css'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    ),
    title: {
      default: `${settings.name} — Engineering, AI & Community`,
      template: `%s — ${settings.name}`,
    },
    description: settings.seo?.description || settings.biography,
    openGraph: {
      title: settings.seo?.title || settings.name,
      description: settings.biography,
      type: 'website',
      images: settings.seo?.image?.url ? [settings.seo.image.url] : [],
    },
  }
}
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings()
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation settings={settings} />
        <main id="main">{children}</main>
        <Reveal>
          <footer id="contact" className="site-footer">
            <div className="footer-transmission">
              <span>NEXT EPISODE PREVIEW / CONTACT</span>
              <span lang="ja" aria-hidden="true">
                連絡
              </span>
            </div>
            <div className="eyebrow">
              HAVE AN IDEA, A QUESTION, OR A SHARED CURIOSITY?
            </div>
            <div className="footer-title">
              <h2>
                LET’S BUILD
                <br />
                <span>THE NEXT CHAPTER.</span>
              </h2>
              {settings.email && (
                <MagneticLink
                  className="circle-button"
                  href={`mailto:${settings.email}`}
                  ariaLabel={`Email ${settings.name}`}
                >
                  <ArrowUpRight />
                </MagneticLink>
              )}
            </div>
            <div className="footer-links">
              {settings.email && (
                <a href={`mailto:${settings.email}`}>
                  {settings.email}
                  <ArrowUpRight size={15} />
                </a>
              )}
              {settings.phone && (
                <a href={`tel:${settings.phone}`}>{settings.phone}</a>
              )}
              {settings.socialLinks?.map((link) => (
                <ExternalLink key={link.url} href={link.url}>
                  {link.label}
                </ExternalLink>
              ))}
              <Link href="/resume">
                Résumé
                <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} {settings.name}
              </span>
              <span>{settings.footer}</span>
              <a href="#top">BACK TO TOP ↑</a>
            </div>
          </footer>
        </Reveal>
        <MotionLayer />
        {!cmsConfigured && (
          <div className="preview-note">
            LOCAL PREVIEW · Connect Payload to publish your content
          </div>
        )}
      </body>
    </html>
  )
}
