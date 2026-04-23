import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError("");

      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered Successfully ✅");
      navigate("/");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <div style={{
        background: "#2c2c3e",
        padding: "30px",
        borderRadius: "12px",
        textAlign: "center",
        width: "300px",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)"
      }}>
        <h2>Register</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />

        <button onClick={handleRegister}>Register</button>

        <p style={{ marginTop: "10px" }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}