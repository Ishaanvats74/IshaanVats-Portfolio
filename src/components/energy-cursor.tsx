'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/** Shares GSAP's ticker; no independent requestAnimationFrame loop. */
export function EnergyCursor() {
  const ring = useRef<HTMLDivElement>(null)
  const core = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 900px) and (pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)', () => {
      if (!ring.current || !core.current) return
      const outer = ring.current, dot = core.current
      const x = gsap.quickTo(outer, 'x', { duration: 0.18, ease: 'power2.out' })
      const y = gsap.quickTo(outer, 'y', { duration: 0.18, ease: 'power2.out' })
      const dotX = gsap.quickSetter(dot, 'x', 'px')
      const dotY = gsap.quickSetter(dot, 'y', 'px')
      let initialized = false
      const hide = () => {
        outer.dataset.visible = dot.dataset.visible = 'false'
        x.tween.pause(); y.tween.pause(); initialized = false
      }
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return
        dotX(event.clientX); dotY(event.clientY)
        if (!initialized) {
          x(event.clientX, event.clientX); y(event.clientY, event.clientY)
          outer.dataset.visible = dot.dataset.visible = 'true'
          initialized = true
        } else { x(event.clientX); y(event.clientY) }
        const expanded = String(Boolean((event.target as Element).closest('a,button,[data-cursor]')))
        if (outer.dataset.expanded !== expanded) outer.dataset.expanded = expanded
      }
      const visibility = () => { if (document.hidden) hide() }
      window.addEventListener('pointermove', move, { passive: true })
      document.addEventListener('pointerleave', hide)
      window.addEventListener('blur', hide)
      document.addEventListener('visibilitychange', visibility)
      return () => {
        hide()
        window.removeEventListener('pointermove', move)
        document.removeEventListener('pointerleave', hide)
        window.removeEventListener('blur', hide)
        document.removeEventListener('visibilitychange', visibility)
      }
    })
    return () => media.revert()
  }, [])
  return <><div ref={ring} className="energy-cursor" aria-hidden="true"><i /></div>
    <div ref={core} className="cursor-core" aria-hidden="true"><i /></div></>
}
