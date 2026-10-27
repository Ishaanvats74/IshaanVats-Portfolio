'use client'
import { useCopy, Copy } from '@/components/presentation'

export function AnimeTitle({ name }: { name: string }) {
  const copy=useCopy()
  const japaneseEnabled=Boolean(copy('components.anime.title.tsx.1') && copy('components.anime.title.tsx.2'))
  const parts = name.split(' ')
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
