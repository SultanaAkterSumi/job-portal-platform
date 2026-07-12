import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewApplicants() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(
          `http://localhost:5000/api/applications/job/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        setApplicants(data.applications || []);

        // Job title আনো
        const jobRes = await fetch(
          `http://localhost:5000/api/jobs/${jobId}`
        );
        const jobData = await jobRes.json();
        setJobTitle(jobData.title || "Job");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", border: "4px solid #14b8a6", borderTop: "4px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", padding: "24px 16px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <button
              onClick={() => navigate("/employer-dashboard")}
              style={{ fontSize: "13px", color: "#6b7280", background: "none", border: "none", cursor: "pointer", marginBottom: "6px", display: "flex", alignItems: "center", gap: "4px" }}
            >
              ← Back to Dashboard
            </button>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827" }}>
              Applicants for: {jobTitle}
            </h1>
            <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "4px" }}>
              Total: {applicants.length} applicant{applicants.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>

        {error && (
          <div style={{ backgroundColor: "#fee2e2", border: "1px solid #fecaca", borderRadius: "8px", padding: "16px", marginBottom: "24px", color: "#991b1b" }}>
            {error}
          </div>
        )}

        {applicants.length === 0 ? (
          <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "48px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
              No Applications Yet
            </h2>
            <p style={{ color: "#6b7280" }}>No one has applied for this job yet.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {applicants.map((app, index) => (
              <div
                key={app._id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  padding: "24px",
                }}
              >
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    {/* Avatar */}
                    <div style={{
                      width: "48px", height: "48px", borderRadius: "50%",
                      backgroundColor: "#ccf0ee", color: "#14b8a6",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "bold", fontSize: "18px", flexShrink: 0,
                    }}>
                      {app.applicant?.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "2px" }}>
                        {app.applicant?.name || "Unknown"}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#6b7280" }}>
                        {app.applicant?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  {/* Applied date */}
                  <p style={{ fontSize: "12px", color: "#9ca3af", flexShrink: 0 }}>
                    Applied: {new Date(app.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>

                {/* Cover Letter */}
                {app.coverLetter && (
                  <div style={{ backgroundColor: "#f9fafb", borderRadius: "8px", padding: "14px", marginBottom: "16px" }}>
                    <p style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Cover Letter
                    </p>
                    <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.6" }}>
                      {app.coverLetter}
                    </p>
                  </div>
                )}

                {/* Resume + extra info */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  {app.resume && (
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        backgroundColor: "#14b8a6", color: "white",
                        padding: "8px 16px", borderRadius: "6px",
                        fontSize: "13px", fontWeight: "500", textDecoration: "none"
                      }}
                    >
                      📄 View Resume
                    </a>
                  )}

                  {app.applicant?.location && (
                    <span style={{ fontSize: "13px", color: "#6b7280" }}>
                      📍 {app.applicant.location}
                    </span>
                  )}

                  {app.applicant?.skills?.length > 0 && (
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {app.applicant.skills.slice(0, 4).map((skill) => (
                        <span key={skill} style={{
                          backgroundColor: "#f3f4f6", color: "#374151",
                          fontSize: "11px", padding: "3px 8px", borderRadius: "20px",
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}