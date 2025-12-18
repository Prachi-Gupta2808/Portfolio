"use client";

import { motion } from "framer-motion";
import image3 from "../assets/bb.png";
import image2 from "../assets/grindspace.png";
import image1 from "../assets/healsync.png";
import image4 from "../assets/snapheal.png";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import DecryptedText from "../DecryptedText";
import useScrollToTop from "../utils/scrolltotop";

export default function CardDemo() {
  useScrollToTop();

  const cards = [
    {
      title: "HealSync",
      description:
        "A unified health platform that integrates health tracking, posture correction, and medicine reminders where user can login as doctor as well as patient.",
      imgSrc: image1,
      link: "https://healsync-ai-full.onrender.com/",
    },
    {
      title: "GrindSpace",
      description:
        "A collaborative workspace app for productivity and project management where students in tech can connect to similar students studying the same topics.",
      imgSrc: image2,
      link: "https://grind-space.vercel.app/",
    },
    {
      title: "Blossom Books",
      description:
        "A book listing platform with genres, top-rated books, and chatbot integration which matches the aesthetic a book lover craves for.",
      imgSrc: image3,
      link: "https://blossom-books.vercel.app/",
    },
    {
      title: "SnapHeal",
      description:
        "A skin disease detection platform (currently limited to data set of 3 diseases) which provides accurate detections with remedies.",
      imgSrc: image4,
      link: "https://snapheal.onrender.com/",
    },
  ];

  return (
    <>
      {/* ===== Projects Heading Section ===== */}
      <motion.div
  className="max-w-7xl mx-auto py-20 md:py-15 px-4 w-full flex flex-col items-center text-center"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <h1 className="text-3xl md:text-6xl font-bold text-[#c83880]">
    <span>
      <DecryptedText text="My Projects" />
    </span>
  </h1>

  <p className="max-w-2xl text-base md:text-xl mt-6 text-gray-200">
    A collection of real world projects showcasing my skills in frontend,
    backend, UI/UX, animations, and full-stack development along with my
    enthusiasm for website development.
  </p>
</motion.div>

      {/* ===== Cards Section ===== */}
      <div className="px-4 sm:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <CardContainer className="inter-var">
                <CardBody
                  className="
                    bg-black/70
                    relative group/card
                    hover:shadow-2xl
                    hover:shadow-emerald-500/[0.1]
                    border border-white/[0.08]
                    w-auto h-auto
                    rounded-xl
                    p-6
                  "
                >
                  <CardItem
                    translateZ={50}
                    className="text-xl font-bold text-white"
                  >
                    {card.title}
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ={60}
                    className="text-gray-300 text-sm max-w-sm mt-2"
                  >
                    {card.description}
                  </CardItem>

                  <CardItem translateZ={100} className="w-full mt-4">
                    <img
                      src={card.imgSrc}
                      alt={card.title}
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    />
                  </CardItem>

                  <div className="flex justify-between items-center mt-4">
                    <CardItem
                      translateZ={20}
                      as="a"
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-normal text-white"
                    >
                      Try now →
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
