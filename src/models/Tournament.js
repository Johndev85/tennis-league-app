import { Schema, model, models } from "mongoose"

const tournamentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    initial_date: {
      type: Date,
      required: [true, "initial date is required"],
    },
    final_date: {
      type: Date,
      required: [true, "final date is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default models.Tournament || model("Tournament", tournamentSchema)
