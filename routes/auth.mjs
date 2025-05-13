import express from "express"
import * as auth from "../controllers/Auth.mjs"

const router = express.Router()

router.post("/register", auth.registerUser)
router.post("/login", auth.loginUser)

export default router