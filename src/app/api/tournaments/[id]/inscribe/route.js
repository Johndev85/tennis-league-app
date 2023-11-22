import { connectDB } from "@/utils/dbConnect"
import Registration from "@/models/Registration"
import { NextResponse } from "next/server"

//get all inscriptions
export const GET = async () => {
  await connectDB()
  try {
    const inscriptions = await Registration.find({})
    return NextResponse.json({ inscriptions }, { status: 200 })
  } catch (error) {
    return new NextResponse(500).json({ message: error.message })
  }
}

//create inscription
export const POST = async (request, { params }) => {
  const { user_id, tournament_id } = await request.json()

  if (!user_id || !tournament_id) {
    console.error("Missing required fields")
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    )
  }

  try {
    await connectDB()
    console.log("Checking for existing inscription...")
    const existingInscription = await Registration.findOne({
      user_id,
      tournament_id,
    })
    if (existingInscription) {
      console.error("Inscription already exists")
      return NextResponse.json(
        { message: "Inscription already exists" },
        { status: 400 }
      )
    }

    console.log("Creating new tournament...")
    const inscription = new Registration({
      user_id,
      tournament_id,
    })
    const savedInscription = await inscription.save()
    console.log("Inscription created successfully:", savedInscription)
    return NextResponse.json({ savedInscription }, { status: 201 })
  } catch (error) {
    console.error("Error creating inscription:", error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
