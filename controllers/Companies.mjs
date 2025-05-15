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

//Check for edge cases
export async function createNewCompany(req, res) {
  try {
    const company = await Company.create(req.body)
    res.json([{msg: "Company Created"}, company])
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

export async function editCompany(req, res) {
  try {
    const company = await Company.findById(req.params.id)
    company.name = req.body.name ? req.body.name : company.name
    company.description = req.body.description ? req.body.description : company.description
    company.values = req.body.values ? req.body.values : company.values
    company.website = req.body.website ? req.body.website : company.website
    company.save()
    res.json({edit: company})
  } catch (error) {
    res.json({error: error})
  }
}

export async function addJobToCompany(req, res) {
  try {
    const company = await Company.findById(req.params.id)
    const job = await Job.findById(req.body.job)
    job.company = company._id
    job.save()
    company.jobs.push(job)
    company.save()
    res.json(company)
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