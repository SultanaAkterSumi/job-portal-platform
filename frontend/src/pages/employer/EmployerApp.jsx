import React, { useState } from "react";
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
  FaLock,
  FaUserPlus,
} from "react-icons/fa";
import "../../../frontend_employee/src/style.css";

function EmployerApp() {
  const [page, setPage] = useState("home");

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <div className="logo-box">JP</div>
          <span className="logo-text">Job<span>Portal</span></span>
        </div>

        <ul className="navLinks">
          <li onClick={() => setPage("home")} className={page === "home" ? "active" : ""}>HOME</li>
          <li>ABOUT</li>
          <li className="jobsMenu">JOBS <FaChevronDown /></li>
          <li>EMPLOYERS</li>
          <li onClick={() => setPage("contact")} className={page === "contact" ? "active" : ""}>CONTACT</li>
          <li onClick={() => setPage("dashboard")} className={page === "dashboard" ? "active" : ""}>MY JOBS</li>
        </ul>

        <button className="topPostBtn" onClick={() => setPage("postjob")}>
          Post A Job <FaArrowRight />
        </button>
      </nav>

      {page === "home" && <HomePage setPage={setPage} />}
      {page === "contact" && <ContactPage />}
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
          <h1>Hire The Perfect Talent <br />For Your Company</h1>
          <p>Find skilled candidates faster, manage job posts easily, and grow your team with our professional employer platform.</p>
          <div className="heroBtns">
            <button className="btn postBtn" onClick={() => setPage("postjob")}>Post A Job</button>
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
        </select>
        <button onClick={() => setPage("postjob")}>Post Job</button>
      </section>

      <section className="featuresSection">
        <div className="sectionTitle">
          <h2>Employer Dashboard Features</h2>
          <p>Everything an employer needs to manage hiring smoothly.</p>
        </div>
        <div className="featureGrid">
          {[
            { icon: <FaFileAlt />, title: "Create Job Posts", desc: "Easily publish job vacancies with title, salary, location, and required skills." },
            { icon: <FaUsers />, title: "Manage Applicants", desc: "View candidate profiles, resumes, application status, and shortlist applicants." },
            { icon: <FaChartLine />, title: "Track Applications", desc: "Monitor how many candidates applied and analyze hiring performance." },
            { icon: <FaBuilding />, title: "Company Profile", desc: "Show your company information, logo, description, and job openings." },
          ].map((f) => (
            <div key={f.title} className="featureCard">
              <div className="iconCircle">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="statsSection">
        <div className="statsOverlay"></div>
        <div className="statsContent">
          {[
            { value: "1,250+", label: "Jobs Posted" },
            { value: "850+", label: "Companies" },
            { value: "12k+", label: "Candidates" },
            { value: "95%", label: "Hiring Success" },
          ].map((s) => (
            <div key={s.label} className="statBox">
              <h2>{s.value}</h2>
              <p>{s.label}</p>
            </div>
          ))}
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
          <p>Have questions about posting jobs, managing applicants, or company profiles? Send us a message.</p>
          <div className="contactItem"><FaEnvelope /><span>support@jobportal.com</span></div>
          <div className="contactItem"><FaPhone /><span>+880 1234 567890</span></div>
          <div className="contactItem"><FaMapMarkerAlt /><span>Dhaka, Bangladesh</span></div>
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
      if (!token) { setError("Please login first"); return; }
      const response = await fetch("http://localhost:5000/api/jobs/my-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch jobs");
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      setDeleteLoading(jobId);
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete job");
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) return (
    <div style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div style={{width: "32px", height: "32px", border: "4px solid #0d9488", borderTop: "4px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite"}}></div>
    </div>
  );

  return (
    <>
      <section style={{backgroundColor: "white", borderBottom: "1px solid #e5e7eb", padding: "24px 0"}}>
        <div style={{maxWidth: "1200px", margin: "0 auto", padding: "0 16px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <div>
            <h1 style={{fontSize: "28px", fontWeight: "bold", color: "#111827"}}>Employer Dashboard</h1>
            <p style={{color: "#4b5563"}}>Manage your job listings</p>
          </div>
          <button onClick={() => setPage("postjob")} style={{backgroundColor: "#0d9488", color: "white", padding: "12px 24px", borderRadius: "8px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px"}}>
            <FaPlus /> Post New Job
          </button>
        </div>
      </section>

      <section style={{backgroundColor: "#f9fafb", padding: "32px 16px", minHeight: "80vh"}}>
        <div style={{maxWidth: "1200px", margin: "0 auto"}}>
          {error && <div style={{backgroundColor: "#fee2e2", border: "1px solid #fecaca", borderRadius: "8px", padding: "16px", marginBottom: "24px", color: "#991b1b"}}>{error}</div>}

          {jobs.length === 0 ? (
            <div style={{backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "48px", textAlign: "center"}}>
              <div style={{fontSize: "48px", marginBottom: "16px"}}>📋</div>
              <h2 style={{fontSize: "20px", fontWeight: "bold", color: "#111827", marginBottom: "8px"}}>No Jobs Posted Yet</h2>
              <p style={{color: "#6b7280", marginBottom: "24px"}}>Start by posting your first job listing.</p>
              <button onClick={() => setPage("postjob")} style={{backgroundColor: "#0d9488", color: "white", padding: "12px 24px", borderRadius: "8px", border: "none", cursor: "pointer"}}>
                Post Your First Job
              </button>
            </div>
          ) : (
            <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
              {jobs.map((job) => (
                <div key={job._id} style={{backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px"}}>
                  <div>
                    <h3 style={{fontSize: "18px", fontWeight: "600", color: "#111827"}}>{job.title}</h3>
                    <p style={{color: "#0d9488"}}>{job.company}</p>
                    <p style={{fontSize: "12px", color: "#6b7280"}}>{job.location}</p>
                  </div>
                  <div style={{display: "flex", gap: "8px"}}>
                    <button style={{padding: "8px 16px", backgroundColor: "#f0fdfa", color: "#0d9488", border: "none", borderRadius: "6px", cursor: "pointer"}}>
                      <FaEye /> View
                    </button>
                    <button onClick={() => handleDelete(job._id)} disabled={deleteLoading === job._id} style={{padding: "8px 16px", backgroundColor: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer"}}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <footer className="footer"><p>© 2026 JobPortal. All Rights Reserved.</p></footer>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

function PostJob({ setPage }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "", company: "", description: "",
    responsibilities: [""], requirements: [""],
    skills: "", salary: { min: "", max: "", currency: "BDT" },
    location: "", jobType: "full-time", category: "",
    experienceLevel: "intermediate", deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("salary.")) {
      const key = name.split(".")[1];
      setFormData({ ...formData, salary: { ...formData.salary, [key]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (e, field, index) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => setFormData({ ...formData, [field]: [...formData[field], ""] });
  const removeArrayItem = (field, index) => setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.title || !formData.company || !formData.description) { setError("Title, company, and description are required"); return; }
    if (!formData.salary.min || !formData.salary.max) { setError("Salary range is required"); return; }
    if (!formData.deadline) { setError("Deadline is required"); return; }

    const jobData = {
      ...formData,
      responsibilities: formData.responsibilities.filter((r) => r.trim()),
      requirements: formData.requirements.filter((r) => r.trim()),
      skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      salary: { ...formData.salary, min: Number(formData.salary.min), max: Number(formData.salary.max) },
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(jobData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to post job");
      setSuccess(true);
      setTimeout(() => setPage("dashboard"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div style={{minHeight: "100vh", backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div style={{backgroundColor: "white", borderRadius: "12px", padding: "32px", textAlign: "center", maxWidth: "400px"}}>
        <div style={{fontSize: "48px", marginBottom: "16px"}}>🎉</div>
        <h2 style={{fontSize: "20px", fontWeight: "bold", marginBottom: "8px"}}>Job Posted Successfully!</h2>
        <p style={{color: "#6b7280", marginBottom: "24px"}}>Redirecting to dashboard...</p>
      </div>
    </div>
  );

  return (
    <div style={{backgroundColor: "#f9fafb", padding: "32px 16px", minHeight: "100vh"}}>
      <div style={{maxWidth: "800px", margin: "0 auto"}}>
        <button onClick={() => setPage("home")} style={{color: "#0d9488", cursor: "pointer", background: "none", border: "none", fontSize: "14px", marginBottom: "16px"}}>← Back</button>
        <h1 style={{fontSize: "28px", fontWeight: "bold", color: "#111827", marginBottom: "24px"}}>Post a New Job</h1>

        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "24px"}}>
          {error && <div style={{backgroundColor: "#fee2e2", borderRadius: "8px", padding: "16px", color: "#991b1b"}}>{error}</div>}

          {[
            { label: "Job Title *", name: "title", placeholder: "e.g., Senior React Developer" },
            { label: "Company Name *", name: "company", placeholder: "e.g., TechSoft BD" },
            { label: "Location *", name: "location", placeholder: "e.g., Dhaka, Bangladesh" },
          ].map((field) => (
            <div key={field.name} style={{backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px"}}>
              <label style={{display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "8px"}}>{field.label}</label>
              <input type="text" name={field.name} value={formData[field.name]} onChange={handleChange} placeholder={field.placeholder} style={{width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box"}} required />
            </div>
          ))}

          <div style={{backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px"}}>
            <h2 style={{fontSize: "18px", fontWeight: "600", marginBottom: "16px"}}>Salary (BDT)</h2>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px"}}>
              <div>
                <label style={{display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px"}}>Min *</label>
                <input type="number" name="salary.min" value={formData.salary.min} onChange={handleChange} placeholder="30000" style={{width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box"}} required />
              </div>
              <div>
                <label style={{display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px"}}>Max *</label>
                <input type="number" name="salary.max" value={formData.salary.max} onChange={handleChange} placeholder="80000" style={{width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box"}} required />
              </div>
            </div>
          </div>

          <div style={{backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px"}}>
            <h2 style={{fontSize: "18px", fontWeight: "600", marginBottom: "16px"}}>Job Details</h2>
            <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
              <div>
                <label style={{display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px"}}>Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe the position..." style={{width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", fontFamily: "inherit"}} required></textarea>
              </div>
              <div>
                <label style={{display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px"}}>Skills (comma-separated) *</label>
                <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, JavaScript, Git" style={{width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box"}} required />
              </div>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px"}}>
                <div>
                  <label style={{display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px"}}>Job Type</label>
                  <select name="jobType" value={formData.jobType} onChange={handleChange} style={{width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box"}}>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label style={{display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px"}}>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} style={{width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box"}} required>
                    <option value="">Select</option>
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
                <div>
                  <label style={{display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px"}}>Experience</label>
                  <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} style={{width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box"}}>
                    <option value="fresher">Fresher</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px"}}>
            <h2 style={{fontSize: "18px", fontWeight: "600", marginBottom: "16px"}}>Deadline *</h2>
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} style={{width: "100%", padding: "10px 16px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box"}} required />
          </div>

          <button type="submit" disabled={loading} style={{backgroundColor: "#0d9488", color: "white", padding: "14px 24px", borderRadius: "8px", border: "none", fontSize: "15px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1}}>
            {loading ? "Posting..." : "Post Job Now"}
          </button>
        </form>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default EmployerApp;