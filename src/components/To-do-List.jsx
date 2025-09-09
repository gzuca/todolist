import React, { useState, useEffect } from "react";
import AddNewTask from "./addTask";
import TasksList from "./TasksList";

function ToDoList() {
  // Inicializamos el estado desde localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [NewTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem("name");
    return savedName || "";
  });
  const [inputName, setInputName] = useState("");

  // Guardar tareas cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Guardar nombre cada vez que cambie
  useEffect(() => {
    if (name) localStorage.setItem("name", name);
  }, [name]);

  const addTask = (e) => {
    e.preventDefault();
    if (NewTask.trim() === "") return;

    const newTaskObj = {
      id: Date.now(),
      text: NewTask.trim(),
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTaskText = (id, newText) => {
    const trimmed = newText.trim();
    if (trimmed === "") return;

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, text: trimmed } : task))
    );
  };

  const qtyCompleted = tasks.filter((task) => task.completed).length;
  const qtyPending = tasks.filter((task) => !task.completed).length;

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim() !== "") {
      setName(inputName.trim());
      setInputName("");
    }
  };

  return (
    <div>
      {name ? (
        <div className="to-do-list">
          <h1>THIS IS</h1>
          <h1>{name.toUpperCase()}'S</h1>
          <h1>TO-DO LIST</h1>

          <button className="all" onClick={() => setFilter("all")} style={{color:"rgba(255, 255, 255, 0.87)"}}>
            All <br /> Qty: {tasks.length}
          </button>
          <button className="completedButton" onClick={() => setFilter("completed")} style={{color:"rgba(255, 255, 255, 0.87)"}}>
            Completed <br /> Qty: {qtyCompleted}
          </button>
          <button className="pending" onClick={() => setFilter("pending")} style={{color:"rgba(255, 255, 255, 0.87)"}}>
            Pending <br /> Qty: {qtyPending}
          </button>

          <div className="body-container">
            <div className="addtask">
              <AddNewTask
                NewTask={NewTask}
                setNewTask={setNewTask}
                addTask={addTask}
                filter={filter}
              />
            </div>

            <div className="tasklist">
              <TasksList
                tasks={tasks}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                filter={filter}
                updateTaskText={updateTaskText}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <form className="input-name-form" onSubmit={handleNameSubmit}>
            <label>Please Type Your Name</label>
            <input
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <button type="submit">Enter Name</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ToDoList;
