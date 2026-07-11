import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

function SectionTitle({ children }) {
  return (
    <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
      <span className="w-1 h-5 bg-teal-500 rounded-full inline-block" />
      {children}
    </h2>
  );
}

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const isEmployerView = auth?.user?.role === "employer";
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      if (!objectIdPattern.test(id || "")) {
        setError("Invalid job ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Failed to fetch job:", err.response?.data || err);
        setError(err.response?.data?.message || "Job not found");
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = () => {
    // Use the ID returned by MongoDB, not a mock/fallback route value.
    navigate(`/jobs/${job._id}/apply`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Job Not Found
        </h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <Link
          to="/jobs"
          className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700"
        >
          Browse All Jobs
        </Link>
      </div>
    );
  }

  const salary = job.salary || {};
  const responsibilities = job.responsibilities || [];
  const requirements = job.requirements || [];
  const skills = job.skills || [];

  const deadline = job.deadline ? new Date(job.deadline) : null;
  const daysLeft = deadline
    ? Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const deadlinePassed = daysLeft !== null && daysLeft <= 0;

  return (
    <div className="min-h-screen bg-gray-50">
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
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {job.title}
                  </h1>
                  <p className="text-teal-600 font-medium text-lg">
                    {job.company}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl font-bold text-teal-600">
                  {job.company?.charAt(0)?.toUpperCase() || "J"}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-teal-100 text-teal-700 text-sm font-medium px-3 py-1 rounded-full capitalize">
                  {job.jobType}
                </span>
                {job.category && (
                  <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                    {job.category}
                  </span>
                )}
                {job.experienceLevel && (
                  <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full capitalize">
                    {job.experienceLevel.replace("-", " ")}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 uppercase mb-1">Location</p>
                  <p className="text-sm font-medium text-gray-700">
                    {job.location || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase mb-1">Salary</p>
                  <p className="text-sm font-medium text-gray-700">
                    {salary.min || salary.max
                      ? `${salary.currency || "BDT"} ${salary.min || 0} - ${salary.max || 0}`
                      : "Negotiable"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase mb-1">Deadline</p>
                  <p className="text-sm font-medium text-gray-700">
                    {deadline
                      ? deadlinePassed
                        ? "Expired"
                        : `${daysLeft} days left`
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase mb-1">Applicants</p>
                  <p className="text-sm font-medium text-gray-700">
                    {job.applications || 0} applied
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <SectionTitle>Job Description</SectionTitle>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {responsibilities.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <SectionTitle>Key Responsibilities</SectionTitle>
                <ul className="space-y-2">
                  {responsibilities.map((item, index) => (
                    <li key={index} className="text-gray-600 text-sm">
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {requirements.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <SectionTitle>Requirements</SectionTitle>
                <ul className="space-y-2">
                  {requirements.map((item, index) => (
                    <li key={index} className="text-gray-600 text-sm">
                      ▸ {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {skills.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <SectionTitle>Professional Skills Required</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-teal-50 text-teal-700 border border-teal-200 text-sm font-medium px-3 py-1.5 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-5">
            {/* Apply / Overview Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
              {isEmployerView ? (
                // ---- Employer view: show job overview instead of Apply button ----
                <>
                  <h3 className="font-semibold text-gray-800 mb-4">Job Overview</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <span className="font-medium text-green-600 capitalize">
                        {job.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Applicants</span>
                      <span className="font-medium text-gray-700">
                        {job.applications || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Deadline</span>
                      <span className="font-medium text-gray-700">
                        {deadline
                          ? deadlinePassed
                            ? "Expired"
                            : `${daysLeft} days left`
                          : "Not specified"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                // ---- Job seeker view: normal Apply button ----
                <>
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Apply for this Job
                  </h3>
                  <button
                    onClick={handleApply}
                    disabled={job.status !== "active" || deadlinePassed}
                    className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg"
                  >
                    {deadlinePassed ? "Deadline Passed" : "Apply Now"}
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    {job.applications || 0} people already applied
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

           <button
  onClick={() => navigate(isEmployerView ? "/employer-dashboard" : "/jobs")}
  className="w-full border border-gray-200 text-gray-600 hover:border-teal-300 hover:text-teal-700 py-2.5 rounded-lg text-sm transition-colors"
>
  {isEmployerView ? "← Back to My Jobs" : "← Back to Jobs"}
</button>
          </aside>
        </div>
      </div>
    </div>
  );
}