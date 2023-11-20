import { connectDB } from "@/utils/dbConnect"
import User from "@/models/User"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"

export async function POST(request) {
  try {
    await connectDB()

    const { username, email, password } = await request.json()

    if (password < 6)
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      )

    const userFound = await User.findOne({ email })

    if (userFound)
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 409,
        }
      )

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
      username,
      email,
      password: hashedPassword,
    })

    const savedUser = await user.save()
    console.log(savedUser)

    return NextResponse.json(
      {
        username,
        email,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      )
    }
    return NextResponse.error()
  }
}
