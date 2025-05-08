import Company from "../models/Company.mjs"
import Job from "../models/Job.mjs"
import { companyData } from "../data/seed.mjs"

export async function getAllCompanies(req, res) {
  try {
    const companies = await Company.find()
    if(companies.length === 0) res.status(200).json({msg: "No Companies"})
    else res.status(200).json(companies)
  } catch (error) {
    res.json({error: error})
  } 
}

export async function generateCompanies (req, res) {
  try {
    const companies = await Company.find()
    if(!companies.length){
      await Company.create(companyData)
    }
    res.redirect('/companies')
  } catch (error) {
    res.json({error: error})
  }
}

export async function getCompany(req, res) {
  try {
    const company = await Company.findById(req.params.id)
    res.status(200).json(company)
  } catch (error) {
    res.json({error: error})
  } 
}

export async function removeCompany(req, res) {
  try {
    await Job.deleteMany({company: req.params.id})
    await Company.findByIdAndDelete(req.params.id)
    res.json({removed: `Company Id ${req.params.id}`})
  } catch (error) {
    res.json({error: error})
  }
}