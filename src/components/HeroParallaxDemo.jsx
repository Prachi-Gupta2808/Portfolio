"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React from "react";
import DecryptedText from "../DecryptedText";
import useScrollToTop from "../utils/scrolltotop";

import bootstrap from "../assets/bootstrap.png";
import canva from "../assets/canva.png";
import css from "../assets/css.png";
import figma from "../assets/figma.png";
import git from "../assets/git.png";
import github from "../assets/github.png";
import html from "../assets/html.png";
import js from "../assets/js.png";
import mongo from "../assets/mongo.png";
import nodejs from "../assets/nodejs.png";
import python from "../assets/python.png";
import react from "../assets/react.png";
import c from "../assets/s.png";

export const products = [
  { title: "Tailwind CSS", image: css },
  { title: "HTML", image: html },
  { title: "C++", image: c },
  { title: "JavaScript", image: js },
  { title: "Figma", image: figma },
  { title: "GitHub", image: github },
  { title: "React", image: react },
  {title: "Gsap", image: "https://gsap.com/community/uploads/monthly_2020_03/tweenmax.png.cf27916e926fbb328ff214f66b4c8429.png"},
  { title: "Python", image: python },
  { title: "Bootstrap", image: bootstrap },
  { title: "Git", image: git },
  { title: "NodeJS", image: nodejs },
  { title: "Canva", image: canva },
  { title: "MongoDB", image: mongo },
  {title: "MySql", image:"https://pngimg.com/d/mysql_PNG9.png"},
];

export const HeroParallax = ({ products }) => {
  useScrollToTop();

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig
  );

  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -500]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );

  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-300, 0]),
    springConfig
  );

  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[180vh] py-20 overflow-hidden antialiased relative flex flex-col 
                 [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        <motion.div className="flex flex-row-reverse gap-12 mb-20 justify-center">
          {firstRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>

        <motion.div className="flex flex-row gap-12 mb-20 justify-center">
          {secondRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateXReverse} />
          ))}
        </motion.div>

        <motion.div className="flex flex-row-reverse gap-12 justify-center">
          {thirdRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Header
export const Header = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 md:py-20 px-4 w-full">
      <h1 className="text-3xl md:text-6xl font-bold text-[#c83880]">
        <DecryptedText text = "My Tech Stack"/>
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-6 text-gray-200">
        I am proficient with tools and languages like React.js, Node.js, MongoDB, MySQL, Tailwind CSS, Framer Motion, Gsap, JavaScript,
        HTML, CSS, C++, Python, Git, GitHub, Figma, Canva
      </p>
    </div>
  );
};

// Product Card (NO BG, NO CROP)
export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -12 }}
      className="h-55 w-55 relative shrink-0 flex items-center justify-center"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-full w-full object-contain"
      />
    </motion.div>
  );
};

// Demo Export
export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
