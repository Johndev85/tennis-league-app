import { connectDB } from "@/utils/dbConnect"
import Tournament from "@/models/Tournament"
import { NextResponse } from "next/server"

export async function GET() {
  await connectDB()
  try {
    const tournaments = await Tournament.find({})
    return NextResponse.json({ tournaments }, { status: 200 })
  } catch (error) {
    return new NextResponse(500).json({ message: error.message })
  }
}

export async function POST(request) {
  const { name, initial_date, final_date, location, image } =
    await request.json()

  if (!name || !initial_date || !final_date || !location) {
    console.error("Missing required fields")
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    )
  }

  try {
    await connectDB()
    console.log("Creating new tournament...")
    const tournament = new Tournament({
      name,
      initial_date,
      final_date,
      location,
      image,
    })
    const savedTournament = await tournament.save()
    console.log("Tournament created successfully:", savedTournament)
    return NextResponse.json({ savedTournament }, { status: 201 })
  } catch (error) {
    console.error("Error creating tournament:", error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  await connectDB()
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      request.query.id,
      request.body,
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

export async function DELETE(request) {
  await connectDB()
  try {
    const tournament = await Tournament.findByIdAndDelete(request.query.id)
    return NextResponse.json({ tournament }, { status: 200 })
  } catch (error) {
    return new NextResponse(400).json({ message: error.message })
  }
}
