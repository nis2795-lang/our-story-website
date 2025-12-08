"use client";

import { useRef, useState } from "react";

export default function VoiceNote() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="voice-card">
      <div className="voice-label">VOICE NOTE</div>

      <audio ref={audioRef} src="/music/voice-note.mp3" preload="auto" />

      <button className="voice-button" onClick={toggleAudio}>
        {playing ? "⏸ Pause" : "▶ Play"}
      </button>

      <div className="voice-hint">
        Because some words sound better spoken.
      </div>
    </div>
  );
}
