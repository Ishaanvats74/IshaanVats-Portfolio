'use client'
import { Copy } from '@/components/presentation'
import { useEffect, useState } from 'react'

/** A non-blocking title sting, never a simulated loading gate. */
export function OpeningSequence({ name }: { name: string }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    try {
      if (sessionStorage.getItem('crimson-opening')) return
      sessionStorage.setItem('crimson-opening', 'seen')
    } catch {
      return
    }
    const frame = requestAnimationFrame(() => setVisible(true))
    const timer = setTimeout(() => setVisible(false), 1700)
    return () => { cancelAnimationFrame(frame); clearTimeout(timer) }
  }, [])
  return visible ? (
    <div className="opening-sting" aria-hidden="true">
      <span><Copy id="components.opening.sequence.tsx.1" /> {name.toUpperCase()}</span>
      <i />
      <span><Copy id="components.opening.sequence.tsx.2" /></span>
    </div>
  ) : null
}
