import { connectDB } from "@/utils/dbConnect"
import Registration from "@/models/Registration"
import { NextResponse } from "next/server"

//get  one single inscription
export const GET = async (request, { params }) => {
  await connectDB()
  const id = params.id
  try {
    const result = await Registration.findById(id)
    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ data: null }, { status: 500 })
  }
}

//delete inscription
export const DELETE = async (request, { params }) => {
  await connectDB()
  const id = params.id
  try {
    const result = await Registration.findByIdAndDelete(id)
    if (!result) {
      return NextResponse.json(
        { message: `Inscription with ID: ${id} not found.` },
        { status: 404 }
      )
    }
    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ data: null }, { status: 500 })
  }
}
