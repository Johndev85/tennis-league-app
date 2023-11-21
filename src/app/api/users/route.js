import { connectDB } from "@/utils/dbConnect"
import User from "@/models/User"
import { NextResponse } from "next/server"

//get all users
export const GET = async (req) => {
  try {
    await connectDB()

    const users = await User.find({})
    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return new NextResponse(500).json({ message: "An error occurred" })
  }
}
