import * as companies from "../controllers/Companies.mjs"
import express from "express"

const router = express.Router()

router.get("/jobs", companies.getAllCompanies)

export default router