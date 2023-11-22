import { Schema, model, models } from "mongoose"

const updateUserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      minLength: [3, "username must be at least 3 characters"],
      maxLength: [30, "username must be at most 30 characters"],
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
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default models.UpdateUser || model("UpdateUser", updateUserSchema)
