import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import API from "../api/axios";
import "../styles/Register.css";

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
    <div className="register-container">

      {/* Background */}
      <div className="register-orb register-orb-one"></div>
      <div className="register-orb register-orb-two"></div>


      <div className="register-layout">

        {/* Left Branding */}
        <div className="register-brand">

          <div className="register-brand-icon">
            <Sparkles size={30} />
          </div>

          <span className="register-label">
            START YOUR CAREER JOURNEY
          </span>

          <h1>
            Create your
            <br />
            <span>career profile.</span>
          </h1>

          <p>
            Join the AI Resume Job Portal and make your
            resume stronger, smarter and more job-ready.
          </p>

          <div className="register-features">

            <div>
              <span>✓</span>
              Build professional resumes
            </div>

            <div>
              <span>✓</span>
              Improve your ATS score
            </div>

            <div>
              <span>✓</span>
              Match with relevant jobs
            </div>

          </div>

        </div>


        {/* Register Card */}
        <div className="register-box">

          <div className="register-header">

            <div className="register-mobile-icon">
              <Sparkles size={22} />
            </div>

            <h2>Create account</h2>

            <p>
              Get started with your AI-powered career assistant.
            </p>

          </div>


          <form onSubmit={handleRegister}>

            {/* Name */}
            <div className="register-input-group">

              <label>Full Name</label>

              <div className="register-input-wrapper">

                <User size={18} />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

              </div>

            </div>


            {/* Email */}
            <div className="register-input-group">

              <label>Email Address</label>

              <div className="register-input-wrapper">

                <Mail size={18} />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

            </div>


            {/* Password */}
            <div className="register-input-group">

              <label>Password</label>

              <div className="register-input-wrapper">

                <Lock size={18} />

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

            </div>


            {/* Register Button */}
            <button
              type="submit"
              className="register-button"
            >
              <span>Create account</span>
              <ArrowRight size={18} />
            </button>

          </form>


          {/* Login Link */}
          <div className="login-link-section">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>

          </div>


          <div className="register-footer">
            Your account is protected with secure JWT authentication
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;