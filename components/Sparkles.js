"use client";

import { useEffect } from "react";

export default function Sparkles() {
  useEffect(() => {
    const stars = [];

    for (let i = 0; i < 25; i++) {
      const star = document.createElement("div");
      star.className = "sparkle";
      star.style.left = Math.random() * 100 + "vw";
      star.style.animationDuration = 3 + Math.random() * 4 + "s";
      document.body.appendChild(star);
      stars.push(star);
    }

    return () => {
      stars.forEach((el) => el.remove());
    };
  }, []);

  return null;
}
