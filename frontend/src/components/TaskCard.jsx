import React from "react";
import AttachmentPreview from "./AttachmentPreview";

function TaskCard({ task, selected, onToggleSelect }) {
  return (
    <div className={`task-card ${selected ? "task-card--selected" : ""}`}>
      <div className="task-card__header">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(task._id)}
        />
        <h3>{task.title}</h3>
      </div>
      {task.description && (
        <p className="task-card__description">{task.description}</p>
      )}
      {task.attachments && task.attachments.length > 0 && (
        <div className="task-card__attachments">
          {task.attachments.map((att, index) => (
            <AttachmentPreview key={index} attachment={att} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskCard;

