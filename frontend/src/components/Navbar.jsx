import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { LogOut, Sparkles } from "lucide-react";
import "../styles/Navbar.css"


function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };


  return (

    <nav className="navbar">

      <div className="navbar-logo">

        <Sparkles size={18}/>

        <h2>
          AI Resume Job Portal
        </h2>

      </div>


      <div className="navbar-actions">

        <ThemeToggle />


        <button 
          className="logout-btn"
          onClick={handleLogout}
        >

          <LogOut size={18}/>

          Logout

        </button>


      </div>


    </nav>

  );
}


export default Navbar;