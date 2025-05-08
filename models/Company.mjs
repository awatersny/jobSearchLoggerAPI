import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    values: [{
      type: String,
      required: true
    }],
    jobs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      default: null
    }],
  }
)

const Job = mongoose.model("Job", companySchema)

export default Job