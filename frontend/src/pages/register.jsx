import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/register", formData);
login(res.data.user, res.data.token);

if (res.data.user.role === "employer") {
  navigate("/employer");
} else {
  navigate("/");
}
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16" style={{background: "#f8fafc"}}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold" style={{background: "#0d9488"}}>JP</div>
          <h1 className="text-2xl font-bold" style={{color: "#1a1a2e"}}>Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Join thousands of job seekers</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              onFocus={e => e.target.style.borderColor = "#0d9488"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              onFocus={e => e.target.style.borderColor = "#0d9488"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none"
              onFocus={e => e.target.style.borderColor = "#0d9488"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "jobseeker" })}
                className="py-3 rounded-lg border text-sm font-medium transition-all"
                style={{
                  borderColor: formData.role === "jobseeker" ? "#0d9488" : "#e5e7eb",
                  background: formData.role === "jobseeker" ? "#f0fdf4" : "white",
                  color: formData.role === "jobseeker" ? "#0d9488" : "#6b7280",
                }}
              >
                🔍 Job Seeker
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "employer" })}
                className="py-3 rounded-lg border text-sm font-medium transition-all"
                style={{
                  borderColor: formData.role === "employer" ? "#0d9488" : "#e5e7eb",
                  background: formData.role === "employer" ? "#f0fdf4" : "white",
                  color: formData.role === "employer" ? "#0d9488" : "#6b7280",
                }}
              >
                🏢 Employer
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3 rounded-lg text-sm"
            style={{background: loading ? "#94a3b8" : "#0d9488"}}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold" style={{color: "#0d9488"}}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;