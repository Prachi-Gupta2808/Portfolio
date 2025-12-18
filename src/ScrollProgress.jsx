import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Calculation of scroll progress
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      // GSAP animation for the vertical bar scale
      gsap.to(barRef.current, {
        scaleY: progress, // Scales the height from 0 to 1 (0% to 100%)
        transformOrigin: "top",
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", updateScroll);
    updateScroll();

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    // Positioning: fixed right-6 top-0, h-full centers the parent container vertically
    <div className="fixed right-6 top-0 h-full z-50 hidden md:flex items-center">
      {/* Background track for the progress bar */}
      <div className="relative w-[2px] h-40 bg-white/20 rounded-full">
        <div
          ref={barRef}
          // The bar starts at scaleY(0) and grows downwards
          className="absolute top-0 left-0 w-full h-full bg-white rounded-full"
          style={{
            transform: "scaleY(0)",
            boxShadow: "0 0 12px rgba(255,255,255,0.9)",
          }}
        />
      </div>
    </div>
  );
}