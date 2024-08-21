import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  // Predefined email and password
  const predefinedEmail = process.env.REACT_APP_EMAIL;
  const predefinedPassword = process.env.REACT_APP_PASSWORD;

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if the entered email and password match the predefined ones
    if (email === predefinedEmail && password === predefinedPassword) {
      // Store email in local storage
      localStorage.setItem("userEmail", email);
      // Redirect or perform other actions after login
      alert("Login successful!");
      nav("/")
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" , textAlign:"left" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem",textAlign:"left"}}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ width: "100%", padding: "0.5rem", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
