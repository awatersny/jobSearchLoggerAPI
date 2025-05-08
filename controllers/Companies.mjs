import Company from "../models/Company.mjs"

export async function getAllCompanies(req, res) {
  try {
    const companies = await Company.find()
    if(companies.length === 0) res.status(200).json({msg: "No Companies"})
    else res.status(200).json(companies)
  } catch (error) {
    res.json({error: error})
  }
}