import ToDoListBox from "../../assets/ToDoListBox.png";
import ItemBox from "./ItemBox";
import InputBox from "./InputBox";
import { useState } from "react";

function TodoBoard({ tasks, addTask, toggleTask, filter }) {
  const [input, setInput] = useState("");

  function handleAdd() {
    if (input.trim() === "") return;
    addTask(input);
    setInput("");
  }

  return (
    <div className="flex flex-col justify-center">
      <InputBox input={input} setInput={setInput} addTask={handleAdd} />

      <div className="relative inline-block">
        <img src={ToDoListBox} alt="todo box" className="w-full select-none" />
        <div
          className="absolute overflow-y-auto"
          style={{
            top: "14%",
            left: "10.5%",
            right: "10%",
            bottom: "15%",
            padding: "16px",
          }}
        >
          {tasks.map((task) => (
            <ItemBox key={task.id} task={task} toggleTask={toggleTask} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoBoard;
