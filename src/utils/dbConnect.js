import mongoose from "mongoose"

const connection = {}

export async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.MONGODB_URI)
  console.log("Connected to database: " + db.connection.db.databaseName)

  connection.isConnected = db.connections[0].readyState
}
