'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function Approach() {
  const element = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        line.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: element.current,
            start: 'top 85%',
            end: 'bottom 50%',
            scrub: 0.6,
          },
        },
      )
    })
    return () => media.revert()
  }, [])
  const steps = [
    ['Observe', 'Start with a question worth asking.'],
    ['Connect', 'Look for the thread between ideas.'],
    ['Experiment', 'Try things. Follow what surprises.'],
    ['Build', 'Give the idea something tangible.'],
    ['Learn', 'Reflect, refine, and go again.'],
  ]
  return (
    <div ref={element} className="approach-journey">
      <div className="approach-track" aria-hidden="true">
        <div ref={line} />
      </div>
      <ol>
        {steps.map(([title, description], index) => (
          <li key={title}>
            <span className="approach-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Animate owned wrappers without mutating streamed CMS content. */
export function Reveal({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const element = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        element.current,
        { y: 38 },
        {
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element.current,
            start: 'top 94%',
            once: true,
          },
        },
      )
    })
    return () => media.revert()
  }, [])
  return (
    <div ref={element} className={className}>
      {children}
    </div>
  )
}

export function SkillEnergy() {
  const element = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        fill.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element.current,
            start: 'top 94%',
            once: true,
          },
        },
      )
    })
    return () => media.revert()
  }, [])
  return (
    <div ref={element} className="skill-energy" aria-hidden="true">
      <i ref={fill} />
    </div>
  )
}

export function MagneticLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reset = () => {
    if (ref.current)
      gsap.to(ref.current, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: true,
      })
  }
  useEffect(() => {
    const node = ref.current
    return () => {
      gsap.killTweensOf(node)
    }
  }, [])
  return (
    <div
      ref={ref}
      className="magnetic-wrap"
      onPointerMove={(event) => {
        if (
          event.pointerType !== 'mouse' ||
          !window.matchMedia(
            '(prefers-reduced-motion: no-preference) and (pointer: fine)',
          ).matches
        )
          return
        const bounds = event.currentTarget.getBoundingClientRect()
        gsap.to(ref.current, {
          x: (event.clientX - bounds.left - bounds.width / 2) * 0.12,
          y: (event.clientY - bounds.top - bounds.height / 2) * 0.15,
          duration: 0.4,
          overwrite: true,
        })
      }}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </div>
  )
}
