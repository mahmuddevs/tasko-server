import { generateToken, verifyToken } from "../utils/jwt.js"
import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import { isValidEmail } from "../utils/email.validator.js"
import { validationResult } from "express-validator"

const login = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { email, password } = req.body

    if (!isValidEmail(email)) {
      const err = new Error("Not a valid Email")
      err.statusCode = 400
      return next(err)
    }

    const user = await User.findOne({ email })
    if (!user) {
      const err = new Error("User not found")
      err.statusCode = 404
      return next(err)
    }

    const isPassMatched = await bcrypt.compare(password, user.password)
    if (!isPassMatched) {
      const err = new Error("Invalid credentials")
      err.statusCode = 401
      return next(err)
    }

    const token = generateToken(email)

    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.json({ success: true, user: { ...user.toObject(), password: null } })
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const err = new Error("User Exists")
      err.statusCode = 400
      return next(err)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    if (!newUser) {
      const err = new Error("Failed to create user")
      err.statusCode = 500
      return next(err)
    }

    const token = generateToken(newUser.email)

    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.json({ success: true, user: { ...newUser.toObject(), password: null } })
  } catch (error) {
    next(error)
  }
}

const logout = (req, res, next) => {
  try {
    res.clearCookie("auth-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })

    return res.status(200).json({ success: true, message: "Logged out successfully" })
  } catch (error) {
    next(error)
  }
}

const getAuthenticatedUser = async (req, res, next) => {
  const token = req.cookies["auth-token"]

  if (!token) {
    const err = new Error("Unauthorized")
    err.statusCode = 401
    return next(err)
  }

  try {
    const decoded = await verifyToken(token)
    const email = decoded?.email

    if (!email) {
      const err = new Error("Invalid token payload")
      err.statusCode = 400
      return next(err)
    }

    const user = await User.findOne({ email })

    if (!user) {
      const err = new Error("User not found")
      err.statusCode = 404
      return next(err)
    }

    return res.json({ success: true, user: { ...user.toObject(), password: null } })
  } catch (err) {
    err.statusCode = 401
    return next(err)
  }
}


export { login, register, logout, getAuthenticatedUser }