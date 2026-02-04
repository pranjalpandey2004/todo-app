import React, { useEffect, useState } from "react";
import "./Dashboard.css";



const Dashboard = () => {
  // 🔹 State to store tasks
  const [tasks, setTasks] = useState([]);

  // 🔹 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };


const markCompleted = async (taskId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/tasks/${taskId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "completed" }),
      }
    );

    if (!res.ok) {
      alert("Failed to update status");
      return;
    }

    // refresh dashboard
    window.location.reload();
  } catch (error) {
    console.error("Error updating status", error);
  }
};


  // 🔹 Fetch tasks when dashboard loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Failed to fetch tasks");
          return;
        }

        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // 🔹 Split tasks by priority
  const highTasks = tasks.filter((task) => task.priority === "high");
  const mediumTasks = tasks.filter((task) => task.priority === "medium");
  const lowTasks = tasks.filter((task) => task.priority === "low");

const deleteTask = async (taskId) => {
  if (!window.confirm("Are you sure you want to delete this task?")) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      alert("Failed to delete task");
      return;
    }

    // remove from UI without reload
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  } catch (error) {
    console.error("Delete error", error);
  }
};


  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
   
       <div className="columns">
        {/* High Priority */}
        <div className="column high">
          <h3>High Priority</h3>
          {highTasks.map((task) => (
  <div
    key={task._id}
    className={`task ${task.status === "completed" ? "completed" : ""}`}
  >
    <strong>{task.title}</strong>
    <p>{task.description}</p>

    <p className="status">
      Status: <b>{task.status || "pending"}</b>
    </p>

    {task.status !== "completed" && (
      <button onClick={() => markCompleted(task._id)}>
        Mark Completed
      </button>
    )}
    <button
  className="delete-btn"
  onClick={() => deleteTask(task._id)}
>
  Delete
</button>
  </div>
))}

        </div>

        {/* Medium Priority */}
        <div className="column medium">
          <h3>Medium Priority</h3>
       {mediumTasks.map((task) => (
  <div
    key={task._id}
    className={`task ${task.status === "completed" ? "completed" : ""}`}
  >
    <strong>{task.title}</strong>
    <p>{task.description}</p>

    <p className="status">
      Status: <b>{task.status || "pending"}</b>
    </p>

    {task.status !== "completed" && (
      <button onClick={() => markCompleted(task._id)}>
        Mark Completed
      </button>
    )}
    <button
  className="delete-btn"
  onClick={() => deleteTask(task._id)}
>
  Delete
</button>
  </div>
))}


        </div>

        {/* Low Priority */}
        <div className="column low">
          <h3>Low Priority</h3>
          {lowTasks.map((task) => (
            <div
  key={task._id}
  className={`task ${task.status === "completed" ? "completed" : ""}`}
>
  <strong>{task.title}</strong>
  <p>{task.description}</p>

  <p className="status">
    Status: <b>{task.status}</b>
  </p>

  {task.status !== "completed" && (
    <button onClick={() => markCompleted(task._id)}>
      Mark Completed
    </button>
    
  )}
  <button
  className="delete-btn"
  onClick={() => deleteTask(task._id)}
>
  Delete
</button>
</div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
