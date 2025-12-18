import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

export default function Intro({ onComplete }) {
  const introRef = useRef(null);
  const circleRef = useRef(null);
  const helloRef = useRef(null);
  const nameRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      // HELLO animation
      tl.from(helloRef.current.children, {
        y: 110,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power4.out",
      })

        // Bottom circle rise
        .fromTo(
          circleRef.current,
          { y: "100%", scale: 1 },
          { y: "100%", duration: 1 },
          "-=1"
        )

        // Bottom circle expand
        .to(circleRef.current, {
          scale: 8,
          duration: 2,
          ease: "power4.inOut",
        })

        // Name reveal
        .fromTo(
          nameRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=1.3"
        )

        // Hold
        .to({}, { duration: 0.4 })

        // Push through
        .to(nameRef.current, {
          scale: 3,
          z: 500,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.5,
          ease: "power4.in",
          transformOrigin: "center center",
        })

        // Fade out intro
        .to(introRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
    }, introRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={introRef}
      className="fixed inset-0 overflow-hidden z-[999]"
      style={{
        background: "linear-gradient(130deg, #E212FC, #111, #4812FC)",
        perspective: "1200px",
      }}
    >
      

      {/* HELLO */}
      <div
        ref={helloRef}
        className="absolute inset-0 flex items-center justify-center gap-2
                   text-white text-5xl font-bold tracking-widest z-20"
      >
        {"HELLO!!".split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>

      {/* Bottom Circle */}
      <div
        ref={circleRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2
                   w-[600px] h-[600px] bg-black rounded-full
                   scale-0 origin-bottom z-30"
      />

      {/* NAME */}
      <h1
        ref={nameRef}
        className="absolute inset-0 flex items-center justify-center
                   text-5xl font-bold tracking-widest z-40 opacity-0"
        style={{
          background: "linear-gradient(50deg, #fff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transformStyle: "preserve-3d",
        }}
      >
        I'M&nbsp;PRACHI
      </h1>
    </div>
  );
}
