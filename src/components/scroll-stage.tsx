'use client'
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, ScrollSmoother, ScrollTrigger } from '@/lib/gsap'

/** One scroll owner. Touch, reduced-motion and no-JS visitors retain native scroll. */
export function ScrollStage({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  useLayoutEffect(() => {
    if (!wrapper.current || !content.current) return
    const media = gsap.matchMedia()
    let smoother: ScrollSmoother | undefined
    media.add('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      document.documentElement.dataset.smoothScroll = 'true'
      smoother = ScrollSmoother.create({
        wrapper: wrapper.current!, content: content.current!,
        smooth: 0.55, smoothTouch: false, effects: false,
        normalizeScroll: false, autoResize: false,
      })
      return () => {
        smoother?.kill()
        smoother = undefined
        delete document.documentElement.dataset.smoothScroll
      }
    })
    const scrollTo = (target: HTMLElement, animate: boolean) => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (smoother) smoother.scrollTo(target, animate && !reduced, 'top 96px')
      else target.scrollIntoView({ behavior: animate && !reduced ? 'smooth' : 'instant', block: 'start' })
    }
    const hashTarget = () => {
      try { return document.getElementById(decodeURIComponent(location.hash.slice(1))) }
      catch { return null }
    }
    const restoreHash = () => {
      const target = hashTarget()
      if (target) scrollTo(target, false)
    }
    const anchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return
      const url = new URL(link.href, location.href)
      if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return
      let target: HTMLElement | null
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))) }
      catch { return }
      if (!target) return
      event.preventDefault()
      history.pushState(history.state, '', url.hash)
      scrollTo(target, true)
      if (link.classList.contains('skip-link')) {
        target.tabIndex = -1
        target.focus({ preventScroll: true })
      }
    }
    // One size observer for route content, lazy images, and archive filters.
    let height = 0
    // A refresh can interrupt native anchor scrolling. Wait for scrolling to settle.
    const refresh = gsap.delayedCall(0.2, () => {
      if (ScrollTrigger.isScrolling()) refresh.restart(true)
      else ScrollTrigger.refresh()
    }).pause()
    const resize = new ResizeObserver(([entry]) => {
      if (Math.abs(entry.contentRect.height - height) < 1) return
      height = entry.contentRect.height
      refresh.restart(true)
    })
    resize.observe(content.current)
    document.addEventListener('click', anchor, true)
    window.addEventListener('hashchange', restoreHash)
    const initialFrame = requestAnimationFrame(() => { ScrollTrigger.refresh(); restoreHash() })
    return () => {
      refresh.kill()
      cancelAnimationFrame(initialFrame)
      resize.disconnect()
      document.removeEventListener('click', anchor, true)
      window.removeEventListener('hashchange', restoreHash)
      media.revert()
    }
  }, [pathname])
  return <div ref={wrapper} id="smooth-wrapper"><div ref={content} id="smooth-content">{children}</div></div>
}
