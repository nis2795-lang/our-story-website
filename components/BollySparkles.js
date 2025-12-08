"use client";
import { useEffect } from "react";

export default function BollySparkles() {
  useEffect(() => {
    const createParticle = () => {
      const p = document.createElement("div");
      p.className = "bolly-spark";

      // Random heart or sparkle
      p.innerHTML = Math.random() > 0.6 ? "❤️" : "✨";

      p.style.left = Math.random() * 100 + "vw";
      p.style.fontSize = 14 + Math.random() * 10 + "px";
      p.style.animationDuration = 4 + Math.random() * 4 + "s";
      p.style.opacity = 0.5 + Math.random() * 0.5;

      document.body.appendChild(p);

      // Remove after animation
      setTimeout(() => p.remove(), 9000);
    };

    const interval = setInterval(createParticle, 600);
    return () => clearInterval(interval);
  }, []);

  return null;
}
