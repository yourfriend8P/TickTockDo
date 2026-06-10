import { useState } from "react";
import ButtonPress from "../../assets/ButtonPress.mp3";

function SideBarButton({ title, onClick, active }) {
  const audio = new Audio(ButtonPress);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // onMouseDown={() => setPressed(true)}
      // onMouseUp={() => setPressed(false)}
      className="w-full h-15 text-white font-bold flex justify-center items-center border-3  border-[#926454]  font-pixel text-[22px] cursor-pointer"
      style={{
        marginLeft: "8px",
        padding: "16px",
        borderRadius: "10px",
        // backgroundColor: hovered ? "#D1BA96" : active ? "#C3996D" : "#E8CFA7",
        backgroundColor: active ? "#C3996D" : hovered ? "#D1BA96" : "#E8CFA7",
        boxShadow:
          "0 -8px 4px 0 rgba(168, 121, 89, 0.60) inset, 37px 36px 14px 0 rgba(0, 0, 0, 0.00), 23px 23px 13px 0 rgba(0, 0, 0, 0.03), 13px 13px 11px 0 rgba(0, 0, 0, 0.10), 6px 6px 8px 0 rgba(0, 0, 0, 0.17), 1px 1px 5px 0 rgba(0, 0, 0, 0.19)",

        textShadow:
          "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
        letterSpacing: "1.5px",
        lineHeight: "1",
      }}
    >
      {title}
    </button>
  );
}

export default SideBarButton;
