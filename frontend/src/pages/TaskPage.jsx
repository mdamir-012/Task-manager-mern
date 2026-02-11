import React, { useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";
import "../styles/TaskPage.css";

function TaskPage() {
  const {
    tasks,
    selectedTaskIds,
    loading,
    error,
    fetchTasks,
    createTask,
    deleteTasks,
    toggleSelect,
  } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
  };

  const handleDeleteSelected = async () => {
    if (selectedTaskIds.length === 0) return;
    const confirmDelete = window.confirm(
      `Delete ${selectedTaskIds.length} selected task(s)?`
    );
    if (!confirmDelete) return;
    await deleteTasks(selectedTaskIds);
  };

  return (
    <div className="task-page">
      <div className="task-page__form">
        <TaskForm onCreateTask={handleCreateTask} />
      </div>
      <div className="task-page__list">
        <div className="task-page__toolbar">
          <button
            className="btn btn-danger"
            disabled={selectedTaskIds.length === 0}
            onClick={handleDeleteSelected}
          >
            Delete Selected ({selectedTaskIds.length})
          </button>
        </div>
        {loading && <p>Loading tasks...</p>}
        {error && <p className="error-text">{error}</p>}
        <TaskList
          tasks={tasks}
          selectedTaskIds={selectedTaskIds}
          onToggleSelect={toggleSelect}
        />
      </div>
    </div>
  );
}

export default TaskPage;

