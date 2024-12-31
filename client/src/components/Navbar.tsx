import React, { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Apply background and text color changes to the entire page (html and body)
    const backgroundColor = isDark ? "#ffffff" : "#0c0c0c";
    const textColor = isDark ? "#0c0c0c" : "#ffffff";

    document.documentElement.style.backgroundColor = backgroundColor;
    document.documentElement.style.color = textColor;
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
  };

  return (
    <nav
      style={{
        ...styles.navbar,
        backgroundColor: isDark ? "#0c0c0c" : "#f4f4f4",
        color: isDark ? "#ffffff" : "#0c0c0c",
      }}
    >
      <h1 >Dashboard</h1>
      <button
        onClick={toggleTheme}
        style={{
          ...styles.button,
          backgroundColor: isDark ? "#fe6e08" : "#0088cc",
          color: "#ffffff",
        }}
      >
        {isDark ? <LuSun style={{ marginRight: "0.5rem" }} /> : <IoMoon style={{ marginRight: "0.5rem" }} />}
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s, color 0.3s",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    display: "flex",
    alignItems: "center",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s, color 0.3s",
  },
  
};

export default Navbar;
