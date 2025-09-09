function AddNewTask({ NewTask, setNewTask, addTask }) {
  return (
    <div className="add-task-form-container">
      <h2>Add a New Task</h2>
      <div className="task-form">
        <form onSubmit={addTask}>
          <div className="newtask-input">
            <label htmlFor="addtask">New Task</label>
            <input
              type="text"
              className="addtask"
              value={NewTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
          <button className="new-task-button" type="submit">
            Add task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewTask;
