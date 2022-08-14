const express = require("express");

const router = express.Router();
const {
  getAllTodos,
  getAsingleTodo,
  createTodo,
  updateTodo,
  deleteAtodo,
} = require("../controllers/todoController");
const requireAuth = require("../middleware/requireAuth");

//protect all routes with the auth middleware
router.use(requireAuth);

router.get("/", getAllTodos);
router.get("/:id", getAsingleTodo);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteAtodo);

module.exports = router;
