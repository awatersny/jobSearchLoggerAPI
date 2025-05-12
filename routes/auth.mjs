import bcrypt from "bcrypt"
import express from "express"
const router = express.Router()

const users = []

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.json(users)
  } catch (error) {
    res.json({error: error})
  }
})

export default router