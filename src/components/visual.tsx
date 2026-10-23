'use client'

import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowUpRight,
  CircuitBoard,
  BrainCircuit,
  Users,
  RotateCcw,
} from 'lucide-react'

const modes = [
  {
    label: 'Engineering',
    icon: CircuitBoard,
    nodes: ['IDEA', 'BUILD', 'INTERFACE'],
  },
  {
    label: 'AI',
    icon: BrainCircuit,
    nodes: ['QUESTION', 'CONTEXT', 'RESPONSE'],
  },
  { label: 'Community', icon: Users, nodes: ['PEOPLE', 'IDEAS', 'CONNECTION'] },
]

export function StudioVisual({
  pillars,
}: {
  pillars: { title: string; description: string }[]
}) {
  const [active, setActive] = useState(0)
  const [spread, setSpread] = useState(false)
  const reduced = useReducedMotion()
  const id = useId()
  const bounds = useRef<HTMLDivElement>(null)
  const mode = modes[active]
  const Icon = mode.icon
  return (
    <div className="lab-console">
      <div className="console-titlebar">
        <span>
          <CircuitBoard size={14} />
          INTEREST EXPLORER
        </span>
        <span>SELECT A CHANNEL / MOVE THE NODES</span>
        <i aria-hidden="true" />
      </div>
      <div className="console-body">
        <div className="interest-editorial">
          <div
            className="interest-tabs"
            role="tablist"
            aria-label="Explore my interests"
            aria-orientation="vertical"
          >
            {modes.map((item, index) => (
              <button
                key={item.label}
                role="tab"
                id={`${id}-tab-${index}`}
                aria-controls={`${id}-panel`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (
                    ![
                      'ArrowLeft',
                      'ArrowRight',
                      'ArrowUp',
                      'ArrowDown',
                      'Home',
                      'End',
                    ].includes(event.key)
                  )
                    return
                  event.preventDefault()
                  const next =
                    event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? 2
                        : (active +
                            (['ArrowRight', 'ArrowDown'].includes(event.key)
                              ? 1
                              : 2)) %
                          3
                  setActive(next)
                  document.getElementById(`${id}-tab-${next}`)?.focus()
                }}
              >
                <span>0{index + 1}</span>
                <item.icon size={16} />
                {item.label}
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id={`${id}-panel`}
            aria-labelledby={`${id}-tab-${active}`}
            tabIndex={0}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, x: reduced ? 0 : -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.18 }}
              >
                <span className="mono">
                  CURRENT EXPLORATION / 0{active + 1}
                </span>
                <h3>{pillars[active]?.title || mode.label}</h3>
                <p>{pillars[active]?.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="playground-canvas" ref={bounds} data-mode={active}>
          <span className="playground-coordinate mono">
            IDEA MAPPING / INTERACTIVE SKETCH
          </span>
          <svg
            className="connection-lines"
            viewBox="0 0 600 400"
            fill="none"
            aria-hidden="true"
          >
            <path d="M120 240 300 100 480 260 120 240M300 100 300 300M120 240 300 300 480 260" />
            <circle cx="300" cy="200" r="155" />
            <circle cx="300" cy="200" r="110" />
          </svg>
          <div className="lab-core" aria-hidden="true">
            <Icon size={38} strokeWidth={1} />
          </div>
          {mode.nodes.map((label, index) => (
            <motion.div
              key={`${active}-${index}-${spread}`}
              className={`idea-fragment fragment-${index}`}
              drag={!reduced}
              dragConstraints={bounds}
              dragElastic={0.08}
              dragMomentum={false}
              initial={false}
              animate={{
                x: spread ? (index - 1) * 20 : 0,
                y: spread && index === 1 ? -15 : 0,
              }}
              transition={{ duration: reduced ? 0 : 0.35 }}
              whileDrag={{ scale: 1.04, zIndex: 5 }}
            >
              <span className="mono">NODE / 0{index + 1}</span>
              <strong>{label}</strong>
              <span className="node-indicator" aria-hidden="true" />
            </motion.div>
          ))}
          <div className="playground-tools">
            <span>
              Drag nodes to rearrange.
              <br />
              Or use the arrangement control.
            </span>
            <button onClick={() => setSpread(!spread)} aria-pressed={spread}>
              <RotateCcw size={13} />
              {spread ? 'Reset nodes' : 'Spread nodes'}
            </button>
          </div>
        </div>
      </div>
      <div className="console-status">
        <span>ENGINEERING + AI + COMMUNITY</span>
        <span>FOLLOW THE CONNECTIONS ↗</span>
      </div>
    </div>
  )
}
