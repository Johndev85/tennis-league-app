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
    tournament_name: {
      type: String,
      required: true,
    },
    initial_date: {
      type: Date,
      required: true,
    },
    final_date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default models.Registration || model("Registration", registrationSchema)
