import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  FaBriefcase,
  FaArrowRight,
  FaChevronDown,
  FaUsers,
  FaChartLine,
  FaBuilding,
  FaFileAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaEnvelope,
  FaPhone,
  FaPlus,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import "./style.css";
import SignIn from "./SignIn";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <div className="logo-box">JP</div>
          <span className="logo-text">Job<span>Portal</span></span>
        </div>

        <ul className="navLinks">
          <li
            onClick={() => setPage("home")}
            className={page === "home" ? "active" : ""}
          >
            HOME
          </li>
          <li>ABOUT</li>
          <li className="jobsMenu">
            JOBS <FaChevronDown />
          </li>
          <li>EMPLOYERS</li>
          <li
            onClick={() => setPage("contact")}
            className={page === "contact" ? "active" : ""}
          >
            CONTACT
          </li>
          <li
            onClick={() => setPage("dashboard")}
            className={page === "dashboard" ? "active" : ""}
          >
            MY JOBS
          </li>
        </ul>

        <button className="topPostBtn" onClick={() => setPage("postjob")}>
          Post A Job <FaArrowRight />
        </button>
      </nav>

      {page === "home" && <HomePage setPage={setPage} />}
      {page === "contact" && <ContactPage />}
      {page === "signin" && <SignIn setPage={setPage} />}
      {page === "dashboard" && <EmployerDashboard setPage={setPage} />}
      {page === "postjob" && <PostJob setPage={setPage} />}
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <section className="hero">
        <div className="darkOverlay"></div>

        <div className="heroContent">
          <div className="cornerBorder"></div>

          <h1>
            Hire The Perfect Talent <br />
            For Your Company
          </h1>

          <p>
            Find skilled candidates faster, manage job posts easily, and grow your
            team with our professional employer platform.
          </p>

          <div className="heroBtns">
            <button className="btn postBtn" onClick={() => setPage("signin")}>
              Post A Job
            </button>
            <button className="btn findBtn">Find Talent</button>
          </div>
        </div>

       
      </section>

      <section className="searchSection">
        <input type="text" placeholder="Job Title" />
        <input type="text" placeholder="Company Name" />

        <select>
          <option>Select Category</option>
          <option>Web Development</option>
          <option>UI/UX Design</option>
          <option>Digital Marketing</option>
          <option>Data Entry</option>
        </select>

        <button onClick={() => setPage("signin")}>Post Job</button>
      </section>

      <section className="featuresSection">
        <div className="sectionTitle">
          <h2>Employer Dashboard Features</h2>
          <p>Everything an employer needs to manage hiring smoothly.</p>
        </div>

        <div className="featureGrid">
          <div className="featureCard">
            <div className="iconCircle">
              <FaFileAlt />
            </div>
            <h3>Create Job Posts</h3>
            <p>
              Easily publish job vacancies with title, salary, location, and
              required skills.
            </p>
          </div>

          <div className="featureCard">
            <div className="iconCircle">
              <FaUsers />
            </div>
            <h3>Manage Applicants</h3>
            <p>
              View candidate profiles, resumes, application status, and shortlist
              applicants.
            </p>
          </div>

          <div className="featureCard">
            <div className="iconCircle">
              <FaChartLine />
            </div>
            <h3>Track Applications</h3>
            <p>
              Monitor how many candidates applied and analyze hiring performance.
            </p>
          </div>

          <div className="featureCard">
            <div className="iconCircle">
              <FaBuilding />
            </div>
            <h3>Company Profile</h3>
            <p>
              Show your company information, logo, description, and job openings.
            </p>
          </div>
        </div>
      </section>

      <section className="statsSection">
        <div className="statsOverlay"></div>

        <div className="statsContent">
          <div className="statBox">
            <h2>1,250+</h2>
            <p>Jobs Posted</p>
          </div>

          <div className="statBox">
            <h2>850+</h2>
            <p>Companies</p>
          </div>

          <div className="statBox">
            <h2>12k+</h2>
            <p>Candidates</p>
          </div>

          <div className="statBox">
            <h2>95%</h2>
            <p>Hiring Success</p>
          </div>
        </div>
      </section>

      <section className="recentJobs">
        <div className="sectionTitle">
          <h2>Recent Employer Job Posts</h2>
          <p>Example job posts shown in employer section.</p>
        </div>

        <div className="jobGrid">
          <JobCard
            title="Frontend Developer"
            company="TechSoft Ltd."
            type="Full Time"
            location="Dhaka, Bangladesh"
            salary="$500 - $900 / Month"
          />

          <JobCard
            title="UI/UX Designer"
            company="Creative Agency"
            type="Remote"
            location="Remote"
            salary="$400 - $750 / Month"
          />

          <JobCard
            title="Digital Marketer"
            company="MarketPro"
            type="Part Time"
            location="Chittagong, Bangladesh"
            salary="$300 - $600 / Month"
          />
        </div>
      </section>

      <section className="ctaSection">
        <div className="ctaOverlay"></div>

        <div className="ctaContent">
          <h2>Ready To Hire The Best Talent?</h2>
          <p>Start posting jobs today and connect with qualified candidates.</p>
          <button onClick={() => setPage("contact")}>Contact Us</button>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 JobPortal. All Rights Reserved.</p>
      </footer>
    </>
  );
}

