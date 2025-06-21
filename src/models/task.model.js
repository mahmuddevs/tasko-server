import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Done", "All Task", "Ongoing", "Pending", "Collaboration task", "In Progress"],
    default: "Pending",
  },
  points: {
    type: Number,
    required: true,
    min: 0,
  },
  endDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true })

export const Task = mongoose.model("Task", taskSchema)