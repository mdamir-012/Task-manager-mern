import React, { useCallback, useState } from "react";
import DropzoneArea from "./DropzoneArea";

function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [linkInput, setLinkInput] = useState("");

  const handleImagesAdded = useCallback((imageAttachment) => {
    setAttachments((prev) => [...prev, imageAttachment]);
  }, []);

  const handleAddLink = () => {
    const trimmed = linkInput.trim();
    if (!trimmed) return;
    try {
      // Basic URL validation
      const url = new URL(trimmed);
      setAttachments((prev) => [
        ...prev,
        { type: "link", data: url.toString() },
      ]);
      setLinkInput("");
    } catch {
      alert("Please enter a valid URL");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    await onCreateTask({
      title: title.trim(),
      description: description.trim(),
      attachments,
    });
    setTitle("");
    setDescription("");
    setAttachments([]);
    setLinkInput("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the task..."
          rows={3}
        />
      </div>
      <div className="form-group">
        <label>Attachments</label>
        <DropzoneArea onImagesAdded={handleImagesAdded} />
        <div className="link-input-row">
          <input
            type="text"
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="Paste a link and click Add"
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddLink}
          >
            Add Link
          </button>
        </div>
        {attachments.length > 0 && (
          <p className="muted-text">{attachments.length} attachment(s) added</p>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Create Task
      </button>
    </form>
  );
}

export default TaskForm;

