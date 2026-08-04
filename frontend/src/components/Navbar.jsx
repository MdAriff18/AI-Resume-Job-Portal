import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <nav>
      <h2>AI Resume Job Portal</h2>

      <ThemeToggle />
      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;