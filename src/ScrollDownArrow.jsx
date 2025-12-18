import { motion } from "framer-motion";

export default function ScrollDownArrow() {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
      onClick={() =>
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
      }
    >
      <span className="text-[#c83880] text-sm mb-2 tracking-widest">
        SCROLL DOWN
      </span>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-[#c83880] text-3xl"
      >
        ↓
      </motion.div>
    </motion.div>
  );
}
