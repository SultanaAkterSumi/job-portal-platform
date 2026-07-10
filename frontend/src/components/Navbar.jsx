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

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Find Jobs", path: "/jobs" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Post a Job", path: "/post-job" }

  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JP</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Job<span className="text-teal-500">Portal</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
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

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/my-applications" className="text-sm font-medium text-gray-600 hover:text-teal-600">
                  My Applications
                </Link>
                <button onClick={handleLogout} className="text-sm text-red-500">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-teal-600 px-4 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="text-sm font-semibold bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            {navLinks.map((link) => (
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