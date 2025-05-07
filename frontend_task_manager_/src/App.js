import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/tasks/").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const handleAdd = () => {
    axios.post("http://localhost:8000/api/tasks/", { title }).then((res) => {
      setTasks([...tasks, res.data]);
      setTitle("");
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleAdd}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;