"use client";

import { motion } from "framer-motion";

export default function OverlayQuote({ text }) {
  return (
    <motion.div
      className="overlay-quote"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7 }}
    >
      {text}
    </motion.div>
  );
}
