import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // default role
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please provide email and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      alert("Email already registered. Please login.");
      navigate("/login");
      return;
    }

    users.push({ email, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully. Please login.");
    navigate("/login");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          />
        </div>

        {/* Dropdown for role selection */}
        <div style={{ marginBottom: 12 }}>
          <label>Register as</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 6 }}
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="government">Government Official</option>
          </select>
        </div>

        <button type="submit" style={{ padding: "8px 16px" }}>
          Sign up
        </button>
      </form>
    </div>
  );
}
