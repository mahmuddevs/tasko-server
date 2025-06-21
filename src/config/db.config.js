import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB connected: ${res.connection.host}`)
  } catch (error) {
    console.error("MongoDB connection error:", error.message)
    process.exit(1)
  }
}

export default connectDB