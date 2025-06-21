import express from "express"
import { getAuthenticatedUser, login, logout, register } from "../controllers/user.controller.js"
import { loginValidation, registerValidation } from "../utils/validators.js"
const userRoutes = express.Router()


userRoutes.post("/login", loginValidation, login)
userRoutes.post("/register", registerValidation, register)
userRoutes.post("/logout", logout)
userRoutes.post("/auth", getAuthenticatedUser)


export default userRoutes