import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JP</span>
              </div>
              <span className="text-lg font-bold text-white">
                Job<span className="text-teal-400">Portal</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Connecting talent with opportunity across Bangladesh.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              For Job Seekers
            </h3>
            <ul className="space-y-2.5">
              {["Browse Jobs", "Job Categories", "My Applications"].map((item) => (
                <li key={item}>
                  <Link to="/jobs" className="text-sm hover:text-teal-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li>📍 Agrabad C/A, Chittagong, Bangladesh</li>
              <li>✉️ hello@jobportal.com.bd</li>
              <li>📞 +880 31 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 JobPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;