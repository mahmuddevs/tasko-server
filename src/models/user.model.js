import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name required'],
      trim: true,
      minLength: [3, `Minimum Length of Name is 3 Characters`],
      maxLength: [32, `Maximum Length of Name is 32 Characters`]
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [3, `Minimum Length of Email is 3 Characters`],
      maxLength: [32, `Maximum Length of Email is 32 Characters`],
      validate: {
        validator: function (value) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        },
        message: 'Email is not valid'
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    userType: {
      type: String,
      default: 'user',
    },
    image: {
      type: String,
      default: process.env.DEFAULT_USER_IMAGE || ""
    }
  },
  {
    timestamps: true
  }
)

export const User = mongoose.model('User', userSchema)