import { User } from "../models/user.model"

export const authMiddleware = async (req, res, next) => {
  try {
    const decoded = await verifyToken(token, process.env.JWT_SECRET)
    const { email } = decoded
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" })
    }

    next()
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" })
  }
}