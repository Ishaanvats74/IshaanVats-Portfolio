'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function EnergyCursor() {
  const ring = useRef<HTMLDivElement>(null)
  const core = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  useEffect(() => {
    const media = window.matchMedia(
      '(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)',
    )
    let frame = 0
    let targetX = 0,
      targetY = 0,
      x = 0,
      y = 0,
      initialized = false
    const tick = () => {
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      if (ring.current)
        ring.current.style.transform = `translate3d(${x}px,${y}px,0)`
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.15)
        frame = requestAnimationFrame(tick)
      else frame = 0
    }
    const hide = () => {
      if (ring.current) ring.current.dataset.visible = 'false'
      if (core.current) core.current.dataset.visible = 'false'
      cancelAnimationFrame(frame)
      frame = 0
      initialized = false
    }
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === 'touch') return
      targetX = event.clientX
      targetY = event.clientY
      if (!initialized) {
        x = targetX
        y = targetY
        initialized = true
      }
      if (core.current) {
        core.current.style.transform = `translate3d(${targetX}px,${targetY}px,0)`
        core.current.dataset.visible = 'true'
      }
      if (ring.current) {
        const target = (event.target as Element).closest<HTMLElement>(
          'a,button,[data-cursor]',
        )
        ring.current.dataset.visible = 'true'
        ring.current.dataset.expanded = target ? 'true' : 'false'
      }
      if (!frame) frame = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    media.addEventListener('change', hide)
    return () => {
      hide()
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      media.removeEventListener('change', hide)
    }
  }, [pathname])
  return (
    <>
      <div ref={ring} className="energy-cursor" aria-hidden="true">
        <i />
      </div>
      <div ref={core} className="cursor-core" aria-hidden="true">
        <i />
      </div>
    </>
  )
}
