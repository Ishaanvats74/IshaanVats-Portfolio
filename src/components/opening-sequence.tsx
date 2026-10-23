'use client'
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
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 1700)
    return () => clearTimeout(timer)
  }, [])
  return visible ? (
    <div className="opening-sting" aria-hidden="true">
      <span>PROLOGUE / {name.toUpperCase()}</span>
      <i />
      <span>THE STORY BEGINS.</span>
    </div>
  ) : null
}
