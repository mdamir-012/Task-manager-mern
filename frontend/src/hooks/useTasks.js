import { useCallback, useState } from "react";
import * as tasksApi from "../api/tasksApi";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    const newTask = await tasksApi.createTask(taskData);
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTasks = async (ids) => {
    await tasksApi.deleteTasks(ids);
    setTasks((prev) => prev.filter((task) => !ids.includes(task._id)));
    setSelectedTaskIds((prev) => prev.filter((id) => !ids.includes(id)));
  };

  const toggleSelect = (id) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return {
    tasks,
    selectedTaskIds,
    loading,
    error,
    fetchTasks,
    createTask,
    deleteTasks,
    toggleSelect,
  };
}

