import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import "../styles/ThemeToggle.css";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      className={`theme-toggle ${darkMode ? "dark" : "light"}`}
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle dark mode"
    >
      <span className="theme-icon">
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </span>

      <span className="theme-text">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}

export default ThemeToggle;