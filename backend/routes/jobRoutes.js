import express from "express";
import Job from "../models/Job.js";
import { protect, employerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ── CREATE JOB (Employer only) ─────────────────────
// POST /api/jobs
router.post("/", protect, employerOnly, async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      requirements,
      responsibilities,
      skills,
      salary,
      location,
      jobType,
      category,
      experienceLevel,
      deadline,
    } = req.body;

    if (!title || !company || !description) {
      return res
        .status(400)
        .json({ message: "Title, company and description are required" });
    }

    const job = await Job.create({
      title,
      company,
      description,
      requirements,
      responsibilities,
      skills,
      salary,
      location,
      jobType,
      category,
      experienceLevel,
      deadline,
      postedBy: req.user._id, // logged-in employer's id
    });

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ── GET ALL JOBS (Public, with filters) ────────────
// GET /api/jobs?location=dhaka&jobType=full-time&category=IT&search=developer
router.get("/", async (req, res) => {
  try {
    const {
      location,
      jobType,
      category,
      experienceLevel,
      search,
      minSalary,
      maxSalary,
    } = req.query;

    // Build filter object dynamically
    const filter = { status: "active" };

    if (location) filter.location = { $regex: location, $options: "i" };
    if (jobType) filter.jobType = jobType;
    if (category) filter.category = { $regex: category, $options: "i" };
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (minSalary) filter["salary.min"] = { $gte: Number(minSalary) };
    if (maxSalary) filter["salary.max"] = { $lte: Number(maxSalary) };

    // Search by title or company name
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const jobs = await Job.find(filter)
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({ count: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// ── GET MY JOBS (Employer only) ────────────────────
// GET /api/jobs/my-jobs
router.get("/my-jobs", protect, employerOnly, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ count: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ── GET SINGLE JOB ─────────────────────────────────
// GET /api/jobs/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // MongoDB ObjectId validation
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findById(id).populate("postedBy", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ── UPDATE JOB (Employer — own job only) ───────────
// PUT /api/jobs/:id
router.put("/:id", protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if this employer owns this job
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this job" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return updated doc
      runValidators: true,
    });

    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ── DELETE JOB (Employer — own job only) ───────────
// DELETE /api/jobs/:id
router.delete("/:id", protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check ownership
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
