import { validationResult } from "express-validator"
import { Task } from "../models/task.model.js"

const addTask = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { name, details, status, points, endDate } = req.body

    const newTask = new Task({
      name,
      details,
      status,
      points,
      endDate,
    })

    const savedTask = await newTask.save()
    res.status(201).send({ success: true, task: savedTask })
  } catch (error) {
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }
  try {
    const { id } = req.params
    const { name, details, status, points, endDate } = req.body

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, details, status, points, endDate },
      { new: true, runValidators: true }
    )

    if (!updatedTask) {
      return res.status(404).send({ success: false, message: "Task not found" })
    }

    res.send({ success: true, task: updatedTask })
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { id } = req.params

    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
      return res.status(404).send({ success: false, message: "Task not found" })
    }

    res.send({ success: true, message: "Task deleted successfully" })
  } catch (error) {
    next(error)
  }
}

const getSingleTask = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { id } = req.params

    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).send({ success: false, message: "Task not found" })
    }

    res.send({ success: true, task })
  } catch (error) {
    next(error)
  }
}

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.send({ success: true, tasks })
  } catch (error) {
    next(error)
  }
}

export {
  addTask,
  updateTask,
  deleteTask,
  getSingleTask,
  getAllTasks,
}
