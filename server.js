const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
app.post("/api/todos", async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
app.delete("/api/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.json({
      message: "Todo deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
app.put("/api/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        completed: req.body.completed
      },
      {
        new: true
      }
    );

    res.json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error);
  });

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});