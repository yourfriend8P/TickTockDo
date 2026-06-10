import PopupButton from "./PopupButton";
import ButtonPress from "../../assets/ButtonPress.mp3";

const audio = new Audio(ButtonPress);
audio.preload = "auto";

function Popup({ onConfirm, onCancel, message }) {
  function playSound() {
    audio.currentTime = 0;
    audio.play();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onCancel}
      />

      {/* Popup box */}
      <div
        className="relative inline-flex flex-col justify-center items-center z-10"
        style={{
          width: "fit-content",
          gap: "10px",
          padding: "12px",
          border: "3px solid #926454",
          background: "#C59A6D",
          boxShadow:
            "0 -8px 4px 0 rgba(168, 121, 89, 0.60) inset, 37px 36px 14px 0 rgba(0, 0, 0, 0.00), 23px 23px 13px 0 rgba(0, 0, 0, 0.03), 13px 13px 11px 0 rgba(0, 0, 0, 0.10), 6px 6px 8px 0 rgba(0, 0, 0, 0.17), 1px 1px 5px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <div
          className="flex w-104 h-43 gap-2 flex-col bg-[#E8CFA7] font-pixel text-[24px]"
          style={{
            color: "white",
            paddingLeft: "20px",
            paddingTop: "10px",
            paddingRight: "20px",
            textShadow:
              "1px 1px 5px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
            letterSpacing: "1.5px",
            boxShadow:
              "37px 36px 14px 0 rgba(0, 0, 0, 0.00), 23px 23px 13px 0 rgba(0, 0, 0, 0.03), 13px 13px 11px 0 rgba(0, 0, 0, 0.10), 6px 6px 8px 0 rgba(0, 0, 0, 0.17), 1px 1px 5px 0 rgba(0, 0, 0, 0.19), 0 -8px 4px 0 rgba(168, 121, 89, 0.60) inset",
          }}
        >
          <p>Please Confirm</p>
          <p>{message}</p>
          <div className="flex flex-row justify-end">
            <PopupButton
              title="Cancel"
              onClick={() => {
                playSound();
                onCancel();
              }}
            />
            <PopupButton
              title="OK"
              onClick={() => {
                playSound();
                onConfirm();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
