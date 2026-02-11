import React from "react";

function AttachmentPreview({ attachment }) {
  if (attachment.type === "image") {
    return (
      <div className="attachment attachment--image">
        <img src={attachment.data} alt={attachment.filename || "Task"} />
      </div>
    );
  }

  if (attachment.type === "link") {
    return (
      <div className="attachment attachment--link">
        <a href={attachment.data} target="_blank" rel="noreferrer">
          {attachment.data}
        </a>
      </div>
    );
  }

  return null;
}

export default AttachmentPreview;

