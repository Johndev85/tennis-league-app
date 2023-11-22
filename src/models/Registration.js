import { Schema, model, models } from "mongoose"

const registrationSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    tournament_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default models.Registration || model("Registration", registrationSchema)
