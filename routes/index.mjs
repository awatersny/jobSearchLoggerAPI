import express from "express"
const router = express.Router()

router
.route("/")
.get((req, res) => {
  res.json({msg: "Welcome"})
})

export default router