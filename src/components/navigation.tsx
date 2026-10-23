'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import type { Settings } from '@/lib/content'

export function Navigation({ settings }: { settings: Settings }) {
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
      <Link className="wordmark" href="/" aria-label={`${settings.name} home`}>
        IV<span className="brand-dot">/</span>
      </Link>
      <span className="header-note">
        {settings.name}
        <br />
        <span>PERSONAL PORTFOLIO</span>
      </span>
      <nav className="desktop-nav" aria-label="Main navigation">
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
        <Link className="nav-resume" href="/resume">
          Résumé <ArrowUpRight size={14} />
        </Link>
      </nav>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
      >
        {open ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
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
