import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "react-icons/fa";

const EmployerHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{fontFamily: "Poppins, Arial, sans-serif"}}>

      {/* Navbar */}
      <nav style={{background: "#1a1a2e", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 42px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)"}}>
        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
          <div style={{background: "#0d9488", padding: "6px 10px", borderRadius: "8px", color: "white", fontWeight: "bold", fontSize: "14px"}}>JP</div>
          <span style={{color: "white", fontSize: "20px", fontWeight: "800"}}>Job<span style={{color: "#0d9488"}}>Portal</span></span>
        </div>

        <ul style={{display: "flex", gap: "32px", listStyle: "none", fontSize: "12px", fontWeight: "700", color: "#cbd5e1"}}>
          <li style={{cursor: "pointer", color: "#0d9488"}}>HOME</li>
          <li style={{cursor: "pointer"}}>ABOUT</li>
          <li style={{cursor: "pointer", display: "flex", alignItems: "center", gap: "6px"}}>JOBS <FaChevronDown size={10}/></li>
          <li style={{cursor: "pointer"}}>EMPLOYERS</li>
          <li style={{cursor: "pointer"}}>CONTACT</li>
        </ul>

        <div style={{display: "flex", gap: "12px", alignItems: "center"}}>
          <button
            onClick={handleLogout}
            style={{background: "transparent", border: "1px solid #cbd5e1", color: "#cbd5e1", padding: "8px 16px", cursor: "pointer", fontSize: "12px", fontWeight: "700", borderRadius: "4px"}}
          >
            Logout
          </button>
          <button
            style={{background: "#0d9488", border: "none", color: "white", padding: "0 24px", height: "64px", fontSize: "13px", fontWeight: "800", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px"}}
          >
            Post A Job <FaArrowRight />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{position: "relative", height: "calc(100vh - 64px)", minHeight: "540px", backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden"}}>
        <div style={{position: "absolute", inset: 0, background: "rgba(7,18,26,0.58)"}}></div>

        <div style={{position: "relative", zIndex: 2, color: "white", paddingLeft: "86px", paddingTop: "130px", maxWidth: "730px"}}>
          <div style={{position: "absolute", top: "108px", left: "60px", width: "143px", height: "158px", borderLeft: "12px solid #f97316", borderTop: "12px solid #f97316", zIndex: -1}}></div>

          <h1 style={{fontSize: "48px", lineHeight: 1.18, fontWeight: 900, marginBottom: "22px"}}>
            Hire The Perfect Talent <br />For Your Company
          </h1>

          <p style={{fontSize: "15px", lineHeight: 1.8, fontWeight: 700, marginBottom: "26px", maxWidth: "570px"}}>
            Find skilled candidates faster, manage job posts easily, and grow your team with our professional employer platform.
          </p>

          <div style={{display: "flex", gap: "15px"}}>
            <button style={{background: "#f97316", border: "none", color: "white", padding: "15px 32px", fontSize: "13px", fontWeight: 800, cursor: "pointer"}}>
              Post A Job
            </button>
            <button style={{background: "#0d9488", border: "none", color: "white", padding: "15px 32px", fontSize: "13px", fontWeight: 800, cursor: "pointer"}}>
              Find Talent
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{padding: "72px 16px", background: "#f4f7fb"}}>
        <div style={{textAlign: "center", marginBottom: "38px"}}>
          <h2 style={{fontSize: "30px", fontWeight: 900, color: "#030712"}}>Employer Dashboard Features</h2>
          <p style={{fontSize: "13px", color: "#4b5563", marginTop: "8px"}}>Everything an employer needs to manage hiring smoothly.</p>
        </div>

        <div style={{maxWidth: "1100px", margin: "auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px"}}>
          {[
            { icon: <FaFileAlt size={25}/>, title: "Create Job Posts", desc: "Easily publish job vacancies with title, salary, location, and required skills." },
            { icon: <FaUsers size={25}/>, title: "Manage Applicants", desc: "View candidate profiles, resumes, application status, and shortlist applicants." },
            { icon: <FaChartLine size={25}/>, title: "Track Applications", desc: "Monitor how many candidates applied and analyze hiring performance." },
            { icon: <FaBuilding size={25}/>, title: "Company Profile", desc: "Show your company information, logo, description, and job openings." },
          ].map((f) => (
            <div key={f.title} style={{background: "white", padding: "28px 24px", textAlign: "center", borderRadius: "4px", boxShadow: "0 10px 28px rgba(0,0,0,0.06)"}}>
              <div style={{width: "58px", height: "58px", background: "#f0fdfa", color: "#0d9488", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px"}}>
                {f.icon}
              </div>
              <h3 style={{fontSize: "16px", marginBottom: "12px", color: "#111827"}}>{f.title}</h3>
              <p style={{fontSize: "12px", color: "#4b5563", lineHeight: 1.8}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{position: "relative", minHeight: "155px", backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80')", backgroundSize: "cover", display: "flex", alignItems: "center"}}>
        <div style={{position: "absolute", inset: 0, background: "rgba(13,148,136,0.9)"}}></div>
        <div style={{position: "relative", zIndex: 2, width: "100%", maxWidth: "1150px", margin: "auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", textAlign: "center", color: "white"}}>
          {[
            { value: "1,250+", label: "Jobs Posted" },
            { value: "850+", label: "Companies" },
            { value: "12k+", label: "Candidates" },
            { value: "95%", label: "Hiring Success" },
          ].map((s) => (
            <div key={s.label}>
              <h2 style={{fontSize: "36px", fontWeight: 900, marginBottom: "4px"}}>{s.value}</h2>
              <p style={{fontSize: "13px", fontWeight: 800}}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{position: "relative", minHeight: "270px", backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')", backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div style={{position: "absolute", inset: 0, background: "rgba(5,15,25,0.78)"}}></div>
        <div style={{position: "relative", zIndex: 2, textAlign: "center", color: "white"}}>
          <h2 style={{fontSize: "31px", fontWeight: 900, marginBottom: "12px"}}>Ready To Hire The Best Talent?</h2>
          <p style={{fontSize: "14px", fontWeight: 600, marginBottom: "24px"}}>Start posting jobs today and connect with qualified candidates.</p>
          <button style={{background: "#0d9488", border: "none", color: "white", padding: "14px 34px", fontSize: "13px", fontWeight: 800, cursor: "pointer"}}>
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background: "#0d0d1a", color: "white", textAlign: "center", padding: "18px 10px", fontSize: "12px", fontWeight: 600}}>
        <p>© 2026 JobPortal. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default EmployerHome;