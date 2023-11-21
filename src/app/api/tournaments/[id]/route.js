import { connectDB } from "@/utils/dbConnect"
import Tournament from "@/models/Tournament"
import { NextResponse } from "next/server"

//get  one single tournament
export const GET = async (request, { params }) => {
  await connectDB()
  const id = params.id
  try {
    const result = await Tournament.findById(id)
    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ data: null }, { status: 500 })
  }
}

//update tournament
export const PUT = async (request, { params }) => {
  await connectDB()
  const id = params.id
  const body = await request.json()
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    )
    if (!tournament) {
      return NextResponse.json(
        { message: "Tournament not found" },
        { status: 404 }
      )
    }
    return NextResponse.json({ tournament }, { status: 200 })
  } catch (error) {
    return new NextResponse(400).json({ message: error.message })
  }
}

//delete tournament
export const DELETE = async (request, { params }) => {
  await connectDB()
  const id = params.id
  try {
    const result = await Tournament.findByIdAndDelete(id)
    if (!result) {
      return NextResponse.json(
        { message: `Tournament with ID: ${id} not found.` },
        { status: 404 }
      )
    }
    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ data: null }, { status: 500 })
  }
}
