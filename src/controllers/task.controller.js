import { validationResult } from "express-validator"
import { Task } from "../models/task.model.js"

const addTask = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { category, details, status, points, endDate } = req.body

    const newTask = new Task({
      category,
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
    const { category, details, status, points, endDate } = req.body

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { category, details, status, points, endDate },
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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { category, status } = req.query

    const filters = {}
    if (category) filters.category = category
    if (status) filters.status = status

    const tasks = await Task.find(filters).sort({ createdAt: -1 })
    res.send({ success: true, tasks })
  } catch (error) {
    next(error)
  }
}

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({ error: "Status is required" })
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.send(updatedTask)
  } catch (err) {
    next(err)
  }
}


export {
  addTask,
  updateTask,
  deleteTask,
  getSingleTask,
  getAllTasks,
  updateStatus
}
