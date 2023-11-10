import React, { useState } from "react";

const TaskCard = ({ category, task, taskId, onRemove, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, category, taskId)}
      className={`task-card ${category}`}
    >
      <div className="task-content">
        <p>{task}</p>
        <button onClick={onRemove}>X</button>
      </div>
    </div>
  );
};

export default TaskCard;
