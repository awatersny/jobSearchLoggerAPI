import Job from "../models/Job.mjs"
import { jobData } from "../data/seed.mjs"
import Company from "../models/Company.mjs"

export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find()
    if(jobs.length === 0) res.status(200).json({msg: "No Jobs"})
    else res.status(200).json(jobs)
  } catch (error) {
    res.json({error: error})
  }
}

//Double check for edge cases
export async function createNewJob(req, res) {
  try {
    await Job.create(req.body)
    res.json([{msg: "Job Created"}, req.body])
  } catch (error) {
    res.json({error: error})
  }
}

export async function generateJobs (req, res) {
  try {
    const jobs = await Job.find()
    if(!jobs.length){
      await Job.create(jobData)
    }
    res.redirect('/jobs')
  } catch (error) {
    res.json({error: error})
  }
}

export async function getJob(req, res) {
  try {
    const job = await Job.findById(req.params.id)
    res.status(200).json(job)
  } catch (error) {
    res.json({error: error})
  } 
}

export async function removeJob(req, res) {
  try {
    const job = await Job.findById(req.params.id)
    const company = job.company ? await Company.findById(job.company._id) : {msg: "No company assigned"}
    const idx = company.jobs ? company.jobs.indexOf(req.params.id) : -1
    await Job.findByIdAndDelete(req.params.id)
    if(idx > -1) {
      company.jobs.splice(idx, 1)
      company.save() 
    }
    res.json([{removed: `Job Id ${req.params.id}`}, company])
  } catch (error) {
    res.json({error: error})
  }
}