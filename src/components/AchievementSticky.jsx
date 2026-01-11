"use client";

import { motion } from "framer-motion";
import DecryptedText from "../DecryptedText";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";

import algoqueen from "../assets/algoqueen.jpg";
import author from "../assets/author.jpg";
import codess from "../assets/codess.jpg";
import flipkart from "../assets/flipkart.jpg";
import gitinit from "../assets/gitinit.jpg";
import womenCP from "../assets/iiwcpc.jpg";
import paranox from "../assets/paranox.jpg";
import udbhav from "../assets/udbhav.jpg";

export default function AchievementSticky() {
  const achievements = [
    {
      title: "AIR-13 in India International Women's Competitive Programming Cup 2025",
      description:
        "IIWCPC is India's first ever knockout-based national contest hosted at IIT Guwahati and sponsored by Jane Street.",
      content: (
        <img
          src={womenCP}
          alt="IIWCP"
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain rounded-md"
        />
      ),
    },
    {
      title: "Semi Finalist - Flipkart Grid 7.0",
      description:
        "Participated in Flipkart Grid 7.0, gaining exposure to real-world problem solving, product thinking, and collaborative development and stood in top percentage till sem finals.",
      content: (
        <img
          src={flipkart}
          alt="Flipkart Grid"
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain rounded-md"
        />
      ),
    },
    {
      title: "Global 61 - ICPC AlgoQueen 2025",
      description:
        "ICPC AlgoQueen is a national-level competitive programming contest promoting women in CP and advanced algorithmic thinking, I secured rank 61 in it",
      content: (
        <img
          src={algoqueen}
          alt="AlgoQueen"
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain rounded-md"
        />
      ),
    },
    {
      title: "Semi Finalist - Inter IIIT Hackathon Udbhav 2025",
      description:
        "India's first ever inter IIIT hackathon where top-4 teams from each IIIT made it to semifinals, focusing on innovative problem-solving and impactful solutions.",
      content: (
        <img
          src={udbhav}
          alt="Udbhav"
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain rounded-md"
        />
      ),
    },
    {
      title: "Global Top 200 - Paranox 2.0",
      description:
        "India's largest student-run hackathon. My team ranked in the top 200 among 20,000+ participants.",
      content: (
        <img
          src={paranox}
          alt="Paranox"
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain rounded-md"
        />
      ),
    },
    {
      title: "Winner - Git Init Challenge",
      description:
        "Secured first position among 300+ students in a Git-based challenge hosted by GDG IIIT Kota.",
      content: (
        <img
          src={gitinit}
          alt="Git Init"
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain rounded-md"
        />
      ),
    },
    {
      title: "Published Author",
      description:
        "Author of the poetry collection 'Ending Up Emotionless', showcasing creative writing and strong vocabulary.",
      content: (
        <div className="flex items-center justify-center w-full h-64 sm:h-72 md:h-80 lg:h-96">
          <img
            src={author}
            alt="Published Author"
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain rounded-md"
          />
        </div>
      ),
    },
    {
      title: "Mentee - Codess.Cafe",
      description:
        "Selected among 5000+ applicants to be part of Codess.Cafe, a women-in-tech mentorship community.",
      content: (
        <img
          src={codess}
          alt="Codess Cafe"
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-contain rounded-md"
        />
      ),
    },
  ];

  return (
    <motion.section
      className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:py-32"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-3xl mx-auto py-12 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#c83880]">
          <DecryptedText text="Achievements" />
        </h1>

        <p className="mt-6 text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-2 sm:px-0">
          Explored diverse fields in computer science through competitive programming,
          hackathons, projects, and published work since the start of my college journey.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        <StickyScroll content={achievements} />
      </motion.div>
    </motion.section>
  );
}
