import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext"; // adjust path as needed

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Loading spinner while checking auth
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not logged in? Go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role? Go to home
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">You need {requiredRole} access to view this page.</p>
        <a
          href="/"
          className="bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Go to Home
        </a>
      </div>
    );
  }

  // All good? Render the page
  return children;
}