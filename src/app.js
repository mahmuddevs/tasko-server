import express from "express"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import { globalErrorHandler } from "./middlewares/error.middleware.js"
import taskRoutes from "./routes/task.routes.js"
import helmet from "helmet"

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)

//Routes
app.use("/users", userRoutes)
app.use("/tasks", taskRoutes)


//error handler
app.use(globalErrorHandler)

export default app