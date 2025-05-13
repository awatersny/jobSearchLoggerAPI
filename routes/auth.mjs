import express from "express"
import * as auth from "../controllers/Auth.mjs"

const router = express.Router()

router.post("/register", auth.registerUser)
router.post("/login", (req, res) => {
  try {
    res.json(req.body)
  } catch (error) {
    res.json({error: error})
  }
})

export default router