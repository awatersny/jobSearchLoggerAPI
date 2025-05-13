import express from "express"
import * as auth from "../controllers/Auth.mjs"

const router = express.Router()

router.post("/register", auth.registerUser)
router.post("/login", auth.loginUser)
router.post("/logout", auth.logoutUser)

export default router