import Sidebar from "../components/todo/Sidebar";
import TodoBoard from "../components/todo/TodoBoard";
import background from "../assets/background.png";
import title from "../assets/Title.png";
import { useState, useEffect } from "react";
import Popup from "../components/todo/Popup";
import MusicPlayer from "../components/shared/MusicPlayer";
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

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [trash, setTrash] = useState(() => {
    const saved = localStorage.getItem("trash");
    return saved ? JSON.parse(saved) : [];
  });
  //handle popup------------------------------------
  const popupMessages = {
    clearAll: "Remove every task from the board",
    clearTrash: "Remove every task from the trash",
    clearCompleted: "Remove all completed tasks",
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  function handleConfirm() {
    if (confirmAction === "clearAll") confirmClearAll();
    if (confirmAction === "clearTrash") confirmClearTrash();
    if (confirmAction === "clearCompleted") confirmClearCompleted();
    setShowConfirm(false);
    setConfirmAction(null);
  }

  //handle clear trash popup------------------------
  function clearTrash() {
    setTrash([]);
  }

  function handleClearTrash() {
    setConfirmAction("clearTrash");
    setShowConfirm(true);
  }
  function confirmClearTrash() {
    clearTrash();
    setShowConfirm(false);
  }

  const [filter, setFilter] = useState("all");

  //handle clear all pop------------------------------------------

  function clearAll() {
    setTrash([...trash, ...tasks]);
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
    setTrash([...trash, ...completed]);
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

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("trash", JSON.stringify(trash));
  }, [trash]);

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

  const visibleTasks =
    filter === "completed"
      ? tasks.filter((t) => t.completed)
      : filter === "trash"
        ? trash
        : tasks;

  return (
    <div className="flex flex-col justify-center">
      <button
        onClick={() => {
          playSound();
          navigate("/pomodoro");
        }}
        className="font-pixel text-[14px] cursor-pointer fixed top-4 left-4 z-50"
        style={{
          width: "150px",
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
        Switch To Pomodoro
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
      <div className="flex justify-center">
        <img
          src={title}
          className="w-50"
          style={{ marginTop: "24px", marginBottom: "42px" }}
        />
      </div>

      <div className="flex flex-row justify-center" style={{ padding: "16px" }}>
        <TodoBoard
          tasks={visibleTasks}
          addTask={addTask}
          toggleTask={toggleTask}
          filter={filter}
        />

        <div
          className="absolute"
          style={{
            marginLeft: "16px",
            left: "calc(60% + 270px)",
            marginTop: "140px",
          }}
        >
          <Sidebar
            filter={filter}
            setFilter={setFilter}
            clearAll={handleClearAll}
            clearCompleted={handleClearCompleted}
            clearTrash={handleClearTrash}
          />
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
}

export default App;
