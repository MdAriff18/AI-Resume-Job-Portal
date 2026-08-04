import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("register/", {
        username: name,
        email: email,
        password: password,
        phone: "",
        role: "candidate",
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      alert("Registration Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log("========== REGISTER ERROR ==========");
      console.log(error);
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);

      alert(
        JSON.stringify(
          error.response?.data || error.message,
          null,
          2
        )
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">AI Resume Job Portal</h1>

        <h2>Register</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;