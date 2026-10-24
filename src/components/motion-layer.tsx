'use client'
import { usePathname } from 'next/navigation'
import { motion, useScroll } from 'motion/react'
import { EnergyCursor } from './energy-cursor'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
}

export function MotionLayer() {
  const pathname = usePathname()
  return (
    <>
      <ScrollProgress key={`progress:${pathname}`} />
      <EnergyCursor />
      <div key={`transition:${pathname}`} className="route-cut" aria-hidden="true"><i /></div>
    </>
  )
}
