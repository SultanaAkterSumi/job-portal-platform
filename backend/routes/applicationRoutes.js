import express from "express";
import mongoose from "mongoose";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import {
  protect,
  employerOnly,
  seekerOnly,
} from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Helper: upload buffer to Cloudinary
const uploadToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "job-portal-resumes",
        resource_type: "raw",
        format: "pdf",
        public_id: `resume_${Date.now()}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    stream.end(buffer);
  });
};

// ── APPLY FOR A JOB ───────────────────────────────
router.post("/", protect, seekerOnly, async (req, res) => {
  try {
    const { job, coverLetter, resumeLink } = req.body;

    if (!job || !mongoose.isValidObjectId(job)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const jobPost = await Job.findById(job);
    if (!jobPost) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (jobPost.status !== "active") {
      return res
        .status(400)
        .json({ message: "This job is no longer accepting applications" });
    }

    const alreadyApplied = await Application.findOne({
      job,
      applicant: req.user._id,
    });
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    if (!resumeLink) {
      return res.status(400).json({ message: "Resume link is required" });
    }

    const application = await Application.create({
      job,
      applicant: req.user._id,
      resume: resumeLink,
      coverLetter,
    });

    await Job.findByIdAndUpdate(job, { $inc: { applications: 1 } });

    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ── MY APPLICATIONS (Seeker) ──────────────────────
// GET /api/applications
router.get("/", protect, seekerOnly, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate("job", "title company location jobType status")
      .sort({ createdAt: -1 });

    res.status(200).json({ count: applications.length, applications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ── ALL APPLICANTS FOR A JOB (Employer) ───────────
// GET /api/applications/job/:jobId
router.get("/job/:jobId", protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate("applicant", "name email location skills")
      .sort({ createdAt: -1 });

    res.status(200).json({ count: applications.length, applications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ── UPDATE STATUS (Employer) ──────────────────────
// PUT /api/applications/:id/status
router.put("/:id/status", protect, employerOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "reviewed",
      "shortlisted",
      "rejected",
      "accepted",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.id).populate(
      "job",
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    application.status = status;
    await application.save();

    res
      .status(200)
      .json({ message: "Status updated successfully", application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
