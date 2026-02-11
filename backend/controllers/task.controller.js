const { TaskModel } = require("../models/task.model");

// POST /tasks - create a new task
const createTask = async (req, res, next) => {
  try {
    const { title, description, attachments } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await TaskModel.create({
      title: title.trim(),
      description: description || "",
      attachments: attachments || [],
    });

    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// GET /tasks - fetch all tasks
const getTasks = async (req, res, next) => {
  try {
    const tasks = await TaskModel.find().sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// DELETE /tasks - delete multiple tasks by array of ids
const deleteTasks = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "An array of task ids is required" });
    }

    const result = await TaskModel.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      message: "Tasks deleted successfully",
      deletedCount: result.deletedCount,
      ids,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTasks,
};

