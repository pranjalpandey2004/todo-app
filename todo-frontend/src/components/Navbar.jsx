import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LEFT SIDE - LOGO */}
      <div className="navbar-left" onClick={() => navigate("/")}>
        <span className="logo-icon"><img width="48" height="48" src="https://img.icons8.com/parakeet/48/task-planning.png" alt="task-planning"/></span>
        <span className="logo-text">Todo App</span>
      </div>

      {/* RIGHT SIDE - BUTTONS */}
      <div className="navbar-right">
        {token && (
          <button onClick={() => navigate("/add-task")} className="nav-btn">
            Add Task
          </button>
        )}

        {!token ? (
          <>
            <button onClick={() => navigate("/login")} className="nav-btn">
              Login
            </button>
            <button onClick={() => navigate("/signup")} className="nav-btn outline">
              Signup
            </button>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-btn danger">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
