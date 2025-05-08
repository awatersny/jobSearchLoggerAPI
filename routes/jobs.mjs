import * as jobs from "../controllers/Jobs.mjs"
import express from "express"

const router = express.Router()

router.get("/", jobs.getAllJobs)
router.get("/seed", jobs.generateJobs)
router.get("/:id", jobs.getJob)
router.delete("/:id", jobs.removeJob)

export default router