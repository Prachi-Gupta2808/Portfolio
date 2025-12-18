import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 1,
    });

    const followX = gsap.quickTo(cursor, "x", {
      duration: 0.3,
      ease: "back.out",
    });
    const followY = gsap.quickTo(cursor, "y", {
      duration: 0.3,
      ease: "back.out",
    });

    const move = (e) => {
      followX(e.clientX);
      followY(e.clientY);
    };

    const down = () => {
      gsap.to(cursor, { scale: 1.8, duration: 0.15 });
    };

    const up = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
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
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[99999] pointer-events-none
                 w-4 h-4 rounded-full bg-white"
    />
  );
}
