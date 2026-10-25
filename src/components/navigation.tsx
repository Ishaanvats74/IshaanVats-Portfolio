'use client'
import { useCopy } from '@/components/presentation'
import { Copy } from '@/components/presentation'
import { useState } from 'react'
import { CMSLink as Link } from '@/components/presentation'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import type { Settings } from '@/lib/content'

export function Navigation({ settings }: { settings: Settings }) {
 const copy=useCopy()

  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const reduced = useReducedMotion()
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false)
      }}
    >
      <Link className="wordmark" href="/" aria-label={`${settings.name} ${copy('nav.home')}`}> <Copy id="components.navigation.tsx.1" /><span className="brand-dot">/</span>
      </Link>
      <span className={`header-note ${copy('components.navigation.tsx.2') ? 'name-switch' : ''}`} tabIndex={0} aria-label={`${settings.name}, ${copy('components.navigation.tsx.3')}`}>
        <span className="header-name" aria-hidden="true"><span className="name-latin">{settings.name}</span><span className="name-katakana" lang="ja"><Copy id="components.navigation.tsx.2" /></span></span>
        <br />
        <span><Copy id="components.navigation.tsx.3" /></span>
      </span>
      <nav className="desktop-nav" aria-label={copy('components.navigation.tsx.prop.1')}>
        {settings.navigation.map((item, index) => (
          <Link
            aria-current={pathname === item.href ? 'page' : undefined}
            key={item.href}
            href={item.href}
          >
            <span className="nav-index">0{index + 1}</span>
            {item.label}
          </Link>
        ))}
        <Link className="nav-resume" href="/resume"> <Copy id="components.navigation.tsx.4" /> <ArrowUpRight size={14} />
        </Link>
      </nav>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={copy(open ? 'nav.close' : 'nav.open')}
      >
        {open ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label={copy('components.navigation.tsx.prop.2')}
            initial={{ opacity: 0, y: reduced ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {[...settings.navigation, { label: 'Résumé', href: '/resume' }].map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ArrowUpRight />
                </Link>
              ),
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
