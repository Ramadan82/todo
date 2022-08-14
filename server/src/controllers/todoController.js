const mongoose = require("mongoose");
const Todo = require("../models/todoModels");

// get all todos

const getAllTodos = async (req, res) => {
  const user_id = req.user._id;
  const todo = await Todo.find({ user_id }).sort({ createdAt: -1 });

  !todo
    ? res.status(400).json({ error: "No todos added in the database" })
    : res.status(200).json(todo);
};

// get asingle todo

const getAsingleTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such todo" });
  }
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(400).json({ error: "No such todo" });
  }
  return res.status(200).json(todo);
};

// create a todo

const createTodo = async (req, res) => {
  const { title, description, completed } = req.body;
  // if (!(title || description || completed)) {
  //   return res.status(400).json({ error: "All fields are required" });
  // }

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!completed) {
    emptyFields.push("completed");
  }
  console.log(emptyFields.length);
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const todo = await Todo.create({
      title,
      description,
      completed,
      user_id,
    });
    return res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete a todo
const deleteAtodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such todo" });
  }
  const todo = await Todo.findByIdAndDelete(id);
  return res.status(200).json(todo);
};

// update a todo

const updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such todo" });
  }
  const todo = await Todo.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!todo) {
    return res.status(400).json({ error: "No such todo" });
  }
  return res.status(200).json(todo);
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteAtodo,
  getAsingleTodo,
};
