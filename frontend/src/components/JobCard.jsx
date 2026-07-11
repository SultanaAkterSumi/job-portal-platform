import { Link } from "react-router-dom";

const logoColors = [
  "#f97316",
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#ec4899",
  "#6366f1",
];

const JobCard = ({ job }) => {
  const index = job?._id ? job._id.charCodeAt(0) % logoColors.length : 0;
  const logoColor = logoColors[index];

  const formatSalary = (salary) => {
    if (!salary) return "Negotiable";
    const currency = salary.currency || "BDT";
    return `${currency} ${salary.min || 0} - ${salary.max || 0}`;
  };

  const typeColors = {
    "full-time": { bg: "#fff7ed", color: "#ea580c" },
    "part-time": { bg: "#eff6ff", color: "#2563eb" },
    remote: { bg: "#f5f3ff", color: "#7c3aed" },
    contract: { bg: "#fefce8", color: "#ca8a04" },
    internship: { bg: "#f5f3ff", color: "#7c3aed" },
    freelance: { bg: "#fdf2f8", color: "#db2777" },
  };

  const tc = typeColors[job?.jobType] || {
    bg: "#f3f4f6",
    color: "#374151",
  };

  const companyInitials = job?.company
    ? job.company.substring(0, 2).toUpperCase()
    : "JP";

  // Real API jobs must always have a MongoDB _id.
  if (!job?._id) return null;

  return (
    <Link
      to={`/jobs/${job._id}`}
      className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#f97316")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: logoColor }}
        >
          {companyInitials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3
              className="font-semibold text-sm truncate"
              style={{ color: "#1a1a2e" }}
            >
              {job.title}
            </h3>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 capitalize"
              style={{ background: tc.bg, color: tc.color }}
            >
              {job.jobType}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className="text-xs text-gray-500">🏢 {job.company}</span>
            <span className="text-xs text-gray-300">|</span>
            <span className="text-xs text-gray-500">📍 {job.location}</span>
            <span className="text-xs text-gray-300">|</span>
            <span className="text-xs text-gray-500">
              💰 {formatSalary(job.salary)}
            </span>
          </div>

          {job.skills?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {job.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className="text-xs text-gray-400">
            {job.createdAt
              ? new Date(job.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })
              : ""}
          </span>
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
            style={{ background: "#f97316" }}
          >
            Job Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
