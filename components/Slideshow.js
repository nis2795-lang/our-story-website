"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/images/slide1.jpg",
    caption: "One of our favourite laughs.",
  },
  {
    src: "/images/slide2.jpg",
    caption: "A moment I never want to forget.",
  },
  {
    src: "/images/slide3.jpg",
    caption: "Just us, being us — perfectly imperfect.",
  },
];

export default function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const current = slides[index];

  return (
    <div className="slideshow">
      <div className="slide-frame">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.caption}
            className="slide-img"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>
      </div>
      <div className="slide-caption">{current.caption}</div>
      <div className="slide-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={"slide-dot" + (i === index ? " active" : "")}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
