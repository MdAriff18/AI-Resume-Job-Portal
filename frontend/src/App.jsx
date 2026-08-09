import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ResumeUpload from "./pages/ResumeUpload";
import MyResumes from "./pages/MyResumes";
import JobMatch from "./pages/JobMatch";
import ResumeBuilder from "./pages/ResumeBuilder";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";


function AppContent() {

  const location = useLocation();

  // Navbar should NOT appear on Login/Register pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";


  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />


        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />


        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* Resume Upload */}
        <Route
          path="/resume/upload"
          element={
            <ProtectedRoute>
              <ResumeUpload />
            </ProtectedRoute>
          }
        />


        {/* My Resumes */}
        <Route
          path="/my-resumes"
          element={
            <ProtectedRoute>
              <MyResumes />
            </ProtectedRoute>
          }
        />


        {/* Job Match */}
        <Route
          path="/job-match"
          element={
            <ProtectedRoute>
              <JobMatch />
            </ProtectedRoute>
          }
        />


        {/* Resume Builder */}
        <Route
          path="/resume-builder"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}


function App() {

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


export default App;