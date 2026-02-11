const express = require("express");
const {
  createTask,
  getTasks,
  deleteTasks,
} = require("../controllers/task.controller");

const taskRouter = express.Router();

// POST /tasks - create task
taskRouter.post("/tasks", createTask);

// GET /tasks - fetch all tasks
taskRouter.get("/tasks", getTasks);

// DELETE /tasks - delete multiple tasks by ids array
taskRouter.delete("/tasks", deleteTasks);

module.exports = {
  taskRouter,
};