function JobCard({ title, company, type, location, salary }) {
  return (
    <div className="jobCard">
      <div className="jobTop">
        <div>
          <h3>{title}</h3>
          <h4>{company}</h4>
        </div>
        <span>{type}</span>
      </div>

      <p>
        <FaMapMarkerAlt /> {location}
      </p>
      <p>
        <FaMoneyBillWave /> {salary}
      </p>

      <button>View Details</button>
    </div>
  );
}

function ContactPage() {
  return (
    <>
      <section className="contactHero">
        <h1>Contact Us</h1>
        <p>Get in touch with us for employer support and hiring solutions.</p>
      </section>

      <section className="contactSection">
        <div className="contactInfo">
          <h2>Get In Touch</h2>
          <p>
            Have questions about posting jobs, managing applicants, or company
            profiles? Send us a message.
          </p>

          <div className="contactItem">
            <FaEnvelope />
            <span>support@jobportal.com</span>
          </div>

          <div className="contactItem">
            <FaPhone />
            <span>+880 1234 567890</span>
          </div>

          <div className="contactItem">
            <FaMapMarkerAlt />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>

        <form className="contactForm">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Your Message"></textarea>
          <button type="button">Send Message</button>
        </form>
      </section>

      <footer className="footer">
        <p>© 2026 JobPortal. All Rights Reserved.</p>
      </footer>
    </>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EMPLOYER DASHBOARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function EmployerDashboard({ setPage }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  React.useEffect(() => {
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

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
        <div style={{ width: "32px", height: "32px", border: "4px solid #14b8a6", borderTop: "4px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
      </div>
    );
  }

  return (
    <>
      <section style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", padding: "24px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827", marginBottom: "4px" }}>
              Employer Dashboard
            </h1>
            <p style={{ color: "#4b5563" }}>Manage your job listings</p>
          </div>
          <button
            onClick={() => setPage("postjob")}
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

      <section style={{ backgroundColor: "#f9fafb", padding: "32px 16px", minHeight: "80vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {error && (
            <div style={{ backgroundColor: "#fee2e2", border: "1px solid #fecaca", borderRadius: "8px", padding: "16px", marginBottom: "24px", color: "#991b1b" }}>
              {error}
            </div>
          )}

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
                onClick={() => setPage("postjob")}
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
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
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

                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>
                            {job.title}
                          </h3>
                          <p style={{ color: "#14b8a6", fontWeight: "500", marginBottom: "4px" }}>{job.company}</p>
                          <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>{job.location}</p>

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

      <footer className="footer">
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POST JOB
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function PostJob({ setPage }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    responsibilities: [""],
    requirements: [""],
    skills: "",
    salary: { min: "", max: "", currency: "BDT" },
    location: "",
    jobType: "full-time",
    category: "",
    experienceLevel: "intermediate",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("salary.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        salary: {
          ...formData.salary,
          [key]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleArrayChange = (e, field, index) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.company || !formData.description) {
      setError("Title, company, and description are required");
      return;
    }

    if (!formData.salary.min || !formData.salary.max) {
      setError("Salary range is required");
      return;
    }

    if (!formData.deadline) {
      setError("Deadline is required");
      return;
    }

    const jobData = {
      ...formData,
      responsibilities: formData.responsibilities.filter((r) => r.trim()),
      requirements: formData.requirements.filter((r) => r.trim()),
      skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      salary: {
        ...formData.salary,
        min: Number(formData.salary.min),
        max: Number(formData.salary.max),
      },
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to post job");
      }

      setSuccess(true);
      setTimeout(() => {
        setPage("dashboard");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "32px", maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
            Job Posted Successfully!
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Your job listing is now live and candidates can start applying.
          </p>
          <button
            onClick={() => setPage("dashboard")}
            style={{
              backgroundColor: "#14b8a6",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              width: "100%",
            }}
          >
            View Dashboard →
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "#f9fafb", padding: "32px 16px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ marginBottom: "32px" }}>
            <button
              onClick={() => setPage("home")}
              style={{ color: "#14b8a6", cursor: "pointer", background: "none", border: "none", fontSize: "14px", fontWeight: "500", marginBottom: "16px" }}
            >
              ← Back to Home
            </button>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
              Post a New Job
            </h1>
            <p style={{ color: "#6b7280" }}>
              Fill out the form below to post your job listing and start receiving applications.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {error && (
              <div style={{ backgroundColor: "#fee2e2", border: "1px solid #fecaca", borderRadius: "8px", padding: "16px", color: "#991b1b", fontSize: "14px" }}>
                {error}
              </div>
            )}

            {/* Basic Info */}
            <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "4px", height: "20px", backgroundColor: "#14b8a6", borderRadius: "2px" }}></span>
                Basic Information
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior React Developer"
                    style={{ width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g., TechSoft BD"
                    style={{ width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Dhaka, Bangladesh"
                    style={{ width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                      Job Type *
                    </label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      style={{ width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    >
                      <option value="full-time">Full-Time</option>
                      <option value="part-time">Part-Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      style={{ width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Technology">Technology</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                    Experience Level *
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                  >
                    <option value="entry-level">Entry Level</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Salary */}
            <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "4px", height: "20px", backgroundColor: "#14b8a6", borderRadius: "2px" }}></span>
                Salary
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                    Minimum Salary (BDT) *
                  </label>
                  <input
                    type="number"
                    name="salary.min"
                    value={formData.salary.min}
                    onChange={handleChange}
                    placeholder="30000"
                    style={{ width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                    Maximum Salary (BDT) *
                  </label>
                  <input
                    type="number"
                    name="salary.max"
                    value={formData.salary.max}
                    onChange={handleChange}
                    placeholder="80000"
                    style={{ width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "4px", height: "20px", backgroundColor: "#14b8a6", borderRadius: "2px" }}></span>
                Job Details
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the position, company culture, and what makes this opportunity unique..."
                    rows="4"
                    style={{ width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", fontFamily: "inherit" }}
                    required
                  ></textarea>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                    Required Skills (comma-separated) *
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Tailwind CSS, JavaScript, Git"
                    style={{ width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    required
                  />
                  <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>Separate skills with commas</p>
                </div>
              </div>
            </div>

            {/* Responsibilities */}
            <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "4px", height: "20px", backgroundColor: "#14b8a6", borderRadius: "2px" }}></span>
                Key Responsibilities
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => handleArrayChange(e, "responsibilities", index)}
                      placeholder="e.g., Build and maintain React components"
                      style={{ flex: 1, padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    />
                    {formData.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("responsibilities", index)}
                        style={{ padding: "10px 16px", backgroundColor: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addArrayItem("responsibilities")}
                  style={{ color: "#14b8a6", cursor: "pointer", background: "none", border: "none", fontSize: "14px", fontWeight: "500", textAlign: "left" }}
                >
                  + Add Responsibility
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "4px", height: "20px", backgroundColor: "#14b8a6", borderRadius: "2px" }}></span>
                Requirements
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {formData.requirements.map((req, index) => (
                  <div key={index} style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayChange(e, "requirements", index)}
                      placeholder="e.g., 2+ years of experience with React"
                      style={{ flex: 1, padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("requirements", index)}
                        style={{ padding: "10px 16px", backgroundColor: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addArrayItem("requirements")}
                  style={{ color: "#14b8a6", cursor: "pointer", background: "none", border: "none", fontSize: "14px", fontWeight: "500", textAlign: "left" }}
                >
                  + Add Requirement
                </button>
              </div>
            </div>

            {/* Deadline */}
            <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "4px", height: "20px", backgroundColor: "#14b8a6", borderRadius: "2px" }}></span>
                Application Deadline
              </h2>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>
                  Deadline Date *
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" }}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  backgroundColor: "#14b8a6",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.5 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {loading ? (
                  <>
                    <div style={{ width: "16px", height: "16px", border: "2px solid white", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                    Posting Job...
                  </>
                ) : (
                  "Post Job Now"
                )}
              </button>

              <button
                type="button"
                onClick={() => setPage("home")}
                style={{
                  padding: "12px 24px",
                  border: "1px solid #d1d5db",
                  color: "#4b5563",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);