import bcrypt from "bcrypt"
import User from "../models/User.mjs"

const users = []

export async function registerUser (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
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