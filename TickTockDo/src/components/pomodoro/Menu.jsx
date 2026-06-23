import { useState, useRef, useEffect } from "react";
import ButtonPress from "../../assets/ButtonPress.mp3";

const audio = new Audio(ButtonPress);
audio.preload = "auto";

function KebabMenu({ options }) {
  function playSound() {
    audio.currentTime = 0;
    audio.play();
  }
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* 3 dot button */}
      <button
        onClick={() => {
          playSound();
          setOpen(!open);
        }}
        className="font-pixel text-[20px] cursor-pointer flex items-center justify-center"
        style={{
          width: "36px",
          height: "36px",
          border: "3px solid #926454",
          borderRadius: "8px",
          background: open ? "#C3996D" : "#E8CFA7",
          color: "white",
          textShadow: "1px 1px 0px #000, -1px -1px 0px #000",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
        }}
      >
        ⋮
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 z-50 flex flex-col"
          style={{
            top: "44px",
            minWidth: "180px",
            background: "#E8CFA7",
            border: "3px solid #926454",
            borderRadius: "8px",
            boxShadow: "6px 6px 8px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => {
                playSound();
                opt.onClick();
                setOpen(false);
              }}
              className="font-pixel text-[14px] text-left cursor-pointer hover:bg-[#D1BA96]"
              style={{
                padding: "10px 16px",
                color: "white",
                textShadow:
                  "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
                borderBottom: "2px solid #926454",
                letterSpacing: "1px",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #C3996D",
                width: "100%",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default KebabMenu;
