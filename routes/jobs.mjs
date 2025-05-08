import * as jobs from "../controllers/Jobs.mjs"
import express from "express"

const router = express.Router()

router.get("/jobs", jobs.getAllJobs)

export default router