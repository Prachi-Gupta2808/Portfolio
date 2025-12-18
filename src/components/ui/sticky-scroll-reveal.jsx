"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "../../lib/utils";

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);

  // 🔹 Normal page scroll (NO internal scrollbar)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const cardLength = content.length;

  // 🔹 Slower & smoother switching
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map(
      (_, index) => index / (cardLength - 0.5)
    );

    for (let i = 0; i < breakpoints.length; i++) {
      if (
        latest >= breakpoints[i] - 0.05 &&
        latest < (breakpoints[i + 1] ?? 1)
      ) {
        setActiveCard(i);
        break;
      }
    }
  });

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 py-10 flex gap-20"
    >
      {/* ================= LEFT: TEXT ================= */}
      <div className="flex-1">
        {content.map((item, index) => (
          <div
            key={index}
            className="min-h-[80vh] flex flex-col justify-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
                y: activeCard === index ? 0 : 10,
              }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              {item.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
                y: activeCard === index ? 0 : 10,
              }}
              transition={{ duration: 0.4 }}
              className="mt-6 max-w-md text-lg text-gray-300 leading-relaxed"
            >
              {item.description}
            </motion.p>
          </div>
        ))}
      </div>

      {/* ================= RIGHT: IMAGE ================= */}
      <div className="hidden lg:block flex-1">
        <div
          className={cn(
            "sticky top-32 flex items-center justify-center",
            contentClassName
          )}
        >
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="
              w-[400px] h-[400px]
              shadow-2xl
              bg-black/30
              flex items-center justify-center
              p-4
            "
          >
            {/* IMPORTANT: image wrapper */}
            <div className="w-full h-full flex items-center justify-center">
              {content[activeCard]?.content}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
