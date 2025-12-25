"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LayoutGrid } from "../components/ui/layout-grid";

import codechef from "../assets/chef2.png";
import codeforces from "../assets/forces.png";
import github from "../assets/githubb.png";
import leetcode from "../assets/leetcode.png";
import DecryptedText from "../DecryptedText";

export default function CodingProfileDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      id: 1,
      thumbnail: github,
      className: "md:col-span-2 md:row-span-2",
      content: (
        <div>
          <h2 className="text-2xl font-bold text-white">GitHub</h2>
          <p className="text-gray-200 mt-2">
            Active contributor with multiple repositories showcasing projects,
            experiments, and real-world problem-solving skills.
          </p>
          <a
            href="https://github.com/Prachi-Gupta2808"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm font-semibold text-blue-400 underline"
          >
            Visit Profile →
          </a>
        </div>
      ),
    },
    {
      id: 2,
      thumbnail: codeforces,
      className: "md:col-span-1 md:row-span-2",
      content: (
        <div>
          <h2 className="text-2xl font-bold text-white">CodeForces</h2>
          <p className="text-gray-200 mt-2">
            Competitive programmer with experience in div-based contests and
            strong algorithmic foundations.
          </p>
          <a
            href="https://codeforces.com/profile/Prachi_Gupta28"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm font-semibold text-yellow-400 underline"
          >
            View Profile →
          </a>
        </div>
      ),
    },
    {
      id: 3,
      thumbnail: codechef,
      className: "md:col-span-1 md:row-span-2",
      content: (
        <div>
          <h2 className="text-2xl font-bold text-white">CodeChef</h2>
          <p className="text-gray-200 mt-2">
            Regular participant in rated contests, strengthening problem-solving
            speed and accuracy.
          </p>
          <a
            href="https://www.codechef.com/users/blossomm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm font-semibold text-orange-400 underline"
          >
            Visit Profile →
          </a>
        </div>
      ),
    },
    {
      id: 4,
      thumbnail: leetcode,
      className: "md:col-span-2 md:row-span-2",
      content: (
        <div>
          <h2 className="text-2xl font-bold text-white">LeetCode</h2>
          <p className="text-gray-200 mt-2">
            Solved algorithmic and data-structure problems focusing on interviews
            and optimization.
          </p>
          <a
            href="https://leetcode.com/u/Prachiiii__/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm font-semibold text-red-400 underline"
          >
            View Profile →
          </a>
        </div>
      ),
    },
  ];

  return (
    <section ref={ref} className="relative z-10 py-20">
      {/* Heading + Text */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-[#c83880] mb-6">
          <DecryptedText text="Coding Profiles" />
        </h1>

        <p className="max-w-2xl text-base md:text-xl mt-4 text-white">
          Active on multiple competitive programming platforms, solving challenging
          problems daily. Participated in contests and hackathons, honing
          problem-solving and algorithmic skills.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >
        <LayoutGrid cards={cards} />
      </motion.div>
    </section>
  );
}
