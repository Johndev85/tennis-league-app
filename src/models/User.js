import { Schema, model, models } from "mongoose"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      minLength: [3, "username must be at least 3 characters"],
      maxLength: [20, "username must be at most 20 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default models.User || model("User", userSchema)
