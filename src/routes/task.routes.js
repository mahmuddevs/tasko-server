import express from "express"
import { addTaskValidation, validateParams, validateTaskQuery } from "../utils/validators.js"
import { addTask, deleteTask, getAllTasks, getSingleTask, updateStatus, updateTask } from "../controllers/task.controller.js"

const taskRoutes = express.Router()

taskRoutes.get("/all-tasks", validateTaskQuery, getAllTasks)
taskRoutes.get("/task/:id", validateParams, getSingleTask)
taskRoutes.post("/add", addTaskValidation, addTask)
taskRoutes.patch("/update/:id",
  [
    ...validateParams,
    ...addTaskValidation
  ]
  , updateTask)
taskRoutes.delete("/task/:id", validateParams, deleteTask)
taskRoutes.patch("/task/:id/status", updateStatus)

export default taskRoutes