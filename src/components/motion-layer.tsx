'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { EnergyCursor } from './energy-cursor'

export function MotionLayer() {
  const pathname = usePathname()
  const progress = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (!progress.current) return
      const set = gsap.quickSetter(progress.current, 'scaleX')
      ScrollTrigger.create({ start: 0, end: () => Math.max(1, ScrollTrigger.maxScroll(window)),
        onUpdate: self => set(self.progress), onRefresh: self => set(self.progress),
      })
    })
    return () => media.revert()
  }, [pathname])
  return <><div ref={progress} className="scroll-progress" aria-hidden="true" /><EnergyCursor /></>
}
