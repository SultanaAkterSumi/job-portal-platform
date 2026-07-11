import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerLogin from "./pages/EmployerLogin";
import Homepage from "./pages/Homepage";
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostJob from "./pages/PostJob";
import EmployerHome from "./pages/EmployerHome";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Employer Dashboard - without Navbar/Footer */}
        <Route path="/employer" element={<EmployerHome />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
      

        {/* All other routes - with Navbar/Footer */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <main className="pt-16">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Homepage />} />
                  <Route path="/jobs" element={<JobListings />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                   <Route path="/employer-login" element={<EmployerLogin />} />
                  {/* Protected Routes */}
                  
                  <Route path="/post-job" element={<PostJob />} />
                  
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;