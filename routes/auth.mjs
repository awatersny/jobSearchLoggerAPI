
import express from "express"
import * as auth from "../controllers/Auth.mjs"
import passport from "passport"
const router = express.Router()

router.post("/register", auth.registerUser)
router.post("/login", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

export default router