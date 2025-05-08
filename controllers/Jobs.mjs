import Job from "../models/Job.mjs"
import { jobData } from "../data/seed.mjs"

export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find()
    if(jobs.length === 0) res.status(200).json({msg: "No Jobs"})
    else res.status(200).json(jobs)
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
    console.error(error)
  }
}