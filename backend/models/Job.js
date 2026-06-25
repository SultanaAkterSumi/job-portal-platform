import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [String],
    responsibilities: [String],
    skills: [String],
    salary: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: "BDT" },
    },
    location: { type: String, default: "" },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "freelance"],
      default: "full-time",
    },
    category: { type: String, default: "" },
    experienceLevel: {
      type: String,
      enum: ["no-experience", "fresher", "intermediate", "expert"],
      default: "fresher",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
    applications: { type: Number, default: 0 },
    deadline: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("Job", jobSchema);
