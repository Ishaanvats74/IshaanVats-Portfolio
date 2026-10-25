import { copyReader } from '@/lib/presentation'
import { CMSAnchor } from '@/components/presentation'
import { PresentationProvider, Visible } from '@/components/presentation'
import { Copy } from '@/components/presentation'
import type { Metadata } from 'next'
import { CMSLink as Link } from '@/components/presentation'
import { ArrowUpRight } from 'lucide-react'
import { getSettings, getPresentation, cmsConfigured } from '@/lib/data'
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
  const copy = copyReader(await getPresentation())
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    ),
    title: {
      default: `${settings.name} — ${copy('meta.titleSuffix')}`,
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
  const [settings, presentation] = await Promise.all([getSettings(), getPresentation()])
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><PresentationProvider value={presentation}>
        <CMSAnchor className="skip-link" href="#main"> <Copy id="app.frontend.layout.tsx.1" /> </CMSAnchor>
        <Visible name="navigation"><Navigation settings={settings} /></Visible>
        <main id="main">{children}</main>
        <Visible name="contact"><Reveal>
          <footer id="contact" className="site-footer">
            <div className="footer-transmission">
              <span><Copy id="app.frontend.layout.tsx.2" /></span>
              <span lang="ja" aria-hidden="true"> <Copy id="app.frontend.layout.tsx.3" /> </span>
            </div>
            <div className="eyebrow"> <Copy id="app.frontend.layout.tsx.4" /> </div>
            <div className="footer-title">
              <h2> <Copy id="app.frontend.layout.tsx.5" /> <br />
                <span><Copy id="app.frontend.layout.tsx.6" /></span>
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
                <CMSAnchor href={`mailto:${settings.email}`}>
                  {settings.email}
                  <ArrowUpRight size={15} />
                </CMSAnchor>
              )}
              {settings.phone && (
                <CMSAnchor href={`tel:${settings.phone}`}>{settings.phone}</CMSAnchor>
              )}
              {settings.socialLinks?.map((link) => (
                <ExternalLink key={link.url} href={link.url}>
                  {link.label}
                </ExternalLink>
              ))}
              <Link href="/resume"> <Copy id="app.frontend.layout.tsx.7" /> <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} {settings.name}
              </span>
              <span>{settings.footer}</span>
              <CMSAnchor href="#top"><Copy id="app.frontend.layout.tsx.8" /></CMSAnchor>
            </div>
          </footer>
        </Reveal></Visible>
        <MotionLayer />
        {!cmsConfigured && (
          <div className="preview-note"> <Copy id="app.frontend.layout.tsx.9" /> </div>
        )}
      </PresentationProvider></body>
    </html>
  )
}
