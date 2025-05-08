import Job from "../models/Job.mjs"

export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find()
    if(jobs.length === 0) res.status(200).json({msg: "No Jobs"})
    else res.status(200).json(jobs)
  } catch (error) {
    res.json({error: error})
  }
}