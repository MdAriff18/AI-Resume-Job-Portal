import { useState } from "react";

function ThemeToggle() {

  const [darkMode, setDarkMode] = useState(false);


  const toggleTheme = () => {

    setDarkMode(!darkMode);

    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } 
    else {
      document.body.classList.remove("dark-mode");
    }

  };


  return (
    <button
      className="theme-btn"
      onClick={toggleTheme}
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );

}

export default ThemeToggle;