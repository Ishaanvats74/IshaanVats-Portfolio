'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function Approach() {
  const reduced = useReducedMotion()
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
          <motion.li key={title} initial={false}
            whileInView={reduced ? undefined : { opacity: [0, 1], y: [16, 0] }} viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}>
            <span className="approach-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

/** Keep server content visible; animate only the owned presentation wrapper. */
export function Reveal({ children, className = '', delay = 0 }: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const element = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: element, offset: ['start end', 'end start'] })
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 1], [3, 0, 0])
  return <motion.div ref={element} className={className}
    initial={false}
    style={{ rotateX: reduced ? 0 : rotateX, transformPerspective: 1200, transformOrigin: '50% 100%' }}
    whileInView={reduced ? undefined : { opacity: [0, 1], x: [12, 0], y: [20, 0] }}
    viewport={{ once: true, amount: 'some', margin: '0px 0px -25px 0px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
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
  href, children, className = '', external = false, ariaLabel,
}: {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
  ariaLabel?: string
}) {
  const reduced = useReducedMotion()
  const x = useSpring(0, { stiffness: 240, damping: 22 })
  const y = useSpring(0, { stiffness: 240, damping: 22 })
  const reset = () => { x.set(0); y.set(0) }
  return (
    <span className="magnetic-wrap" onPointerMove={event => {
      if (reduced || event.pointerType !== 'mouse') return
      const bounds = event.currentTarget.getBoundingClientRect()
      x.set(Math.max(-8, Math.min(8, (event.clientX - bounds.left - bounds.width / 2) * 0.12)))
      y.set(Math.max(-6, Math.min(6, (event.clientY - bounds.top - bounds.height / 2) * 0.15)))
    }} onPointerLeave={reset} onBlur={reset}>
      <motion.span style={{ x: reduced ? 0 : x, y: reduced ? 0 : y, display: 'inline-flex' }}>
        <Link href={href} className={className} aria-label={ariaLabel}
          target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
          {children}
        </Link>
      </motion.span>
    </span>
  )
}

export function ProjectSurface({ media, children }: { media: ReactNode; children: ReactNode }) {
  const reduced = useReducedMotion()
  const card = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: card, offset: ['start end', 'end start'] })
  const scrollY = useTransform(scrollYProgress, [0, 1], [14, -14])
  const x = useSpring(0, { stiffness: 180, damping: 25 })
  const y = useSpring(0, { stiffness: 180, damping: 25 })
  const reset = () => { x.set(0); y.set(0) }
  return <motion.article ref={card} className="project-card" data-cursor="VIEW PROJECT"
    whileHover={reduced ? undefined : { scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    onPointerMove={event => {
      if (reduced || event.pointerType !== 'mouse') return
      const bounds = event.currentTarget.getBoundingClientRect()
      x.set((event.clientX - bounds.left - bounds.width / 2) * 0.018)
      y.set((event.clientY - bounds.top - bounds.height / 2) * 0.018)
    }} onPointerLeave={reset}>
    <div className="mission-media"><motion.div style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }}>
      <motion.div style={{ y: reduced ? 0 : scrollY }}>{media}</motion.div>
    </motion.div></div>
    {children}
  </motion.article>
}
