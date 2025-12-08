"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import Section from "@/components/Section";
import VoiceNote from "@/components/VoiceNote";
import Sparkles from "@/components/Sparkles";
import Timeline from "@/components/Timeline";
import OverlayQuote from "@/components/OverlayQuote";
import BollySparkles from "@/components/BollySparkles";
// Slideshow removed – we’re using photo collages now

/* Intro overlay – Karan Johar style */
function IntroOverlay({ show }) {
  if (!show) return null;
  return (
    <motion.div
      className="intro-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="intro-title">A Nisarg ❤️ Vishwa Story</div>
      <div className="intro-sub">
        From school benches to forever… this is our filmy kahaani.
      </div>
    </motion.div>
  );
}

/* Subtle monogram watermark */
function Monogram() {
  return (
    <motion.div
      className="monogram"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 0.28, scale: 1 }}
      transition={{ duration: 1.6, ease: "easeOut", delay: 1.4 }}
    >
      N <span>❤️</span> V
    </motion.div>
  );
}

/* Starburst particle effect for Chapter 3 */
function triggerStarBurst() {
  if (typeof document === "undefined") return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "burst-spark";
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 80;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    p.style.setProperty("--dx", `${dx}px`);
    p.style.setProperty("--dy", `${dy}px`);
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}

