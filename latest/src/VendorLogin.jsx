import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // If a customer is already logged in, don't allow access to vendor login
  useEffect(() => {
    const cust = localStorage.getItem("auth_token");
    if (cust) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const from = location.state?.from?.pathname || "/vendor/upload";

  const handleSubmit = (e) => {
    e.preventDefault();
    const lower = email.toLowerCase();
    if (!lower.endsWith("@vendor.com") || password.trim().length === 0) {
      setError("Vendor login requires an @vendor.com email and a password.");
      return;
    }

    localStorage.setItem("vendor_token", JSON.stringify({ email }));
    navigate(from, { replace: true });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Vendor Login</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 6 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 6 }} />
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>Login as Vendor</button>
        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      </form>
    </div>
  );
}
