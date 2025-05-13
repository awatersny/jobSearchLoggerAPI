
import express from "express"
import * as auth from "../controllers/Auth.mjs"
import passport from "passport"
import initializePassport from "../config/passport-config.mjs"
import User from "../models/User.mjs"

initializePassport(
  passport, 
  async (email) => await User.findOne({email: email}),
  async (id) => await User.findById(id)
)

const router = express.Router()

router.post("/register", auth.registerUser)
router.post("/login", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}))

export default router