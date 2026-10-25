'use client'
import { useCopy, Copy } from '@/components/presentation'
import { useEffect, useState } from 'react'

export function AnimeTitle({ name }: { name: string }) {
  const copy=useCopy()
  const japaneseEnabled=Boolean(copy('components.anime.title.tsx.1') && copy('components.anime.title.tsx.2'))
  const [display, setDisplay] = useState(name)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let start = 0
    const symbols = 'X/01<>+*'
    const tick = (now: number) => {
      if (!start) start = now
      const progress = Math.min((now - start) / 650, 1)
      const reveal = Math.floor(name.length * progress)
      setDisplay(
        name
          .split('')
          .map((char, index) =>
            char === ' ' || index < reveal
              ? char
              : symbols[(index + Math.floor(now / 55)) % symbols.length],
          )
          .join(''),
      )
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    const respond = () => {
      cancelAnimationFrame(frame)
      if (media.matches) setDisplay(name)
      else {
        start = 0
        frame = requestAnimationFrame(tick)
      }
    }
    respond()
    media.addEventListener('change', respond)
    return () => {
      cancelAnimationFrame(frame)
      media.removeEventListener('change', respond)
    }
  }, [name])
  const parts = display.split(' ')
  const original = name.split(' ')
  return (
    <h1 className={`anime-title ${japaneseEnabled ? 'name-switch' : ''}`} aria-label={name} tabIndex={japaneseEnabled ? 0 : undefined}>
      <span aria-hidden="true">
        <span className="title-width">{original[0]}</span>
        <span className="title-glyphs">{parts[0]}</span>
        <span className="title-katakana" lang="ja"><Copy id="components.anime.title.tsx.1" /></span>
      </span>
      <span aria-hidden="true">
        <span className="title-width">{original.slice(1).join(' ')}</span>
        <span className="title-glyphs">{parts.slice(1).join(' ')}</span>
        <span className="title-katakana" lang="ja"><Copy id="components.anime.title.tsx.2" /></span>
      </span>
      <i className="name-cut" aria-hidden="true" />
    </h1>
  )
}
