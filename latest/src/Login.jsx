import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // customer, vendor, government
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetError = () => setError("");

  const handleSubmit = (e) => {
    e.preventDefault();
    resetError();

    if (!email || password.trim().length === 0) {
      setError("Please enter email and password.");
      return;
    }

    const lower = email.toLowerCase();
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // ---------------- SIGNUP ----------------
    if (mode === "signup") {
      if (users.find((u) => u.email.toLowerCase() === lower)) {
        setError("An account with that email already exists. Please log in.");
        return;
      }
      if (password.length < 4) {
        setError("Password must be at least 4 characters.");
        return;
      }

      const newUser = { email, password, role };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Auto-login after signup
      if (role === "vendor") {
        localStorage.setItem("vendor_token", JSON.stringify({ email }));
        navigate("/vendor/upload", { replace: true });
      } else if (role === "government") {
        localStorage.setItem("gov_token", JSON.stringify({ email }));
        navigate("/dashboard", { replace: true });
      } else {
        localStorage.setItem("auth_token", "fake-jwt-token");
        navigate("/home", { replace: true });
      }
      return;
    }

    // ---------------- LOGIN ----------------
    const found = users.find((u) => u.email.toLowerCase() === lower);
    if (found) {
      if (found.password !== password) {
        setError("Incorrect password for registered email.");
        return;
      }

      if (found.role === "vendor") {
        localStorage.setItem("vendor_token", JSON.stringify({ email }));
        navigate("/vendor/upload", { replace: true });
      } else if (found.role === "government") {
        localStorage.setItem("gov_token", JSON.stringify({ email }));
        navigate("/dashboard", { replace: true });
      } else {
        localStorage.setItem("auth_token", "fake-jwt-token");
        navigate("/home", { replace: true });
      }
      return;
    }

    setError("No account found. Please sign up first.");
  };

  return (
    <div className="form-container">
      <h2>{mode === "login" ? "🔐 Login" : "📝 Sign up"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {mode === "signup" && (
          <div style={{ marginTop: 8 }}>
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginLeft: 8, padding: 4 }}
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="government">Government Official</option>
            </select>
          </div>
        )}

        <button type="submit" style={{ marginTop: 12 }}>
          {mode === "login" ? "Login" : "Create account"}
        </button>

        <div style={{ marginTop: 10 }}>
          {mode === "login" ? (
            <>
              <span>Don't have an account? </span>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  resetError();
                }}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  resetError();
                }}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Log in
              </button>
            </>
          )}
        </div>

        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      </form>
    </div>
  );
}
