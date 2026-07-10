import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EmployerHome from "./pages/EmployerHome";
import EmployerLogin from "./pages/EmployerLogin";
import EmployerDashboard from "./pages/EmployerDashboard";
function App() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const role = user ? JSON.parse(user).role : null;




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<EmployerDashboard />} />
        <Route path="/" element={
          token && role === "employer" 
            ? <EmployerHome /> 
            : <Navigate to="/login" />
        } />
        <Route path="/login" element={<EmployerLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;