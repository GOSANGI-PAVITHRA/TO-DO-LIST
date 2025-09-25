import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // all, active, completed

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task.trim(), done: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  return (
    <div className="app-root">
      <div className="card">
        <h1>My To-Do List</h1>

        <div className="input-row">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* Filters */}
        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.length === 0 && <li className="empty">No tasks here!</li>}
          {filteredTasks.map((item, index) => (
            <li key={index} className={item.done ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleTask(index)}
                />
                <span className="task-text">{item.text}</span>
              </label>

              {/* Delete button */}
              <button
                onClick={() => deleteTask(index)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <footer className="footer">
          <span>{tasks.filter((t) => !t.done).length} tasks remaining</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
