import bcrypt from "bcrypt"
import User from "../models/User.mjs"
import dotenv from "dotenv"
dotenv.config()

export async function registerUser (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    console.log(user)
    if(user) {
      res.json({
        msg: "User already exists",
        type: "warning"
      })
    }
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    const newUser = {
      email: req.body.email,
      password: hashedPassword
    }
    await User.create(newUser)
    res.json({newUser: newUser})
  } catch (error) {
    res.json({error: error})
  }
}