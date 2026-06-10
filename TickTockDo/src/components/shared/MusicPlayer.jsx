import { useState, useEffect } from "react";
import audio from "../../shared/musicPlayer";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(!audio.paused);
  const [volume, setVolume] = useState(audio.volume);

  useEffect(() => {
    audio.volume = volume;
  }, [volume]);

  function togglePlay() {
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }
  return (
    <div
      className="font-pixel fixed bottom-4 left-4 z-50 flex flex-col gap-2"
      style={{
        padding: "12px",
        border: "3px solid #926454",
        borderRadius: "10px",
        background: "#C3996D",
        boxShadow:
          "0px 8px 6px rgba(0,0,0,0.3), inset 0px -7px 2px rgba(0,0,0,0.25)",
        minWidth: "180px",
      }}
    >
      <p
        className="text-[16px]"
        style={{
          color: "white",
          textShadow:
            "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
          letterSpacing: "1.5px",
        }}
      >
        Lofi Music
      </p>

      {/* Play / Pause button */}
      <button
        onClick={togglePlay}
        className="cursor-pointer font-pixel text-[16px] text-white"
        style={{
          padding: "8px 16px",
          background: "#E8CFA7",
          border: "3px solid #926454",
          borderRadius: "8px",
          textShadow:
            "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
        }}
      >
        {playing ? "Pause" : "Play"}
      </button>

      {/* Volume slider */}
      <div className="flex items-center gap-2">
        <span
          className="text-[14px] text-white"
          style={{
            textShadow: "1px 1px 0px #000, -1px -1px 0px #000",
          }}
        >
          Vol
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full cursor-pointer"
          style={{ accentColor: "#926454" }}
        />
      </div>
    </div>
  );
}