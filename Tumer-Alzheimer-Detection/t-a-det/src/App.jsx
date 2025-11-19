// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UploadMRI from "./pages/UploadMRI";

/**
 * App root - central router and top-level layout
 * Uses Tailwind utility classes for spacing
 */
function App() {
  return (
    <AuthProvider>
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content */}
      <main className="flex-1 container-max pt-6 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patient-dashboard" element={<ProtectedRoute allow={['Patient']}><PatientDashboard /></ProtectedRoute>} />
          <Route path="/doctor-dashboard" element={<ProtectedRoute allow={['Doctor']}><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedRoute allow={['Admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/upload-mri" element={<ProtectedRoute allow={['Patient', 'Doctor', 'Admin']}><UploadMRI /></ProtectedRoute>} />
          {/* you can add more routes (About, Results, etc.) here */}
        </Routes>
      </main>

      <Footer />
    </div>
    </AuthProvider>
  );
}

export default App;
