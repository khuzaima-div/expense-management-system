import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Pages import
import Login from './Pages/Login';
import Register from "./Pages/Register";
import ForgotPassword from './Pages/ForgotPassword'; // New
import ResetPassword from './Pages/ResetPassword';   // New
import EmployeeDashboard from './Pages/EmployeeDashboard';
import ManagerDashboard from "./Pages/ManagerDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import Navbar from "./components/Navbar";

const AppLayout = ({ children }) => {
  const location = useLocation();
  
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, "") || "/";
  
  const hideNavbarOn = ["/", "/register", "/forgot-password"];
  
  const isResetPath = currentPath.startsWith("/reset-password");
  
  const shouldShowNavbar = !hideNavbarOn.includes(currentPath) && !isResetPath;

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <div className={shouldShowNavbar ? "pt-2" : ""}>
        {children}
      </div>
    </>
  );
};

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />;
  if (role && userRole !== role) return <Navigate to="/" />;
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      
      <AppLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route 
            path="/employee" 
            element={
              <ProtectedRoute role="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/manager" 
            element={
              <ProtectedRoute role="manager">
                <ManagerDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard/>
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;