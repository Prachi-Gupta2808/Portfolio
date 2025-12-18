// SplineSection.jsx
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ThreeScene from "./ThreeScene";

export default function SplineSection() {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  const [ref, inView] = useInView({ threshold: 0.3 });

  // Scroll progress inside this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Tech stack animation from scroll
  const techOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const techX = useTransform(scrollYProgress, [0.2, 0.5], [-80, 0]);

  useEffect(() => {
    if (inView) controls.start({ opacity: 1 });
  }, [inView, controls]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center"
    >
      <motion.div
        ref={ref}
        className="w-full h-[80vh] relative flex items-center"
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 1 }}
      >
        {/* LEFT: Tech stack */}
        <motion.div
          style={{ opacity: techOpacity, x: techX }}
          className="z-10 ml-24 flex flex-col gap-4 text-white"
        >
          <TechItem text="React" />
          <TechItem text="Three.js" />
          <TechItem text="GSAP" />
          <TechItem text="Framer Motion" />
          <TechItem text="Node.js" />
        </motion.div>

        {/* RIGHT: Brain */}
        {/* RIGHT / LEFT FIXED Brain */}
<div
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
  style={{
    width: "420px",          // 🔒 FIXED SIZE
    height: "420px",
    perspective: "1400px",
    overflow: "hidden",      // 🔒 NO EXPANSION
  }}
>
  <motion.div
    className="w-full h-full"
    style={{
      transformStyle: "preserve-3d",
      transformOrigin: "center center", // 🎯 rotate in place
    }}
    animate={{ rotateY: 360 }}
    transition={{
      repeat: Infinity,
      duration: 30,
      ease: "linear",
    }}
  >
    <ThreeScene />
  </motion.div>
</div>

      </motion.div>
    </section>
  );
}

function TechItem({ text }) {
  return (
    <div className="flex items-center gap-3 text-lg">
      <span className="w-2 h-2 rounded-full bg-white" />
      {text}
    </div>
  );
}
