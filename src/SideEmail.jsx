import React from "react";

export default function SideEmail() {
  return (
    <div className="fixed left-6 bottom-0 z-50 hidden md:flex flex-col items-center gap-4">
      <a
        href="mailto:prachig2808@gmail.com"
        className="text-white text-sm tracking-widest hover:text-gray-300 transition"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        prachig2808@gmail.com
      </a>

      {/* Line */}
      <span className="w-[2px] h-24 bg-white opacity-60" />
    </div>
  );
}
