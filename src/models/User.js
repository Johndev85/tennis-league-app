import { Schema, model, models } from "mongoose"

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
)

export default models.User || model("User", userSchema)
