import * as companies from "../controllers/Companies.mjs"
import express from "express"

const router = express.Router()

router.get("/", companies.getAllCompanies)
router.get("/:id", companies.getCompany)
router.get("/seed", companies.generateCompanies)

export default router