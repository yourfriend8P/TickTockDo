import { useState, useEffect, useRef } from "react";
import ButtonPress from "../../assets/ButtonPress.mp3";
import timerStart from "../../assets/timerStart.mp3";
import timerStop from "../../assets/timerStop.mp3";

const audio = new Audio(ButtonPress);
const audio2 = new Audio(timerStart);
const audio3 = new Audio(timerStop);
audio.preload = "auto";
audio2.preload = "auto";
audio3.preload = "auto";

function Timer() {
  function playSound() {
    audio.currentTime = 0;
    audio.play();
  }
  function playTimerStart() {
    audio2.currentTime = 0;
    audio2.play();
  }
  function playTimerStop() {
    audio3.currentTime = 0;
    audio3.play();
  }

  const MODES = {
    pomodoro: { label: "Focus", minutes: 25 },
    short: { label: "Short Break", minutes: 5 },
    long: { label: "Long Break", minutes: 15 },
  };

  const [mode, setMode] = useState("pomodoro");
  const [seconds, setSeconds] = useState(MODES.pomodoro.minutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Reset timer when mode changes
  useEffect(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setSeconds(MODES[mode].minutes * 60);
  }, [mode]);

  // Tick
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            playTimerStop();
            clearInterval(intervalRef.current);
            setRunning(false);
            if (mode == "pomodoro") setMode("short");
            else setMode("pomodoro");
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function reset() {
    clearInterval(intervalRef.current);
    setRunning(false);
    setSeconds(MODES[mode].minutes * 60);
  }

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  const buttonStyle = (active) => ({
    padding: "12px 24px",
    border: "3px solid #926454",
    borderRadius: "10px",
    background: active ? "#C3996D" : "#E8CFA7",
    color: "white",
    cursor: "pointer",
    textShadow:
      "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
    boxShadow: active
      ? "inset 0px 4px 4px rgba(0,0,0,0.3)"
      : "0px 4px 6px rgba(0,0,0,0.3), inset 0px -4px 2px rgba(0,0,0,0.2)",
    letterSpacing: "1px",
    lineHeight: "1",
  });

  return (
    <div
      className="flex flex-col items-center gap-8"
      style={{
        paddingLeft: "50px",
        paddingRight: "50px",
        paddingTop: "30px",
        paddingBottom: "30px",
        borderRadius: "10px",
        background: "rgba(181, 255, 245, 0.44)",
      }}
    >
      {/* Mode selector */}
      <div className="flex gap-7">
        {Object.entries(MODES).map(([key, val]) => (
          <button
            key={key}
            onClick={() => {
              playSound();
              setMode(key);
            }}
            className="font-pixel text-[24px]"
            style={buttonStyle(mode === key)}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Timer display */}
      <div
        className="font-pixel text-[200px] tracking-widest"
        style={{
          color: "#C99D73",
          textShadow:
            "1px 1px 0px #fff, -1px -1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff, 5px 5px 4px rgba(0, 0, 0, 0.92)",
          lineHeight: "1",
          padding: "16px 24px",
        }}
      >
        {mins}:{secs}
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            setRunning(!running);
            running ? "" : playTimerStart();
          }}
          className="font-pixel text-[24px]"
          style={buttonStyle(running)}
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            reset();
            playSound();
          }}
          className="font-pixel text-[24px]"
          style={buttonStyle(false)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
