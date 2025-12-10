"use client";

import { useRef, useEffect, useState } from "react";

export default function VoiceNote() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Sync UI when audio ends naturally
    const onEnded = () => setPlaying(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch (err) {
        console.log("Audio play failed:", err);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <div className="voice-card">
      <div className="voice-label">VOICE NOTE</div>

      {/* Correct file path */}
      <audio ref={audioRef} src="/voice/message.mp3" preload="auto" />

      <button className="voice-button" onClick={toggleAudio}>
        {playing ? "⏸ Pause" : "▶ Play"}
      </button>

      <div className="voice-hint">Because some words sound better spoken.</div>
    </div>
  );
}
