import * as jobs from "../controllers/Jobs.mjs"
import express from "express"

const router = express.Router()

router.get("/", jobs.getAllJobs)
router.get("/seed", jobs.generateJobs)

export default router