export default function Home() {
  const bgRef = useRef(null);      // background music
  const chimeRef = useRef(null);   // soft chime sfx
  const [showIntro, setShowIntro] = useState(true);

  // Hide intro overlay after a few seconds
  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 2600);
    return () => clearTimeout(t);
  }, []);

  // Start background music on first scroll
  useEffect(() => {
    const handleScroll = () => {
      const audio = bgRef.current;
      if (audio && audio.paused) {
        audio.play().catch(() => {});
      }
    };
    window.addEventListener("scroll", handleScroll, { once: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="main-wrapper">
      {/* global cinematic effects */}
      <Sparkles />
	  <BollySparkles />
      <div className="film-grain" />
      <div className="bokeh" />
      <IntroOverlay show={showIntro} />
      <Monogram />

      {/* background music + sound chime */}
      <audio ref={bgRef} src="/music/bg.mp3" loop preload="auto" />
      <audio ref={chimeRef} src="/sfx/chime.mp3" preload="auto" />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 10 : 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          onViewportEnter={() => {
            if (chimeRef.current) {
              chimeRef.current.play().catch(() => {});
            }
          }}
        >
          <div className="hero-date">Wedding • Feb 2026</div>

          <h1 className="hero-title">
            Our Story <span className="hero-highlight">Nisarg ❤️ Vishwa</span>
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 10 : 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
          >
            Some stories don’t start with a dramatic moment… they begin in
            school corridors, silly fights, teasing, and
            <br />
            <span className="hero-sub-highlight">
              “tum kitne irritating ho” kinds of lines.
            </span>
            <br />
            Destiny had already started writing ours long before we even
            realised it.
          </motion.p>
        </motion.div>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: showIntro ? 0 : 0.9 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          Scroll to begin ↓
        </motion.div>
      </section>
	  
      <Timeline />

      {/* Bollywood overlay between hero & Chapter 1 */}
      <OverlayQuote text="Picture abhi baaki hai, mere dost…" />

      {/* CHAPTER 1 — Where it all quietly began */}
      <Section
        id="chapter-1"
        label="Chapter One"
        title="Where it all quietly began"
        direction="left"
      >
        <div>
          <motion.p
            className="section-text"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            8th standard. Two kids. One friendship. A hundred fights, a thousand
            memories. We never thought we were writing a love story - but
            destiny quietly smiled and said, “picture abhi baaki hai mere dost”.
          </motion.p>

          <motion.p
            className="section-text"
            style={{ marginTop: 10 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            We shared school corridors, then tuition benches in 11th-12th, and
            later two different colleges - CEPT &amp; LD. But no matter how far
            life pulled us, somehow we always stayed connected. Exactly like
            those filmy moments where the heart quietly says, “kuch kuch hota
            hai… tum nahi samjhoge.”
          </motion.p>

          <div className="badge-row">
            <span className="badge">School partners in crime</span>
            <span className="badge">Destiny’s favourite kids</span>
          </div>
        </div>

        {/* CHAPTER 1 – 3 photos */}
        <div className="section-card">
          <div className="chapter-gallery">
            <motion.img
              src="/images/chapter1/c1_1.jpg"
              alt="Chapter 1 - photo 1"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <motion.img
              src="/images/chapter1/c1_2.jpg"
              alt="Chapter 1 - photo 2"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            />
            <motion.img
              src="/images/chapter1/c1_3.jpg"
              alt="Chapter 1 - photo 3"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <div className="photo-caption">
            Back then we were just kids… not knowing that this was the
            beginning of everything.
          </div>
        </div>
      </Section>

      {/* Bollywood overlay between C1 & C2 */}
      <OverlayQuote text="Kabhi kabhi kuch cheezein samajhne mein waqt lagta hai… par jab samajh aati hain, sab kuch badal jaata hai." />

      {/* CHAPTER 2 — The smiles I started waiting for */}
      <Section
        id="chapter-2"
        label="Chapter Two"
        title="The smiles I started waiting for"
        direction="right"
      >
        <div>
          <motion.p
            className="section-text"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            We don’t remember a “first message”… because we started talking when
            we were practically kids. But there was a moment when your smile
            stopped being just cute and became the highlight of my entire day.
          </motion.p>

          <motion.p
            className="section-text"
            style={{ marginTop: 10 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Your “Aje su thyu?”, your “BTW or you know what?”, your little care-filled
            questions… they felt like scenes from a movie. Slowly, your smile
            became my favourite notification, and somewhere in between those
            moments, my heart quietly chose you.
          </motion.p>

          <div className="badge-row">
            <span className="badge">Your smile ≡ my peace</span>
            <span className="badge">YJHD vibes</span>
          </div>
        </div>

        {/* CHAPTER 2 – 3 photos */}
        <div className="section-card">
          <div className="chapter-gallery">
            <motion.img
              src="/images/chapter2/c2_1.jpg"
              alt="Chapter 2 - photo 1"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <motion.img
              src="/images/chapter2/c2_2.jpg"
              alt="Chapter 2 - photo 2"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            />
            <motion.img
              src="/images/chapter2/c2_3.jpg"
              alt="Chapter 2 - photo 3"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <div className="photo-caption">
            The smile that made my world softer.
          </div>
        </div>
      </Section>

      {/* trigger starburst when Chapter 3 comes into view */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        onViewportEnter={triggerStarBurst}
      />

      {/* Bollywood overlay between C2 & C3 */}
      <OverlayQuote text="Kuch kuch hota hai… tum nahi samjhoge." />

      {/* CHAPTER 3 — What I fell in love with */}
      <Section
        id="chapter-3"
        label="Chapter Three"
        title="What I fell in love with (beyond your smile)"
        direction="left"
      >
        <div>
          <motion.p
            className="section-text"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            People ask, “Why do you love her?” And honestly - there isn’t one
            answer. It’s her love, her soft heart, her care, her loyalty, her
            innocence, her madness, her hunger-tantrums (yes, those dramatic
            food moments), the way she’s introvert to the world but full-on
            Bollywood heroine with me.
          </motion.p>

          <motion.p
            className="section-text"
            style={{ marginTop: 10 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            It’s the way she gives love like it’s her superpower. Like Bunny
            would say - jab wo saath hoti hai, lagta hai sab theek ho hi
            jaayega.
          </motion.p>

          <div className="love-grid">
            <div className="love-item">The way you love me</div>
            <div className="love-item">The way you care quietly</div>
            <div className="love-item">Your cute hunger mode</div>
            <div className="love-item">Your soft heart</div>
            <div className="love-item">Your loyalty</div>
            <div className="love-item">Your drama + innocence mix</div>
          </div>
        </div>

        {/* CHAPTER 3 – 3 photos */}
        <div className="section-card">
          <div className="chapter-gallery">
            <motion.img
              src="/images/chapter3/c3_1.jpg"
              alt="Chapter 3 - photo 1"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <motion.img
              src="/images/chapter3/c3_2.jpg"
              alt="Chapter 3 - photo 2"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            />
            <motion.img
              src="/images/chapter3/c3_3.jpg"
              alt="Chapter 3 - photo 3"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <div className="photo-caption">
            Every side of you - I didn’t just notice it… I fell for it.
          </div>
        </div>
      </Section>

      {/* overlay before Chapter 4 */}
      <OverlayQuote text="Yeh humari kahaani ke kuch favourite frames hain…" />

      {/* CHAPTER 4 — Now photos instead of slideshow */}
      <Section
        id="chapter-photos"
        label="Chapter Four"
        title="Frames from our journey"
        direction="right"
      >
        <div>
          <motion.p
            className="section-text"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            Some moments are too special to be explained - they’re meant to be
            seen, felt, remembered. These are a few of those little scenes that
            make our story feel like a film.
          </motion.p>
          <motion.p
            className="section-text"
            style={{ marginTop: 10 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            One day we&apos;ll keep adding more frames here - anniversaries,
            trips, festivals, and all the “normal” days that somehow still feel
            magical with you.
          </motion.p>
        </div>

        {/* CHAPTER 4 – 3 photos */}
        <div className="section-card">
          <div className="chapter-gallery">
            <motion.img
              src="/images/chapter4/c4_1.jpg"
              alt="Chapter 4 - photo 1"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            />
            <motion.img
              src="/images/chapter4/c4_2.jpg"
              alt="Chapter 4 - photo 2"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            />
            <motion.img
              src="/images/chapter4/c4_3.jpg"
              alt="Chapter 4 - photo 3"
              className="collage-img"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <div className="photo-caption">
            Some of our favourite frames - and many more to come.
          </div>
        </div>
      </Section>

      {/* overlay before voice note */}
      <OverlayQuote text="Zindagi bhar ke baaki saare scenes abhi likhne baaki hain…" />

      {/* CHAPTER 5 — Voice Note */}
      <Section
        id="chapter-4"
        label="A Small Pause"
        title="Before we step into forever…"
        direction="left"
      >
        <div>
          <motion.p
            className="section-text"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            Some feelings don’t look as beautiful in text as they sound straight
            from the heart. So this little corner is not just to show our
            photos… it’s to let you hear what you mean to me, in my own voice.
          </motion.p>

          <motion.p
            className="section-text"
            style={{ marginTop: 10 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Take a breath, put on your earphones if you want… and listen. This
            part is just for you.
          </motion.p>
        </div>

        <VoiceNote />
      </Section>

      {/* FINAL CHAPTER — The Beginning of Forever */}
      <section className="finale">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          onViewportEnter={() => {
            if (chimeRef.current) {
              chimeRef.current.play().catch(() => {});
            }
          }}
        >
          <p className="finale-line">
            We grew up together. Fought together. Laughed together.
          </p>
          <p className="finale-line">
            And somewhere between all this… friendship quietly turned into
            forever.
          </p>

          <p
            className="finale-line"
            style={{
              marginTop: 18,
              fontSize: "0.9rem",
              color: "#c1c1c6",
            }}
          >
            By the time you read this, there will be soft sand beneath your feet…
			a cold gentle wind wrapping itself around you…
			the sky will be dark, yet painted with the last colors of the day…
			and you’ll be surrounded by the people who love you the most.

			Water, air, beach (sand), sky - all four elements of nature will be here tonight…
			and in the middle of all of them… stands the fifth one.
			You.
			The one who completes my world.

			And in the presence of everything that feels like home…
			I want to say something I’ve felt for a long time…
			I love you.
			I always have.
			And I want to spend my whole life loving you.
            <br />
            Hamari filmy kahaani toh ab shuru ho rahi hai.
          </p>

          <div className="finale-heart">❤️</div>
        </motion.div>
      </section>
    </main>
  );
}
