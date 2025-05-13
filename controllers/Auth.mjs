import bcrypt, { compare } from "bcrypt"
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

export async function loginUser (req, res) {
  try {
    const user = await User.findOne({email: req.body.email})
    if(!user) {
      res.json({
        msg: "User doesn't exist!",
        type: "error"
      })
    }
    const isMatch = await compare(req.body.password, user.password)
    if(!isMatch){
      res.json({
        msg: "Password is incorrect!",
        type: "error",
      })
    }

    res.json(req.body)
  } catch (error) {
    res.json({error: error})
  }
}