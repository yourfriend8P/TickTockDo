import ToDoListBox from "../../assets/Vector.png";
import "../../index.css";
import TaskAddedSound from "../../assets/TaskAdded.mp3";

const audio = new Audio(TaskAddedSound);
audio.preload = "auto";

function InputBox({ input, setInput, addTask }) {
  function playSound() {
    audio.currentTime = 0;
    audio.play();
  }
  function handleSubmit(e) {
    e.preventDefault();
    addTask();
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-180 h-20 flex justify-center items-center"
        style={{
          padding: "10px",
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo...."
          className="todo-input bg-[#E8CFA7] grow h-full focus:outline-none flex-1 font-pixel text-[22px]"
          style={{
            padding: "16px",
            boxShadow:
              "0 -8px 4px 0 rgba(168, 121, 89, 0.60) inset, 37px 36px 14px 0 rgba(0, 0, 0, 0.00), 23px 23px 13px 0 rgba(0, 0, 0, 0.03), 13px 13px 11px 0 rgba(0, 0, 0, 0.10), 6px 6px 8px 0 rgba(0, 0, 0, 0.17), 1px 1px 5px 0 rgba(0, 0, 0, 0.19)",
            color: "white",
            textShadow:
              "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
            letterSpacing: "1.5px",
          }}
        />
        <button
          onClick={() => {
            if (input.trim() !== "") playSound();
            addTask();
          }}
          className="bg-[#E8CFA7] hover:bg-[#D1BA96] text-white font-bold flex justify-cemter items-center cursor-pointer"
          style={{
            marginLeft: "8px",
            width: "60px",
            height: "60px",
            padding: "16px",
            boxShadow:
              "0 -8px 4px 0 rgba(168, 121, 89, 0.60) inset, 37px 36px 14px 0 rgba(0, 0, 0, 0.00), 23px 23px 13px 0 rgba(0, 0, 0, 0.03), 13px 13px 11px 0 rgba(0, 0, 0, 0.10), 6px 6px 8px 0 rgba(0, 0, 0, 0.17), 1px 1px 5px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <img src={ToDoListBox} className="w-full select-none" />
        </button>
      </form>
    </div>
  );
}

export default InputBox;
