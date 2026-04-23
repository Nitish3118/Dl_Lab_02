import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          background: "#2c2c3e",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          width: "300px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={handleLogin}>Login</button>

        <p style={{ marginTop: "15px" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#ff4b2b" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}