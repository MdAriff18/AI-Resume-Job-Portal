import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("login/", {
        email: email,
        password: password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      console.log("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">
          AI Resume Job Portal
        </h1>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

          <p
            style={{ marginTop: "15px", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Don't have an account? <strong>Register</strong>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;