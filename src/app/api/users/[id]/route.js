import { connectDB } from "@/utils/dbConnect"
import User from "@/models/User"
import { NextResponse } from "next/server"

//get  one single user
export const GET = async (request, { params }) => {
  await connectDB()
  const id = params.id
  try {
    const user = await User.findById(id)
    return NextResponse.json({ data: user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ data: null }, { status: 500 })
  }
}

//update user
export const PUT = async (request, { params }) => {
  await connectDB()
  const id = params.id
  const body = await request.json()
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    )
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }
    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    return new NextResponse(400).json({ message: error.message })
  }
}

//delete user
export const DELETE = async (request, { params }) => {
  await connectDB()
  const id = params.id
  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return NextResponse.json(
        { message: `User with ID: ${id} not found.` },
        { status: 404 }
      )
    }
    return NextResponse.json({ data: user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ data: null }, { status: 500 })
  }
}
