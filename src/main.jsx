import React from "react";
import ReactDOM from "react-dom/client";
import { FaBriefcase, FaArrowRight, FaChevronDown } from "react-icons/fa";
import "./style.css";


function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
  <div className="logo-box">JP</div>
  <span className="logo-text">Job<span>Portal</span></span>
</div>

        <ul className="navLinks">
          <li className="active">HOME</li>
          <li>ABOUT</li>
          <li className="jobsMenu">
            JOBS <FaChevronDown />
          </li>
          <li>EMPLOYERS</li>
          <li>CONTACT</li>
          <li>My Jobs</li>
        </ul>

        <button className="topPostBtn">
          Post A Job <FaArrowRight />
        </button>
      </nav>

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
            <button className="btn postBtn">Post A Job</button>
            <button className="btn findBtn">Find Talent</button>
          </div>
        </div>

        <div className="sliderArrows">
          <button>‹</button>
          <button>›</button>
        </div>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);