import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    // Initial setup
    gsap.set([outer, inner], { xPercent: -50, yPercent: -50 });
    
    // Smooth follow for outer circle
    const followX = gsap.quickTo(outer, "x", { duration: 0.3, ease: "back.out(1.7)" });
    const followY = gsap.quickTo(outer, "y", { duration: 0.3, ease: "back.out(1.7)" });

    const move = (e) => {
      followX(e.clientX);
      followY(e.clientY);
      gsap.set(inner, { x: e.clientX, y: e.clientY });
    };

    const down = () => {
      gsap.to(outer, { scale: 2, duration: 0.15 });
      gsap.to(inner, { scale: 0, opacity: 0, duration: 0.15 });
    };

    const up = () => {
      gsap.to(outer, { scale: 1, duration: 0.2 });
      gsap.to(inner, { scale: 1, opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      {/* Outer circle */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none
                   w-8 h-8 rounded-full border-2 border-white"
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none
                   w-2 h-2 rounded-full bg-white"
      />
    </>
  );
}
