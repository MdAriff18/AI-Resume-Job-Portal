import { useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { LogOut, Sparkles } from "lucide-react";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Resumes", path: "/my-resumes" },
    { label: "Upload Resume", path: "/resume/upload" },
    { label: "Job Match", path: "/job-match" },
    { label: "Resume Builder", path: "/resume-builder" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="navbar">

      {/* Brand */}
      <div
        className="navbar-logo"
        onClick={() => navigate("/dashboard")}
      >
        <div className="logo-icon">
          <Sparkles size={20} />
        </div>

        <div className="brand-text">
          <h2>AI Resume</h2>
          <span>JOB PORTAL</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="navbar-links">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-link ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right Actions */}
      <div className="navbar-actions">

        <div className="theme-wrapper">
          <ThemeToggle />
        </div>

        <div className="navbar-divider"></div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;