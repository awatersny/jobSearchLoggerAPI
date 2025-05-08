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
    await Job.findByIdAndDelete(req.params.id)
    res.json({removed: `Job Id ${req.params.id}`})
  } catch (error) {
    res.json({error: error})
  }
}