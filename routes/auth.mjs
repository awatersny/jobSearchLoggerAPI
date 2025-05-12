
import express from "express"
import * as auth from "../controllers/Auth.mjs"
const router = express.Router()

router.post("/register", auth.registerUser)

export default router