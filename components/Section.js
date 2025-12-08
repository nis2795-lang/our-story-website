"use client";

import { useEffect, useRef } from "react";

export default function Section({ id, label, title, children, direction = "left" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add("cinematic-visible");
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  const dirClass =
    direction === "right"
      ? "cinematic-enter-right"
      : "cinematic-enter-left";

  return (
    <section id={id} ref={ref} className={`section-wrapper ${dirClass}`}>
      <div className="section-label">{label}</div>
      <h2 className="section-title">{title}</h2>

      <div className="section-content">{children}</div>
    </section>
  );
}
