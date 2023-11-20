import { NextResponse } from "next/server"
import { dbConnect } from "@/utils/dbConnect"
import User from "@/models/User"

export async function POST(request) {
  await dbConnect()

  const { username, email, password } = await request.json()

  const user = await User.create({
    username,
    email,
    password,
  })

  return NextResponse.redirect("/api/auth/login")
}
