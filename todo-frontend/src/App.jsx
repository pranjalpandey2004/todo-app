import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import AddTaskPage from "./pages/AddTaskPage";

function App() {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />

      <div style={{ marginTop: "70px" }}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/add-task"
            element={
              isAuthenticated ? <AddTaskPage /> : <Navigate to="/login" />
            }
          />

          {/* Default */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
