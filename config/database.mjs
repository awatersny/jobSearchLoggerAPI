import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

mongoose.connect(`${process.env.ATLAS_URI}/jobSearchTracker`)

mongoose.connection.once("open", () => {
  console.log(`Connected to the ${mongoose.connection.name} database.`)
})
