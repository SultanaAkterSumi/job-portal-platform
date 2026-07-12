import React from "react";
import {
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaUserPlus,
} from "react-icons/fa";
import "./EmployerLogin.css";

function EmployerLogin({ setPage }) {
  return (
    <div className="signin-page">
      <div className="signin-overlay"></div>

      <div className="signin-container">
        <div className="signin-left">
          <div className="signin-logo">
            <FaBriefcase />
            <span>JobPortal</span>
          </div>

          <h1>Employer Sign In</h1>
          <p>
            Access your employer dashboard to post jobs, manage applicants, and
            hire the best talent for your company.
          </p>

          <div className="signin-points">
            <p>✓ Create and publish job posts</p>
            <p>✓ Manage candidate applications</p>
            <p>✓ Track hiring progress easily</p>
          </div>
        </div>

        <div className="signin-card">
          <h2>Welcome Back</h2>
          <p className="signin-subtitle">Login to your employer account</p>

          <form>
            <label>Email Address</label>
            <div className="input-box">
              <FaEnvelope />
              <input type="email" placeholder="Enter your email" />
            </div>

            <label>Password</label>
            <div className="input-box">
              <FaLock />
              <input type="password" placeholder="Enter your password" />
            </div>

            <div className="signin-options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>
              <span>Forgot Password?</span>
            </div>

            <button type="button" className="signin-btn">
              Sign In <FaArrowRight />
            </button>

            <button type="button" className="create-btn">
              <FaUserPlus /> Create Employer Account
            </button>
          </form>

          <p className="back-home" onClick={() => setPage("home")}>
            Back to Home
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployerLogin;