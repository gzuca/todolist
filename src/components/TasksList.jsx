import { useState, useRef, useEffect } from "react";
import React from "react";

function TasksList({ tasks, deleteTask, toggleComplete, filter, updateTaskText }) {
  const [editingTaskId, setEditingTaskID] = useState('');
  const [editText, setEditText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingTaskId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTaskId]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (filteredTasks.length === 0) return <h3>No tasks found!</h3>;

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li className="task-li" key={task.id}>
          <div className={`task-list-container ${task.completed ? "completed" : "pending"}`}>
            <div className={`task-list ${task.completed ? "completed" : "pending"}`}>
              {editingTaskId === task.id ? (
                <>
                  <input
                    ref={inputRef}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      updateTaskText(task.id, editText);
                      setEditingTaskID("");
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditText(task.text);
                      setEditingTaskID("");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                  }}
                >
                  {task.text}
                </span>
              )}
            </div>
            <div className="task-list-buttons">
              <div className="checkbox">
                <label htmlFor={`completed-${task.id}`}>Completed</label>
                <input
                  type="checkbox"
                  id={`completed-${task.id}`}
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
              </div>
              <button
                onClick={() => {
                  setEditingTaskID(task.id);
                  setEditText(task.text);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TasksList;
