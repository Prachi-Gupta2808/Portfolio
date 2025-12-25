"use client";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import DecryptedText from "../DecryptedText";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";

export default function ContactDemo() {
  const placeholders = [
    "Let's discuss a project..",
    "Are you proficient with any other skill?",
    "Would like you to mail me!",
    "Hello, it's nice knowing you",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = e.target.querySelector("input")?.value;
    if (!message) return;

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          message: message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert("Message sent successfully!!");
      })
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 space-y-6 py-20"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Heading */}
      <h2 className="text-4xl font-bold text-center text-[#c83880]">
        <DecryptedText text="Hey, let's connect!" />
      </h2>

      {/* Subtext */}
      <p className="text-center text-zinc-200">
        Leave a message with your name and email below
      </p>

      {/* Input */}
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onSubmit={handleSubmit}
      />
    </motion.div>
  );
}
