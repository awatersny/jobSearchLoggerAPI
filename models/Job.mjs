import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    skills: [{
      type: String,
      required: true 
    }],
    status: {
      type: String,
      enum: ["applied", "interviewing", "offered", "rejected"],
      required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null
    },
  }
)

const Job = mongoose.model("Job", jobSchema)

export default Job