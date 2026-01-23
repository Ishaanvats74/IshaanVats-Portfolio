// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function WindowBoot() {
//   const dots = useRef<HTMLSpanElement[]>([]);
//   const progress = useRef({ t: 0 });

//   useEffect(() => {
//     const tl = gsap.timeline();

//     // Starting positions (scattered around in a circle)
//     const startRadius = 100;
//     const startPositions = [0, 1, 2, 3].map((i) => ({
//       x: Math.cos((i * Math.PI) / 2) * startRadius,
//       y: Math.sin((i * Math.PI) / 2) * startRadius,
//     }));

//     // Final square positions
//     const gap = 16;
//     const squarePositions = [
//       { x: -gap, y: -gap },
//       { x: gap, y: -gap },
//       { x: gap, y: gap },
//       { x: -gap, y: gap },
//     ];

//     // Set initial positions (circular formation)
//     dots.current.forEach((dot, i) => {
//       gsap.set(dot, {
//         x: startPositions[i].x,
//         y: startPositions[i].y,
//         scale: 1,
//         opacity: 1,
//       });
//     });

//     // Phase 1: Orbit in circle briefly
//     tl.to(progress.current, {
//       t: Math.PI * 2,
//       duration: 1.2,
//       ease: "none",
//       onUpdate: () => {
//         const angle = progress.current.t;
//         dots.current.forEach((dot, i) => {
//           const dotAngle = angle + (i * Math.PI / 2);
//           gsap.set(dot, {
//             x: Math.cos(dotAngle) * startRadius,
//             y: Math.sin(dotAngle) * startRadius,
//           });
//         });
//       },
//     })
//     // Phase 2: Transform to square and continue spinning
//     .to(dots.current, {
//       x: (i) => squarePositions[i].x,
//       y: (i) => squarePositions[i].y,
//       duration: 0.6,
//       ease: "power2.inOut",
//     })
//     // Phase 3: Spin the square continuously
//     .to(progress.current, {
//       t: Math.PI * 100,
//       duration: 20,
//       ease: "none",
//       repeat: -1,
//       onUpdate: () => {
//         const angle = progress.current.t;
//         dots.current.forEach((dot, i) => {
//           const dotAngle = angle + (i * Math.PI / 2);
//           gsap.set(dot, {
//             x: Math.cos(dotAngle) * gap * Math.sqrt(2),
//             y: Math.sin(dotAngle) * gap * Math.sqrt(2),
//           });
//         });
//       },
//     });
//   }, []);

//   return (
//     <div className="h-screen w-screen bg-black flex items-center justify-center">
//       <div className="relative w-24 h-24 gap-5">
//         {[0, 1, 2, 3].map((i) => (
//           <span
//             key={i}
//             ref={(el) => {
//               if (el) dots.current[i] = el;
//             }}
//             className="absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5
//                        w-3 h-3 rounded-xl p-2
//                        bg-sky-400
//                        shadow-[0_0_12px_rgba(56,189,248,0.95)]"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function WindowBoot() {
  const dots = useRef<HTMLSpanElement[]>([]);
  const progress = useRef({ t: 0 });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Starting positions (circular formation)
    const startRadius = 120;
    const startPositions = [0, 1, 2, 3].map((i) => ({
      x: Math.cos((i * Math.PI) / 2) * startRadius,
      y: Math.sin((i * Math.PI) / 2) * startRadius,
    }));

    // Square positions
    const gap = 20;
    const squarePositions = [
      { x: -gap, y: -gap },
      { x: gap, y: -gap },
      { x: gap, y: gap },
      { x: -gap, y: gap },
    ];

    // Set initial positions
    dots.current.forEach((dot, i) => {
      gsap.set(dot, {
        x: startPositions[i].x,
        y: startPositions[i].y,
        scale: 1,
        opacity: 1,
        rotation: 0,
      });
    });

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Animation timeline
    tl
      // Phase 1: Circular orbit with pulsing
      .to(progress.current, {
        t: Math.PI * 3,
        duration: 1.5,
        ease: "power1.inOut",
        onUpdate: () => {
          const angle = progress.current.t;
          dots.current.forEach((dot, i) => {
            const dotAngle = angle + (i * Math.PI) / 2;
            const pulse = 1 + Math.sin(angle * 3) * 0.3;
            gsap.set(dot, {
              x: Math.cos(dotAngle) * startRadius,
              y: Math.sin(dotAngle) * startRadius,
              scale: pulse,
              rotation: angle * 80,
            });
          });
        },
      })
      // Phase 2: Spiral inward
      .to(progress.current, {
        t: Math.PI * 6,
        duration: 1,
        ease: "power2.in",
        onUpdate: () => {
          const angle = progress.current.t;
          const progressValue = (angle - Math.PI * 3) / (Math.PI * 3);
          dots.current.forEach((dot, i) => {
            const dotAngle = angle * 2 + (i * Math.PI) / 2;
            const radius = startRadius * (1 - progressValue);
            gsap.set(dot, {
              x: Math.cos(dotAngle) * radius,
              y: Math.sin(dotAngle) * radius,
              scale: 1.5 - progressValue * 0.5,
              rotation: angle * 120,
            });
          });
        },
      })
      // Phase 3: Form square
      .to(dots.current, {
        x: (i) => squarePositions[i].x,
        y: (i) => squarePositions[i].y,
        scale: 1,
        duration: 0.6,
        ease: "back.out(2)",
      })
      // Phase 4: Gentle square spin
      .to(progress.current, {
        t: Math.PI * 20,
        duration: 8,
        ease: "none",
        onUpdate: () => {
          const angle = progress.current.t;
          const wobble = Math.sin(angle * 0.3) * 2;
          dots.current.forEach((dot, i) => {
            const dotAngle = angle + (i * Math.PI) / 2;
            const distance = gap * Math.sqrt(2);
            gsap.set(dot, {
              x: Math.cos(dotAngle) * distance,
              y: Math.sin(dotAngle) * distance + wobble,
              scale: 1 + Math.sin(angle * 2 + i) * 0.15,
            });
          });
        },
        onComplete: () => {
          setLoadingProgress(100);
          setTimeout(() => {
            setIsComplete(true);
          }, 800);
        },
      });

    return () => {
      clearInterval(progressInterval);
      tl.kill();
    };
  }, []);

  if (isComplete) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br bg-black flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Welcome
          </h1>
          <p className="text-xl text-blue-200">
            Loading portfolio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br bg-black flex flex-col items-center justify-center gap-12">
      {/* Animation Container */}
      <div className="relative w-24 h-24">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) dots.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5
                       w-3 h-3 rounded-xl
                       bg-sky-400
                       shadow-[0_0_20px_rgba(56,189,248,0.8)]"
          />
        ))}
      </div>

      {/* Loading Text & Progress */}
      <div className="text-center space-y-4">
        <div className="text-blue-200 text-lg font-light tracking-widest">
          INITIALIZING
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(56,189,248,0.5)]"
            style={{ width: `${Math.min(loadingProgress, 100)}%` }}
          />
        </div>
        
        <div className="text-sky-300 text-sm font-mono">
          {Math.min(Math.round(loadingProgress), 100)}%
        </div>
      </div>
    </div>
  );
}