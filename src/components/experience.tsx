'use client'

import { Children, useEffect, useRef, type ReactNode } from 'react'
import { CMSLink as Link } from '@/components/presentation'
import { gsap } from '@/lib/gsap'
import { usePresentation, resolveLink, useCopy } from './presentation'

export function Approach() {
  const element = useRef<HTMLDivElement>(null)
  const steps = usePresentation().processSteps
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const bar = element.current?.querySelector('.approach-track > div')
      if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: {
        trigger: element.current, start: 'top 80%', end: 'bottom 55%', scrub: true,
      } })
    })
    return () => media.revert()
  }, [])
  return <div ref={element} className="approach-journey">
    <div className="approach-track" aria-hidden="true"><div /></div>
    <ol>{steps.map(({title, description}, index) => <li key={title}>
      <span className="approach-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p>
    </li>)}</ol>
  </div>
}

/** A short entry, never an always-scrubbing 3D transform on an entire section. */
export function Reveal({ children, className = '', delay = 0 }: {
  children: ReactNode; className?: string; delay?: number
}) {
  const element = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = element.current
    // Nested entry transforms were multiplying motion and rasterizing huge layers.
    if (!node || node.parentElement?.closest('[data-reveal]')) return
    const media = gsap.matchMedia()
    media.add({ animate: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 900px)' }, context => {
      if (!context.conditions?.animate || node.getBoundingClientRect().top < innerHeight * 0.94) return
      const desktop = context.conditions.desktop
      gsap.fromTo(node, { autoAlpha: 0, y: desktop ? 20 : 10 }, {
        autoAlpha: 1, y: 0, duration: desktop ? 0.5 : 0.32,
        delay: Math.min(delay, desktop ? 0.24 : 0.08), ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: node, start: 'top 94%', once: true },
      })
    })
    return () => media.revert()
  }, [delay])
  return <div ref={element} className={className} data-reveal>{children}</div>
}

export function MagneticLink({ href, children, className = '', external = false, ariaLabel }: {
  href: string; children: ReactNode; className?: string; external?: boolean; ariaLabel?: string
}) {
  const wrapper = useRef<HTMLSpanElement>(null)
  const inner = useRef<HTMLSpanElement>(null)
  const copy = useCopy()
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      if (!wrapper.current || !inner.current) return
      const node = wrapper.current
      const x = gsap.quickTo(inner.current, 'x', { duration: 0.22, ease: 'power2.out' })
      const y = gsap.quickTo(inner.current, 'y', { duration: 0.22, ease: 'power2.out' })
      let bounds: DOMRect | undefined
      const enter = () => { bounds = node.getBoundingClientRect() }
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || !bounds) return
        x(gsap.utils.clamp(-6, 6, (event.clientX - bounds.left - bounds.width / 2) * 0.1))
        y(gsap.utils.clamp(-4, 4, (event.clientY - bounds.top - bounds.height / 2) * 0.1))
      }
      const reset = () => { bounds = undefined; x(0); y(0) }
      node.addEventListener('pointerenter', enter)
      node.addEventListener('pointermove', move)
      node.addEventListener('pointerleave', reset)
      node.addEventListener('focusout', reset)
      return () => {
        node.removeEventListener('pointerenter', enter)
        node.removeEventListener('pointermove', move)
        node.removeEventListener('pointerleave', reset)
        node.removeEventListener('focusout', reset)
      }
    })
    return () => media.revert()
  }, [])
  const destination = resolveLink(href,copy)
  if (!destination) return null
  return <span ref={wrapper} className="magnetic-wrap"><span ref={inner} className="magnetic-inner">
    <Link href={destination} className={className} aria-label={ariaLabel}
      target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{children}</Link>
  </span></span>
}

export function ProjectSurface({ media, children }: { media: ReactNode; children: ReactNode }) {
  const card = useRef<HTMLElement>(null)
  const image = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const match = gsap.matchMedia()
    match.add('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      if (!card.current || !image.current) return
      gsap.fromTo(image.current, { y: -8 }, { y: 8, ease: 'none', scrollTrigger: {
        trigger: card.current, start: 'top bottom', end: 'bottom top', scrub: 0.25,
      } })
    })
    return () => match.revert()
  }, [])
  return <article ref={card} className="project-card" data-cursor="VIEW PROJECT">
    <div className="mission-media"><div ref={image} className="project-parallax">{media}</div></div>{children}
  </article>
}

export function RevealGroup({children,className=''}:{children:ReactNode;className?:string}) {
  return <div className={className}>{Children.toArray(children).map((child,index)=><Reveal key={index} delay={Math.min(index,3)*0.06}>{child}</Reveal>)}</div>
}
