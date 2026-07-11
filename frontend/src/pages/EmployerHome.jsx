import React, { useState } from "react";  
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUsers,
  FaChartLine,
  FaBuilding,
  FaFileAlt,
} from "react-icons/fa";

const EmployerHome = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("home");
  const auth = useAuth();
  const isAuthenticated = auth?.isAuthenticated;
  const logout = auth?.logout;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ fontFamily: "Poppins, Arial, sans-serif" }}>
      {/* HOME PAGE */}
      {page === "home" && (
                
        <>
          {/* Navbar */}
          <nav style={{ background: "#1a1a2e", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 42px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ background: "#0d9488", padding: "6px 10px", borderRadius: "8px", color: "white", fontWeight: "bold", fontSize: "14px" }}>JP</div>
              <span style={{ color: "white", fontSize: "20px", fontWeight: "800" }}>Job<span style={{ color: "#0d9488" }}>Portal</span></span>
            </div>

            <ul style={{ display: "flex", gap: "32px", listStyle: "none", fontSize: "12px", fontWeight: "700", color: "#cbd5e1", margin: 0, padding: 0, alignItems: "center" }}>
              <li 
                onClick={() => setPage("home")}
                style={{ cursor: "pointer", color: "#0d9488" }}>
                HOME
              </li>
              <li 
                onClick={() => setPage("about")}
                style={{ cursor: "pointer" }}>
                ABOUT
              </li>
              <li
                onClick={() => navigate("/employer-dashboard")}
                style={{ cursor: "pointer", color: "#14b8a6", fontWeight: "bold" }}>
                MY JOBS
              </li>
            </ul>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  {isAuthenticated ? (
    <button
      onClick={handleLogout}
      style={{ background: "transparent", border: "1px solid #f87171", color: "#f87171", padding: "8px 16px", cursor: "pointer", fontSize: "12px", fontWeight: "700", borderRadius: "4px" }}>
      Logout
    </button>
  ) : (
    <button
      onClick={() => navigate("/login")}
      style={{ background: "transparent", border: "1px solid #cbd5e1", color: "#cbd5e1", padding: "8px 16px", cursor: "pointer", fontSize: "12px", fontWeight: "700", borderRadius: "4px" }}>
      Login
    </button>
  )}
</div>
          </nav>

          {/* Hero */}
          <section style={{ position: "relative", height: "calc(100vh - 64px)", minHeight: "540px", backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(7,18,26,0.58)" }}></div>

            <div style={{ position: "relative", zIndex: 2, color: "white", paddingLeft: "86px", paddingTop: "130px", maxWidth: "730px" }}>
              <div style={{ position: "absolute", top: "108px", left: "60px", width: "143px", height: "158px", borderLeft: "12px solid #f97316", borderTop: "12px solid #f97316", zIndex: -1 }}></div>

              <h1 style={{ fontSize: "48px", lineHeight: 1.18, fontWeight: 900, marginBottom: "22px" }}>
                Hire The Perfect Talent <br />For Your Company
              </h1>

              <p style={{ fontSize: "15px", lineHeight: 1.8, fontWeight: 700, marginBottom: "26px", maxWidth: "570px" }}>
                Find skilled candidates faster, manage job posts easily, and grow your team with our professional employer platform.
              </p>

              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  onClick={() => navigate("/register")}
                  style={{ background: "#f97316", border: "none", color: "white", padding: "15px 32px", fontSize: "13px", fontWeight: 800, cursor: "pointer" }}>
                  Post A Job
                </button>
              </div>
            </div>
          </section>

          {/* Features */}
          <section style={{ padding: "72px 16px", background: "#f4f7fb" }}>
            <div style={{ textAlign: "center", marginBottom: "38px" }}>
              <h2 style={{ fontSize: "30px", fontWeight: 900, color: "#030712" }}>Employer Dashboard Features</h2>
              <p style={{ fontSize: "13px", color: "#4b5563", marginTop: "8px" }}>Everything an employer needs to manage hiring smoothly.</p>
            </div>

            <div style={{ maxWidth: "1100px", margin: "auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
              {[
                { icon: <FaFileAlt size={25} />, title: "Create Job Posts", desc: "Easily publish job vacancies with title, salary, location, and required skills." },
                { icon: <FaUsers size={25} />, title: "Manage Applicants", desc: "View candidate profiles, resumes, application status, and shortlist applicants." },
                { icon: <FaChartLine size={25} />, title: "Track Applications", desc: "Monitor how many candidates applied and analyze hiring performance." },
                { icon: <FaBuilding size={25} />, title: "Company Profile", desc: "Show your company information, logo, description, and job openings." },
              ].map((f) => (
                <div key={f.title} style={{ background: "white", padding: "28px 24px", textAlign: "center", borderRadius: "4px", boxShadow: "0 10px 28px rgba(0,0,0,0.06)" }}>
                  <div style={{ width: "58px", height: "58px", background: "#f0fdfa", color: "#0d9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: "16px", marginBottom: "12px", color: "#111827" }}>{f.title}</h3>
                  <p style={{ fontSize: "12px", color: "#4b5563", lineHeight: 1.8 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section style={{ position: "relative", minHeight: "155px", backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80')", backgroundSize: "cover", display: "flex", alignItems: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(13,148,136,0.9)" }}></div>
            <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1150px", margin: "auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", textAlign: "center", color: "white" }}>
              {[
                { value: "1,250+", label: "Jobs Posted" },
                { value: "850+", label: "Companies" },
                { value: "12k+", label: "Candidates" },
                { value: "95%", label: "Hiring Success" },
              ].map((s) => (
                <div key={s.label}>
                  <h2 style={{ fontSize: "36px", fontWeight: 900, marginBottom: "4px" }}>{s.value}</h2>
                  <p style={{ fontSize: "13px", fontWeight: 800 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ position: "relative", minHeight: "270px", backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')", backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(5,15,25,0.78)" }}></div>
            <div style={{ position: "relative", zIndex: 2, textAlign: "center", color: "white" }}>
              <h2 style={{ fontSize: "31px", fontWeight: 900, marginBottom: "12px" }}>Ready To Hire The Best Talent?</h2>
              <p style={{ fontSize: "14px", fontWeight: 600, marginBottom: "24px" }}>Start posting jobs today and connect with qualified candidates.</p>
              <button 
                onClick={() => navigate("/register")}
                style={{ background: "#0d9488", border: "none", color: "white", padding: "14px 34px", fontSize: "13px", fontWeight: 800, cursor: "pointer" }}>
                Get Started
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ background: "#0d0d1a", color: "white", textAlign: "center", padding: "18px 10px", fontSize: "12px", fontWeight: 600 }}>
            <p>© 2026 JobPortal. All Rights Reserved.</p>
          </footer>
        </>
      )}

      {/* ABOUT PAGE */}
      {page === "about" && (
        <>
          {/* Navbar */}
          <nav style={{ background: "#1a1a2e", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 42px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ background: "#0d9488", padding: "6px 10px", borderRadius: "8px", color: "white", fontWeight: "bold", fontSize: "14px" }}>JP</div>
              <span style={{ color: "white", fontSize: "20px", fontWeight: "800" }}>Job<span style={{ color: "#0d9488" }}>Portal</span></span>
            </div>

            <ul style={{ display: "flex", gap: "32px", listStyle: "none", fontSize: "12px", fontWeight: "700", color: "#cbd5e1", margin: 0, padding: 0, alignItems: "center" }}>
              <li 
                onClick={() => setPage("home")}
                style={{ cursor: "pointer" }}>
                HOME
              </li>
              <li 
                onClick={() => setPage("about")}
                style={{ cursor: "pointer", color: "#0d9488" }}>
                ABOUT
              </li>
              <li
                onClick={() => navigate("/employer-dashboard")}
                style={{ cursor: "pointer", color: "#14b8a6", fontWeight: "bold" }}>
                MY JOBS
              </li>
            </ul>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  {isAuthenticated ? (
    <button
      onClick={handleLogout}
      style={{ background: "transparent", border: "1px solid #f87171", color: "#f87171", padding: "8px 16px", cursor: "pointer", fontSize: "12px", fontWeight: "700", borderRadius: "4px" }}>
      Logout
    </button>
  ) : (
    <button
      onClick={() => navigate("/login")}
      style={{ background: "transparent", border: "1px solid #cbd5e1", color: "#cbd5e1", padding: "8px 16px", cursor: "pointer", fontSize: "12px", fontWeight: "700", borderRadius: "4px" }}>
      Login
    </button>
  )}
</div>
          </nav>

          {/* HERO */}
          <section style={{ paddingTop: "80px", paddingBottom: "80px", textAlign: "center", background: "linear-gradient(135deg, #1a1a2e, #0f3460)" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 16px" }}>
              <h1 style={{ fontSize: "42px", fontWeight: 900, color: "white", marginBottom: "16px" }}>About Us</h1>
              <p style={{ fontSize: "16px", color: "#94a3b8" }}>
                Connecting talent with opportunity across Bangladesh and beyond.
              </p>
            </div>
          </section>

          {/* MISSION */}
          <section style={{ paddingTop: "64px", paddingBottom: "64px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Our Mission</p>
                  <h2 style={{ fontSize: "32px", fontWeight: 900, color: "#1a1a2e", marginBottom: "16px" }}>
                    Good Life Begins With A Good Company
                  </h2>
                  <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: 1.8, marginBottom: "16px" }}>
                    We believe that the right job can transform a person's life. Our platform is built to make the job search process simple, transparent, and effective for everyone.
                  </p>
                  <p style={{ fontSize: "15px", color: "#4b5563", lineHeight: 1.8, marginBottom: "24px" }}>
                    From fresh graduates to experienced professionals, we help thousands of people find meaningful careers every day across Bangladesh.
                  </p>
                  <button 
                    onClick={() => navigate("/register")}
                    style={{ background: "#f97316", border: "none", color: "white", padding: "12px 24px", fontSize: "13px", fontWeight: 800, cursor: "pointer", borderRadius: "4px" }}>
                    Post Your First Job
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {[
                    { value: "12k+", label: "Clients Worldwide" },
                    { value: "20k+", label: "Active Resumes" },
                    { value: "18k+", label: "Companies" },
                    { value: "95%", label: "Success Rate" },
                  ].map((stat) => (
                    <div key={stat.label} style={{ background: "white", borderRadius: "12px", padding: "24px", textAlign: "center", border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}>
                      <div style={{ fontSize: "28px", fontWeight: 900, marginBottom: "8px", color: "#f97316" }}>{stat.value}</div>
                      <div style={{ fontSize: "13px", color: "#4b5563" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* WHY US */}
          <section style={{ paddingTop: "64px", paddingBottom: "64px", background: "white" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
              <div style={{ textAlign: "center", marginBottom: "48px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Why Choose Us</p>
                <h2 style={{ fontSize: "32px", fontWeight: 900, color: "#1a1a2e" }}>Create A Better Future For Yourself</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                {[
                  { icon: "🎯", title: "Targeted Job Matches", desc: "Our smart algorithm matches you with jobs that fit your skills, experience, and career goals perfectly." },
                  { icon: "🚀", title: "Fast & Easy Apply", desc: "Apply to multiple jobs with a single click. No repetitive forms, no wasted time." },
                  { icon: "📊", title: "Track Your Progress", desc: "Monitor your applications in real-time and stay updated on every step of the hiring process." },
                ].map((item) => (
                  <div key={item.title} style={{ background: "#f4f7fb", borderRadius: "12px", padding: "24px", border: "1px solid #e5e7eb" }}>
                    <div style={{ fontSize: "36px", marginBottom: "16px" }}>{item.icon}</div>
                    <h3 style={{ fontWeight: 700, fontSize: "16px", marginBottom: "8px", color: "#1a1a2e" }}>{item.title}</h3>
                    <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.8 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TEAM */}
          <section style={{ paddingTop: "64px", paddingBottom: "64px", background: "#1a1a2e" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", textAlign: "center" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Our Team</p>
              <h2 style={{ fontSize: "32px", fontWeight: 900, color: "white", marginBottom: "48px" }}>The People Behind JobPortal</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
                {[
                  { name: "Rafiq Ahmed", role: "CEO & Founder", avatar: "RA" },
                  { name: "Nadia Islam", role: "Head of Design", avatar: "NI" },
                  { name: "Tanvir Hossain", role: "Lead Developer", avatar: "TH" },
                  { name: "Sumaiya Khan", role: "HR Manager", avatar: "SK" },
                ].map((member) => (
                  <div key={member.name} style={{ borderRadius: "12px", padding: "24px", background: "rgba(255,255,255,0.07)" }}>
                    <div style={{ width: "64px", height: "64px", borderRadius: "50%", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "16px", background: "#f97316" }}>
                      {member.avatar}
                    </div>
                    <h3 style={{ fontWeight: 700, color: "white", fontSize: "16px" }}>{member.name}</h3>
                    <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ background: "#0d0d1a", color: "white", textAlign: "center", padding: "18px 10px", fontSize: "12px", fontWeight: 600 }}>
            <p>© 2026 JobPortal. All Rights Reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default EmployerHome;