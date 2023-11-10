import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { v4 as uuidv4 } from "uuid";

const TodoList = ({
  category,
  tasks,
  onAddTask,
  onRemoveTask,
  onDrop,
  taskCount,
}) => {
  const [newTaskInput, setNewTaskInput] = useState("");

  const addTask = () => {
    const newTaskWithId = { task: newTaskInput, taskId: uuidv4() };
    onAddTask(category, newTaskWithId);
    setNewTaskInput(""); // Clear input field after adding the task
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.setData("fromCategory", category);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const toCategory = category;
    const fromTaskId = e.dataTransfer.getData("text/plain");
    const fromCategory = e.dataTransfer.getData("fromCategory");

    if (fromCategory !== toCategory) {
      onDrop(fromTaskId, fromCategory, toCategory);
    }
  };

  return (
    <div
      className={`todo-list ${category}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2>
        {category} Tasks ({taskCount})
      </h2>
      <div className="task-container">
        {tasks.map(({ task, taskId }) => (
          <TaskCard
            key={taskId}
            task={task}
            taskId={taskId}
            onDragStart={(e) => handleDragStart(e, taskId)}
            onRemove={() => onRemoveTask(category, taskId)}
          />
        ))}
      </div>
      <div className="add-task">
        <input
          type="text"
          value={newTaskInput}
          placeholder={`Add a new ${category.toLowerCase()} task...`}
          onChange={(e) => setNewTaskInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />
        <button onClick={addTask} className="mobile-add-button">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoList;
