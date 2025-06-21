import { body, param } from "express-validator"


export const loginValidation = [
  //email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  // Password field
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character (@$!%*?&)")
]

export const registerValidation = [...loginValidation,
// Name field
body("name")
  .trim().escape()
  .notEmpty()
  .withMessage("Name is required")
  .isLength({ min: 2 })
  .withMessage("Name must be at least 2 characters long"),
]

export const addTaskValidation = [
  body("name").trim().escape().notEmpty().withMessage("Name is required"),
  body("details").trim().escape().notEmpty().withMessage("Details are required"),
  body("status")
    .trim()
    .escape()
    .isIn(["Done", "All Task", "Ongoing", "Pending", "Collaboration task", "In Progress"])
    .withMessage("Invalid status"),
  body("points").toInt().isInt({ min: 0 }).withMessage("Points must be a positive integer"),
  body("endDate").toDate().isISO8601().withMessage("Invalid end date"),
]

export const validateParams = [
  param("id").isMongoId().withMessage("Invalid task ID format")
]
