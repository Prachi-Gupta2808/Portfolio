"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const intervalRef = useRef(null);

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 10000);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation();
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const canvasRef = useRef(null);
  const newDataRef = useRef([]);
  const inputRef = useRef(null);

  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);

    const computedStyles = getComputedStyle(inputRef.current);
    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));

    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#000";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData = [];

    for (let y = 0; y < 800; y++) {
      for (let x = 0; x < 800; x++) {
        const i = (y * 800 + x) * 4;
        if (pixelData[i + 3] > 0) {
          newData.push({
            x,
            y,
            r: 1,
            color: `rgba(${pixelData[i]},${pixelData[i + 1]},${pixelData[i + 2]},${pixelData[i + 3]})`,
          });
        }
      }
    }

    newDataRef.current = newData;
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start) => {
    const frame = (pos = start) => {
      requestAnimationFrame(() => {
        const next = [];

        newDataRef.current.forEach((p) => {
          if (p.x < pos) {
            next.push(p);
          } else {
            p.x += Math.random() > 0.5 ? 1 : -1;
            p.y += Math.random() > 0.5 ? 1 : -1;
            p.r -= Math.random() * 0.05;
            if (p.r > 0) next.push(p);
          }
        });

        newDataRef.current = next;
        const ctx = canvasRef.current?.getContext("2d");

        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          next.forEach(({ x, y, r, color }) => {
            if (x > pos) {
              ctx.fillStyle = color;
              ctx.fillRect(x, y, r, r);
            }
          });
        }

        if (next.length > 0) frame(pos - 8);
        else {
          setValue("");
          setAnimating(false);
        }
      });
    };

    frame(start);
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const maxX = newDataRef.current.reduce(
      (max, p) => (p.x > max ? p.x : max),
      0
    );

    animate(maxX);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    vanishAndSubmit();
    onSubmit && onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative max-w-xl mx-auto h-12 rounded-full overflow-hidden",
        "bg-white/60 backdrop-blur-md",
        "shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition"
      )}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute pointer-events-none scale-50 top-[20%] left-2 sm:left-8 origin-top-left",
          animating ? "opacity-100" : "opacity-0"
        )}
      />

      <input
        ref={inputRef}
        value={value}
        type="text"
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value);
            onChange && onChange(e);
          }
        }}
        className={cn(
          "w-full h-full bg-white/40 text-black text-sm sm:text-base",
          "rounded-full pl-4 sm:pl-10 pr-20 focus:outline-none",
          animating && "text-transparent"
        )}
      />

      <button
        disabled={!value}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full
                   bg-gradient-to-r from-purple-500 to-indigo-500
                   hover:from-purple-600 hover:to-indigo-600
                   transition flex items-center justify-center"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <motion.path
            d="M5 12h14"
            initial={{ strokeDasharray: "50%", strokeDashoffset: "50%" }}
            animate={{ strokeDashoffset: value ? 0 : "50%" }}
          />
          <path d="M13 6l6 6-6 6" />
        </motion.svg>
      </button>

      <div className="absolute inset-0 flex items-center pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              key={currentPlaceholder}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="text-gray-500 text-sm sm:text-base pl-4 sm:pl-12 truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
