"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WindowBoot() {
  const dots = useRef<HTMLSpanElement[]>([]);
  const progress = useRef({ t: 0 });

  useEffect(() => {
    const radius = 38;

    // phase offsets (90° apart)
    const phases = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

    // 🔁 ORBIT PHASE (true circular motion)
    const maxT = Math.PI * 4; // same as your t end value

    const orbit = gsap.to(progress.current, {
      t: maxT,
      duration: 2.2,
      ease: "none",
      onUpdate: () => {
        const normalized = progress.current.t / maxT;

        dots.current.forEach((dot, i) => {
          const angle = progress.current.t + phases[i];

          // Windows-like scale curve
          const scale = 1.5 + Math.pow(normalized, 1.5) * 0.8; // smooth growth

          gsap.set(dot, {
            x: Math.cos(angle) * radius * 1.4, // wider
y: Math.sin(angle) * radius * 0.8, // shorter

            scale,
          });
        });
      },
    });

    // 🟦 FORM SQUARE (curved settle)
    orbit.eventCallback("onComplete", () => {
      const dotSize = 12; // base dot size (w-3 h-3)
      const finalScale = 3; // your final scale
      const gap = 15;

      const half = (dotSize * finalScale) / 2 + gap;

      const square = [
        { x: -half, y: -half },
        { x: half, y: -half },
        { x: half, y: half },
        { x: -half, y: half },
      ];

      dots.current.forEach((dot, i) => {
        gsap.to(dot, {
          x: square[i].x,
          y: square[i].y,
          scale: 3,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="relative w-24 h-24 gap-5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) dots.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5
                       w-3 h-3 rounded-xl p-2
                       bg-sky-400
                       shadow-[0_0_12px_rgba(56,189,248,0.95)]"
          />
        ))}
      </div>
    </div>
  );
}
