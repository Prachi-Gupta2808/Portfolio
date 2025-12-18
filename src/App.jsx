import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import myPhoto from "./assets/formalsMee.jpg";
import { HeroParallaxDemo } from "./components/HeroParallaxDemo";

import Cursor from "./Cursor";
import DecryptedText from "./DecryptedText";
import Intro from "./Intro";
import ScrollProgress from "./ScrollProgress";
import ShaderBackground from "./ShaderBackground";
import SideEmail from "./SideEmail";
import AchievementSticky from "./components/AchievementSticky";
import CardDemo from "./components/CardDemo";
import CodingProfileDemo from "./components/CodingProfileDemo";
import ContactDemo from "./components/Connect";


export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* Global layers */}
      <ShaderBackground />
      <Cursor />
      <SideEmail />
      <ScrollProgress />

      {/* Intro */}
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}

      {/* Main Site */}
      {!showIntro && (
        <>
          {/* ================= HERO SECTION ================= */}
<main className="min-h-screen text-white relative z-10 flex justify-center px-4 sm:px-6 md:px-16 pt-20 md:pt-24">
  <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-32 max-w-6xl w-full">

    {/* LEFT: Photo */}
    <motion.div
      className="flex justify-center w-full md:w-auto"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        className="perspective transition-transform duration-200 ease-out group w-64 sm:w-72 md:w-80"
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const xNorm = (x / rect.width - 0.5) * 2;
          const yNorm = (y / rect.height - 0.5) * 2;

          card.style.transform = `
            perspective(1000px)
            rotateX(${-yNorm * 12}deg)
            rotateY(${xNorm * 12}deg)
            scale(1.05)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
          `;
        }}
      >
        <img
          src={myPhoto}
          alt="Prachi Gupta"
          className="w-full h-80 sm:h-88 md:h-96 object-cover rounded-2xl shadow-xl object-bottom
                     group-hover:grayscale transition-all duration-500 pointer-events-none"
        />
      </div>
    </motion.div>

    {/* RIGHT: Text Content */}
    <motion.div
      className="w-full md:w-auto max-w-xl text-center md:text-left"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug mb-4">
        I&apos;m <span className="text-[#c83880]">Prachi Gupta</span>
        <br />
        <span className="text-base sm:text-lg md:text-2xl font-medium text-gray-200">
          <DecryptedText text="Full-Stack Developer & Competitive Programmer" />
        </span>
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed mb-6 px-2 sm:px-0">
        I’m currently pursuing my B.Tech in Computer Science Engineering at
        <span className="text-white font-medium"> IIIT Kota</span>.
        <br /><br />
        I’m passionate about building smooth, responsive UIs with
        animations and performance in mind. I’m also a competitive
        programming enthusiast with several accomplishments.
        <br /><br />
        Outside of code, I’m a published author, a book nerd, and a
        passionate gamer.
      </p>

      {/* Social Icons */}
      <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mt-2">
        <SocialLink href="mailto:prachig2808@gmail.com" label="Email" icon={<FaEnvelope />} />
        <SocialLink href="https://www.linkedin.com/in/prachi-gupta-74122a324" label="LinkedIn" icon={<FaLinkedin />} />
        <SocialLink href="https://github.com/Prachi-Gupta2808" label="GitHub" icon={<FaGithub />} />
        <SocialLink href="https://leetcode.com/u/Prachiiii__/" label="LeetCode" icon={<SiLeetcode />} />
        <SocialLink href="https://codeforces.com/profile/Prachi_Gupta28" label="Codeforces" icon={<SiCodeforces />} />
      </div>
    </motion.div>
  </div>
</main>

          <HeroParallaxDemo />
          <CardDemo/>
          <AchievementSticky/>
          <CodingProfileDemo/>
          <ContactDemo/>
          <p className="text-white text-lg text-center mt-4 py-20">
  Made with <span className="text-white">♡</span> by Prachi
</p>
        </>
      )}
    </>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-wrapper"
    >
      <div className="social-btn">{icon}</div>
      <span className="social-label">{label}</span>
    </a>
  );
}
