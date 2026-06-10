import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TodoApp from "./pages/TodoApp";
import PomodoroApp from "./pages/PomodoroApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/pomodoro" element={<PomodoroApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;