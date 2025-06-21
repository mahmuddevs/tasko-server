import express from "express"
import { addTaskValidation, validateParams } from "../utils/validators.js"
import { addTask, deleteTask, getAllTasks, getSingleTask, updateTask } from "../controllers/task.controller.js"

const taskRoutes = express.Router()

taskRoutes.get("/", (req, res) => {
  return res.send("task router")
})
taskRoutes.get("/all-tasks", getAllTasks)
taskRoutes.get("/task/:id", validateParams, getSingleTask)
taskRoutes.post("/add", addTaskValidation, addTask)
taskRoutes.patch("/update/:id",
  [
    ...validateParams,
    ...addTaskValidation
  ]
  , updateTask)
taskRoutes.delete("/task/:id", validateParams, deleteTask)

export default taskRoutes