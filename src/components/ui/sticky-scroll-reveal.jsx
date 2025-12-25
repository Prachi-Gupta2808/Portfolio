"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "../../lib/utils";

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, index) => index / (cardLength - 0.5));
    for (let i = 0; i < breakpoints.length; i++) {
      if (latest >= breakpoints[i] - 0.05 && latest < (breakpoints[i + 1] ?? 1)) {
        setActiveCard(i);
        break;
      }
    }
  });

  return (
    <div ref={ref} className="relative mx-auto max-w-7xl px-6 py-10 flex flex-col lg:flex-row gap-10 lg:gap-20">
      <div className="flex-1">
        {content.map((item, index) => (
          <div key={index} className="min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center mb-10 lg:mb-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
                y: activeCard === index ? 0 : 10,
              }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
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
              className="mt-4 sm:mt-6 max-w-md text-base sm:text-lg text-gray-300 leading-relaxed"
            >
              {item.description}
            </motion.p>

            {/* Mobile: show image below text */}
            <div className="mt-6 lg:hidden w-full flex justify-center">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: activeCard === index ? 1 : 0.5, scale: activeCard === index ? 1 : 0.96 }}
                transition={{ duration: 0.5 }}
                className="w-64 sm:w-72 h-64 sm:h-72 shadow-2xl bg-black/30 flex items-center justify-center p-2 rounded-md"
              >
                {item.content}
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block flex-1">
        <div className={cn("sticky top-32 flex items-center justify-center", contentClassName)}>
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-[400px] h-[400px] shadow-2xl bg-black/30 flex items-center justify-center p-4"
          >
            <div className="w-full h-full flex items-center justify-center">
              {content[activeCard]?.content}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
