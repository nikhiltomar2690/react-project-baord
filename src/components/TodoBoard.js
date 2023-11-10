import React, { useState, useEffect } from "react";
import TodoList from "./Todolist";
import { v4 as uuidv4 } from "uuid";

const TodoBoard = () => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : { New: [], Pending: [], Completed: [] };
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    console.log("Updated State:", categories);
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const getTaskCount = (category) => {
    return categories[category].length;
  };

  const addTask = (category, task) => {
    const updatedCategories = { ...categories };
    updatedCategories[category] = [...categories[category], task];
    setCategories(updatedCategories);
  };

  const removeTask = (category, taskId) => {
    const updatedCategories = { ...categories };
    updatedCategories[category] = categories[category].filter(
      (task) => task.taskId !== taskId
    );
    setCategories(updatedCategories);
  };

  const handleDrop = (taskId, fromCategory, toCategory) => {
    const updatedCategories = { ...categories };

    // Find the task to move
    const taskToMove = updatedCategories[fromCategory].find(
      (task) => task.taskId === taskId
    );

    if (taskToMove) {
      // Remove task from the original category
      updatedCategories[fromCategory] = updatedCategories[fromCategory].filter(
        (task) => task.taskId !== taskId
      );

      // Update the task ID to ensure uniqueness in the new category
      taskToMove.taskId = uuidv4();

      // Add the task to the new category
      updatedCategories[toCategory].push(taskToMove);

      // Update the state with the modified categories
      setCategories(updatedCategories);
    }
  };

  return (
    <div className="todo-board">
      <div className="flex-container">
        {Object.entries(categories).map(([category, tasks]) => (
          <TodoList
            key={category}
            category={category}
            tasks={tasks}
            onAddTask={addTask}
            onRemoveTask={removeTask}
            onDrop={handleDrop}
            taskCount={getTaskCount(category)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoBoard;
