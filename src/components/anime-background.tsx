'use client'
import { Copy } from '@/components/presentation'

import { useEffect, useRef } from 'react'

/** Original vector scenery. No canvas, external imagery, or permanent animation loop. */
export function AnimeBackground() {
  const layer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = layer.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      node.dataset.active = String(entry.isIntersecting)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={layer} className="anime-world" aria-hidden="true">
      <div className="world-parallax">
        <div className="aura-haze" />
        <div className="eclipse">
          <div className="moon-surface" />
          <div className="eclipse-shadow" />
          <div className="orbit-glyphs" />
        </div>
        <svg className="torii-scene" viewBox="0 0 640 640" fill="none">
          <path
            className="torii-silhouette"
            d="M84 213Q320 261 556 213L547 243Q320 282 93 243ZM128 276H512V300H128ZM177 259H207L195 536H165ZM433 259H463L475 536H445ZM300 255H340V288H300Z"
          />
          <path
            className="torii-edge"
            d="M84 213Q320 261 556 213M128 276H512M177 259 165 536M463 259 475 536"
          />
          <path
            className="landscape"
            d="m0 564 58-20 42 15 53-32 61 20 77-18 69 20 65-34 65 13 74-8 76 32v88H0Z"
          />
          <path
            d="m174 315 65 3m162 0 64-3M320 300v72"
            stroke="currentColor"
            strokeWidth="2"
            opacity=".4"
          />
        </svg>
        <span className="world-kanji" lang="ja"> <Copy id="components.anime.background.tsx.1" /> </span>
        <span className="world-caption"> <Copy id="components.anime.background.tsx.2" /> </span>
        <div className="speed-lines">
          {Array.from({ length: 7 }, (_, index) => (
            <i
              key={index}
              style={{
                top: `${13 + index * 12}%`,
                width: `${15 + (index % 3) * 12}%`,
                animationDelay: `${index * -0.8}s`,
              }}
            />
          ))}
        </div>
        <div className="embers">
          {Array.from({ length: 18 }, (_, index) => (
            <i
              key={index}
              style={{
                left: `${6 + index * 5.2}%`,
                top: `${20 + ((index * 13) % 70)}%`,
                animationDelay: `${index * -0.6}s`,
                animationDuration: `${8 + (index % 4)}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="world-vignette" />
      <div className="halftone world-halftone" />
    </div>
  )
}
