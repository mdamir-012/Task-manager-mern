import React from "react";
import TaskCard from "./TaskCard";

function TaskList({ tasks, selectedTaskIds, onToggleSelect }) {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks yet. Create one to get started.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          selected={selectedTaskIds.includes(task._id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
}

export default TaskList;

