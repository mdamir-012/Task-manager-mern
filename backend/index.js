const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { taskRouter } = require("./routes/task.routes");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 8000;

// Parse JSON bodies (needed for sending tasks + attachments)
app.use(express.json({ limit: "5mb" }));

// Enable CORS so frontend (React) can call the API
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
  })
);

// Health check / root route
app.get("/", (req, res) => {
  res.send("Welcome to Task Manager API");
});

// Task routes, all prefixed with /api
app.use("/api", taskRouter);

// Centralized error handling (must be after routes)
app.use(errorHandler);

// Start server and connect to MongoDB once
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to mongoDB !");
  } catch (error) {
    console.log(error);
    console.log("error while connecting to mongoDB");
  }
  console.log(`listening on port ${PORT}`);
});