import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// ─── Mock Job Data ─────────────────────────────────────────────────────────────
const MOCK_JOB = {
  _id: "1",
  title: "Frontend Developer",
  company: "TechSoft BD",
  location: "Dhaka, Bangladesh",
  jobType: "full-time",
  category: "Technology",
  salary: { min: 40000, max: 80000, currency: "BDT" },
  experienceLevel: "intermediate",
  skills: ["React", "Tailwind CSS", "JavaScript", "TypeScript", "Git"],
  status: "active",
  deadline: "2025-07-30T00:00:00Z",
  createdAt: "2025-06-20T00:00:00Z",
  applications: 24,
  description:
    "TechSoft BD is a leading software company based in Dhaka. We build innovative web applications for clients across Southeast Asia. We are looking for a skilled and passionate Frontend Developer to join our dynamic team and contribute to exciting projects.",
  responsibilities: [
    "Build and maintain high-quality React.js web applications",
    "Collaborate with UI/UX designers to translate Figma designs into code",
    "Write clean, maintainable, and well-documented code",
    "Optimize applications for maximum speed and scalability",
    "Participate in code reviews and team stand-ups",
    "Work with backend developers to integrate REST APIs",
  ],
  requirements: [
    "2+ years of experience with React.js",
    "Proficiency in HTML5, CSS3, and JavaScript (ES6+)",
    "Experience with Tailwind CSS or similar CSS frameworks",
    "Familiarity with Git version control",
    "Basic understanding of REST APIs and Axios",
    "Strong problem-solving skills and attention to detail",
  ],
};

const RELATED_JOBS = [
  { _id: "2", title: "React Native Developer", company: "AppWorks", location: "Dhaka", jobType: "full-time" },
  { _id: "5", title: "UI Engineer", company: "PixelLab", location: "Chittagong", jobType: "contract" },
  { _id: "3", title: "Full Stack Developer", company: "WebAgency BD", location: "Dhaka", jobType: "full-time" },
];

// ─── Reusable Section Header ───────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
      <span className="w-1 h-5 bg-teal-500 rounded-full inline-block"></span>
      {children}
    </h2>
  );
}

// ─── Main JobDetails Page ──────────────────────────────────────────────────────
export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  // ── API থেকে job details আনার জায়গা ───────────────────────────────────────
  useEffect(() => {
    // Real API call (Role D connect করবে):
    // const fetchJob = async () => {
    //   try {
    //     const res = await fetch(`/api/jobs/${id}`);
    //     const data = await res.json();
    //     setJob(data);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchJob();

    // Mock data দিয়ে কাজ করা:
    setTimeout(() => {
      setJob(MOCK_JOB);
      setLoading(false);
    }, 500);
  }, [id]);

  // Apply handler (Role D এর API connect হলে এখানে POST call যাবে)
  const handleApply = () => {
    setApplying(true);
    setTimeout(() => {
      setApplying(false);
      setApplySuccess(true);
    }, 1200);
    // Real API:
    // navigate(`/jobs/${id}/apply`);
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Job not found
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Job Not Found</h2>
        <p className="text-gray-500 mb-6">This job may have been removed or is no longer active.</p>
        <Link to="/jobs" className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors">
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const typeColors = {
    "full-time": "bg-teal-100 text-teal-700",
    "part-time": "bg-blue-100 text-blue-700",
    "contract": "bg-orange-100 text-orange-700",
    "internship": "bg-purple-100 text-purple-700",
    "freelance": "bg-pink-100 text-pink-700",
  };

  const deadline = new Date(job.deadline);
  const daysLeft = Math.ceil((deadline - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <span>›</span>
          <Link to="/jobs" className="hover:text-teal-600">Browse Jobs</Link>
          <span>›</span>
          <span className="text-gray-700 font-medium">{job.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── LEFT: Main Content ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">

            {/* Job Header Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h1>
                  <p className="text-teal-600 font-medium text-lg">{job.company}</p>
                </div>
                {/* Company Avatar */}
                <div className="w-14 h-14 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl font-bold text-teal-600 flex-shrink-0">
                  {job.company.charAt(0)}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${typeColors[job.jobType] || "bg-gray-100 text-gray-600"}`}>
                  {job.jobType}
                </span>
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {job.category}
                </span>
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full capitalize">
                  {job.experienceLevel.replace("-", " ")}
                </span>
                {job.status === "active" && (
                  <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Location</p>
                  <p className="text-sm font-medium text-gray-700">{job.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Salary</p>
                  <p className="text-sm font-medium text-gray-700">
                    ৳{job.salary.min.toLocaleString()} – ৳{job.salary.max.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Deadline</p>
                  <p className={`text-sm font-medium ${daysLeft <= 7 ? "text-red-600" : "text-gray-700"}`}>
                    {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Applicants</p>
                  <p className="text-sm font-medium text-gray-700">{job.applications} applied</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <SectionTitle>Job Description</SectionTitle>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <SectionTitle>Key Responsibilities</SectionTitle>
              <ul className="space-y-2">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <SectionTitle>Requirements</SectionTitle>
              <ul className="space-y-2">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
                    <span className="text-teal-500 mt-0.5 flex-shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <SectionTitle>Professional Skills Required</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="bg-teal-50 text-teal-700 border border-teal-200 text-sm font-medium px-3 py-1.5 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Jobs */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <SectionTitle>Related Jobs</SectionTitle>
              <div className="flex flex-col gap-3">
                {RELATED_JOBS.map((rj) => (
                  <Link
                    key={rj._id}
                    to={`/jobs/${rj._id}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all group"
                  >
                    <div>
                      <p className="font-medium text-gray-800 group-hover:text-teal-700 text-sm">{rj.title}</p>
                      <p className="text-xs text-gray-500">{rj.company} · {rj.location}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[rj.jobType] || "bg-gray-100 text-gray-600"}`}>
                      {rj.jobType}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-5">
            {/* Apply Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-4">
              <h3 className="font-semibold text-gray-800 mb-4">Apply for this Job</h3>

              {applySuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="text-green-700 font-medium text-sm">Application Submitted!</p>
                  <p className="text-green-600 text-xs mt-1">We will notify you of any updates.</p>
                  <Link to="/my-applications" className="block mt-3 text-teal-600 text-sm font-medium hover:underline">
                    View My Applications →
                  </Link>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-4">
                    Deadline:{" "}
                    <span className={`font-medium ${daysLeft <= 7 ? "text-red-600" : "text-gray-700"}`}>
                      {deadline.toLocaleDateString("en-BD", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </p>
                  <button
                    onClick={handleApply}
                    disabled={applying || daysLeft <= 0}
                    className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {applying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : daysLeft <= 0 ? (
                      "Deadline Passed"
                    ) : (
                      "Apply Now"
                    )}
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    {job.applications} people already applied
                  </p>
                </>
              )}
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-3">Share This Job</h3>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium py-2 rounded-lg transition-colors">
                  LinkedIn
                </button>
                <button className="flex-1 bg-sky-50 hover:bg-sky-100 text-sky-500 text-sm font-medium py-2 rounded-lg transition-colors">
                  Twitter
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-medium py-2 rounded-lg transition-colors"
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="w-full border border-gray-200 hover:border-teal-300 text-gray-600 hover:text-teal-700 font-medium py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
            >
              ← Back to Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}