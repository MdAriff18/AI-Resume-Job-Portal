import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { LogOut, Sparkles } from "lucide-react";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Brand */}
      <div className="navbar-logo">
        <div className="logo-icon">
          <Sparkles size={20} />
        </div>

        <div className="brand-text">
          <h2>AI Resume</h2>
          <span>JOB PORTAL</span>
        </div>
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