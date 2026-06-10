import TaskCompletedSound from "../../assets/TaskCompleted.mp3";

const audio = new Audio(TaskCompletedSound);
audio.preload = "auto";

function ItemBox({ task, toggleTask }) {
  function playSound() {
    audio.currentTime = 0;
    audio.play();
  }
  return (
    <div
      className="task-enter flex flex-row items-center w-130"
      style={{
        padding: "16px",
        marginBottom: "16px",
        boxShadow:
          "0 -8px 4px 0 rgba(168, 121, 89, 0.60) inset, 37px 36px 14px 0 rgba(0, 0, 0, 0.00), 23px 23px 13px 0 rgba(0, 0, 0, 0.03), 13px 13px 11px 0 rgba(0, 0, 0, 0.10), 6px 6px 8px 0 rgba(0, 0, 0, 0.17), 1px 1px 5px 0 rgba(0, 0, 0, 0.19)",
        backgroundColor: task.completed ? "#C9B492" : "#E8CFA7",
      }}
    >
      <button
        onClick={() => {
          playSound();
          toggleTask(task.id);
        }}
        className="shrink-0 rounded-full w-10 h-10 hover:bg-[#A27D56] flex items-center justify-center cursor-pointer"
        style={{
          marginRight: "8px",
          backgroundColor: task.completed ? "#926454" : "#C59A6D", // green when done
        }}
      >
        {task.completed && (
          <span className="text-white font-bold text-[18px]">✓</span>
        )}
      </button>

      <div
        className="grow font-pixel text-[22px]"
        style={{
          color: "white",
          textShadow:
            "1px 1px 5px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
          letterSpacing: "1.5px",
          textDecoration: task.completed ? "line-through" : "none", // strikethrough when done
          opacity: task.completed ? 0.6 : 1,
          wordBreak: "break-all",
        }}
      >
        {task.text}
      </div>
    </div>
  );
}

export default ItemBox;
