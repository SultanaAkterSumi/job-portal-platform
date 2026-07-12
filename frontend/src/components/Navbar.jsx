import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useAuth();
  const user = auth?.user;
  const isAuthenticated = auth?.isAuthenticated;
  const logout = auth?.logout;
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Role check
  const isEmployer = user?.role === "employer";
  const isJobSeeker = user?.role === "jobseeker";

  // Links for /login and /register pages
  const authPageLinks = [
    { label: "Home", path: "/" },
    { label: "Employer", path: "/employer" },
  ];

  // Links for logged-out (public) users
  const publicLinks = [
    { label: "Home", path: "/" },
    { label: "Find Jobs", path: "/jobs" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // Links for logged-in Job Seeker
  const jobSeekerLinks = [
    { label: "Home", path: "/" },
    { label: "Find Jobs", path: "/jobs" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // Links for logged-in Employer
  const employerLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "My Jobs", path: "/employer-dashboard" },
  ];

  // Decide which link set to show
  const activeLinks = isAuthPage
    ? authPageLinks
    : isEmployer
    ? employerLinks
    : isJobSeeker
    ? jobSeekerLinks
    : publicLinks;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JP</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Job<span className="text-teal-500">Portal</span>
            </span>
          </Link>

          {/* Center Links */}
          <div
            className={`hidden md:flex items-center gap-6 ${
              isAuthPage ? "absolute left-1/2 -translate-x-1/2" : ""
            }`}
          >
            {activeLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-teal-600"
                    : "text-gray-600 hover:text-teal-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-3">
             {isEmployer ? (
  <>
    {location.pathname !== "/post-job" && (
      <Link
        to="/post-job"
        className="text-sm font-semibold bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg transition-colors"
      >
        Post New Job
      </Link>
    )}
    <button onClick={handleLogout} className="text-sm text-red-500">
      Logout
    </button>
  </>
) : isJobSeeker ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/my-applications"
                    className="text-sm font-medium text-gray-600 hover:text-teal-600"
                  >
                    My Applications
                  </Link>
                  <button onClick={handleLogout} className="text-sm text-red-500">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/employer"
                    className="text-sm font-medium text-gray-600 hover:text-teal-600 px-4 py-2"
                  >
                    Employer
                  </Link>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-600 hover:text-teal-600 px-4 py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-semibold bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          )}

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            {activeLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;