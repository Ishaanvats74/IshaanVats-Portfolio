'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EnergyCursor } from './energy-cursor'

export function MotionLayer() {
  const progress = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.fromTo(
        progress.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
        },
      )
    })
    return () => media.revert()
  }, [pathname])
  return (
    <>
      <div ref={progress} className="scroll-progress" aria-hidden="true" />
      <EnergyCursor />
      <div key={pathname} className="route-cut" aria-hidden="true">
        <i />
      </div>
    </>
  )
}
