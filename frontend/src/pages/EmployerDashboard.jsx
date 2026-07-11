import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaEye } from "react-icons/fa";

export default function EmployerDashboard() {
  const navigate = useNavigate(); 
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await fetch("http://localhost:5000/api/jobs/my-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch jobs");
      }

      setJobs(data.jobs || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete job handler
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      setDeleteLoading(jobId);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/jobs/${jobId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div style={{ width: "32px", height: "32px", border: "4px solid #14b8a6", borderTop: "4px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", padding: "24px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827", marginBottom: "4px" }}>
              Employer Dashboard
            </h1>
            <p style={{ color: "#4b5563" }}>Manage your job listings</p>
          </div>
          <button
  onClick={() => navigate("/post-job")}

            style={{
              backgroundColor: "#14b8a6",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaPlus /> Post New Job
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ backgroundColor: "#f9fafb", padding: "32px 16px", minHeight: "80vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Error Message */}
          {error && (
            <div style={{ backgroundColor: "#fee2e2", border: "1px solid #fecaca", borderRadius: "8px", padding: "16px", marginBottom: "24px", color: "#991b1b" }}>
              {error}
            </div>
          )}

          {/* Empty State */}
          {jobs.length === 0 ? (
            <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "48px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
                No Jobs Posted Yet
              </h2>
              <p style={{ color: "#6b7280", marginBottom: "24px" }}>
                Start by posting your first job listing to attract qualified candidates.
              </p>
              <button
  onClick={() => navigate("/post-job")}
                style={{
                  backgroundColor: "#14b8a6",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Post Your First Job
              </button>
            </div>
          ) : (
            <div>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                <div style={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "16px" }}>
                  <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Total Jobs Posted</p>
                  <p style={{ fontSize: "28px", fontWeight: "bold", color: "#111827" }}>{jobs.length}</p>
                </div>
                <div style={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "16px" }}>
                  <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Active Jobs</p>
                  <p style={{ fontSize: "28px", fontWeight: "bold", color: "#22c55e" }}>
                    {jobs.filter((j) => j.status === "active").length}
                  </p>
                </div>
                <div style={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "16px" }}>
                  <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Total Applications</p>
                  <p style={{ fontSize: "28px", fontWeight: "bold", color: "#14b8a6" }}>
                    {jobs.reduce((sum, j) => sum + (j.applications || 0), 0)}
                  </p>
                </div>
              </div>

              {/* Jobs List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      padding: "24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "16px",
                    }}
                  >
                    {/* Job Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                        {/* Company Avatar */}
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "8px",
                            backgroundColor: "#ccf0ee",
                            border: "1px solid #a5f3fc",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#14b8a6",
                            flexShrink: 0,
                          }}
                        >
                          {job.company?.charAt(0) || "?"}
                        </div>

                        {/* Job Details */}
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>
                            {job.title}
                          </h3>
                          <p style={{ color: "#14b8a6", fontWeight: "500", marginBottom: "4px" }}>{job.company}</p>
                          <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>{job.location}</p>

                          {/* Tags */}
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            <span style={{ backgroundColor: "#dbeafe", color: "#1e40af", fontSize: "11px", padding: "4px 8px", borderRadius: "20px" }}>
                              {job.jobType}
                            </span>
                            <span style={{ backgroundColor: "#f3f4f6", color: "#4b5563", fontSize: "11px", padding: "4px 8px", borderRadius: "20px" }}>
                              {job.applications || 0} applications
                            </span>
                            {job.status === "active" && (
                              <span style={{ backgroundColor: "#dcfce7", color: "#166534", fontSize: "11px", padding: "4px 8px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "4px" }}>
                                <span style={{ width: "6px", height: "6px", backgroundColor: "#22c55e", borderRadius: "50%" }}></span>
                                Active
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                      <button
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#ccf0ee",
                          color: "#14b8a6",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "500",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <FaEye /> View
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        disabled={deleteLoading === job._id}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#fee2e2",
                          color: "#dc2626",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "500",
                          cursor: deleteLoading === job._id ? "not-allowed" : "pointer",
                          opacity: deleteLoading === job._id ? 0.5 : 1,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <FaTrash /> {deleteLoading === job._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#111827", color: "white", textAlign: "center", padding: "16px", marginTop: "auto" }}>
        <p>© 2026 JobPortal. All Rights Reserved.</p>
      </footer>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}