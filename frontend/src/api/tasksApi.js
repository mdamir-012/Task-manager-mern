import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export async function getTasks() {
  const res = await axios.get(`${API_BASE_URL}/tasks`);
  return res.data;
}

export async function createTask(taskData) {
  const res = await axios.post(`${API_BASE_URL}/tasks`, taskData);
  return res.data;
}

export async function deleteTasks(ids) {
  const res = await axios.delete(`${API_BASE_URL}/tasks`, {
    data: { ids },
  });
  return res.data;
}

