import { useState, useEffect } from "react";
import title from "../assets/TitlePomo.png";
import background from "../assets/background.png";
import MusicPlayer from "../components/shared/MusicPlayer";
import Timer from "../components/pomodoro/Timer";
import InputBox from "../components/pomodoro/InputBox";
import ItemBox from "../components/pomodoro/ItemBox";
import KebabMenu from "../components/pomodoro/Menu";
import Popup from "../components/pomodoro/Popup";
import { useNavigate } from "react-router-dom";
import buttonPress from "../assets/ButtonPress.mp3";

const audio = new Audio(buttonPress);
audio.preload = "auto";
function App() {
  function playSound() {
    audio.currentTime = 0;
    audio.play();
  }
  const navigate = useNavigate();

  const [input, setInput] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleAdd() {
    if (input.trim() === "") return;
    addTask(input);
    setInput("");
  }

  //handle popup------------------------------------
  const popupMessages = {
    clearAll: "Remove every task from the board",
    clearCompleted: "Remove all completed tasks",
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  //----------------handle confirm-----------------------------------
  function handleConfirm() {
    if (confirmAction === "clearAll") confirmClearAll();
    if (confirmAction === "clearCompleted") confirmClearCompleted();
    setShowConfirm(false);
    setConfirmAction(null);
  }
  //handle clear all pop------------------------------------------

  function clearAll() {
    setTasks([]);
  }
  function handleClearAll() {
    setConfirmAction("clearAll");
    setShowConfirm(true);
  }
  function confirmClearAll() {
    clearAll();
    setShowConfirm(false);
  }

  //handle completed pop up------------------------------------------

  function clearCompleted() {
    const completed = tasks.filter((t) => t.completed);
    const remaining = tasks.filter((t) => !t.completed);
    setTasks(remaining);
  }
  function handleClearCompleted() {
    setConfirmAction("clearCompleted");
    setShowConfirm(true);
  }
  function confirmClearCompleted() {
    clearCompleted();
    setShowConfirm(false);
  }
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <button
        onClick={() => {
          playSound();
          navigate("/todo");
        }}
        className="font-pixel text-[14px] cursor-pointer fixed top-4 left-4 z-50"
        style={{
          padding: "8px 16px",
          border: "3px solid #926454",
          borderRadius: "8px",
          background: "#E8CFA7",
          color: "white",
          textShadow:
            "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
        }}
      >
        Switch To Todo
      </button>
      {showConfirm && (
        <Popup
          message={popupMessages[confirmAction]}
          onConfirm={handleConfirm}
          onCancel={() => {
            setShowConfirm(false);
            setConfirmAction(null);
          }}
        />
      )}
      <img
        src={background}
        aria-hidden="true"
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: "center 65%" }}
      />
      <div className="flex">
        <img
          src={title}
          className="w-80"
          style={{ marginTop: "56px", marginBottom: "42px" }}
        />
      </div>

      <div className="flex">
        <Timer />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <InputBox input={input} setInput={setInput} addTask={handleAdd} />
          <KebabMenu
            options={[
              {
                label: "Clear Finished",
                onClick: () => handleClearCompleted(),
              },
              { label: "Clear All", onClick: () => handleClearAll() },
            ]}
          />
        </div>
        <div>
          {tasks.map((task) => (
            <ItemBox key={task.id} task={task} toggleTask={toggleTask} />
          ))}
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
}

export default App;
