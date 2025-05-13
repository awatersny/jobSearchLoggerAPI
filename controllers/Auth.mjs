import bcrypt from "bcrypt"
import User from "../models/User.mjs"
import passport from "passport"
import initializePassport from "../config/passport-config.mjs"
import dotenv from "dotenv"
dotenv.config()
initializePassport(
  passport, 
  async (email) => await User.findOne({email: email}),
  async (id) => await User.findById(id)
)

export async function registerUser (req, res) {
  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }
    await User.create(newUser)
    res.json({newUser: newUser})
  } catch (error) {
    res.json({error: error})
  }
}