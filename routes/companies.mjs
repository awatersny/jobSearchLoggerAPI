import * as companies from "../controllers/Companies.mjs"
import express from "express"

const router = express.Router()

router.get("/", companies.getAllCompanies)
router.post("/", companies.createNewCompany)
router.get("/seed", companies.generateCompanies)
router.get("/:id", companies.getCompany)
router.delete("/:id", companies.removeCompany)

export default router