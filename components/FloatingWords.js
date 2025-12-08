"use client";

import { motion } from "framer-motion";

const words = [
  "pyaar", "kabira", "safarnama", "dil se",
  "ishq", "yaadein", "ilahi", "meri jaan",
  "tum hi ho", "khwaab", "sukoon", "mehfil",
];

export default function FloatingWords() {
  return (
    <div className="falling-words-container">
      {words.map((word, i) => (
        <motion.div
          key={i}
          className="falling-word"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 10 + 14}px`,
            opacity: Math.random() * 0.5 + 0.3,
            animationDelay: `${Math.random() * 8}s`,
          }}
          animate={{
            y: ["-10%", "120%"],    // ⭐ Falling downwards
            x: [0, Math.random() * 40 - 20], // ⭐ Sway left-right
          }}
          transition={{
            duration: Math.random() * 10 + 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {word}
        </motion.div>
      ))}
    </div>
  );
}
