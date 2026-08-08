import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
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

      {/* Background Decoration */}
      <div className="background-orb orb-one"></div>
      <div className="background-orb orb-two"></div>


      <div className="login-layout">

        {/* Left Branding */}
        <div className="login-brand">

          <div className="brand-icon">
            <Sparkles size={30} />
          </div>

          <span className="brand-label">
            AI POWERED CAREER PLATFORM
          </span>

          <h1>
            Build a resume
            <br />
            that gets <span>noticed.</span>
          </h1>

          <p>
            Analyze your resume, improve your ATS score,
            discover missing skills and find better job matches.
          </p>

          <div className="brand-features">
            <div>
              <span>✓</span>
              AI Resume Analysis
            </div>

            <div>
              <span>✓</span>
              ATS Score Optimization
            </div>

            <div>
              <span>✓</span>
              Smart Job Matching
            </div>
          </div>

        </div>


        {/* Login Card */}
        <div className="login-box">

          <div className="login-card-header">

            <div className="mobile-brand-icon">
              <Sparkles size={22} />
            </div>

            <h2>Welcome back</h2>

            <p>
              Sign in to continue to your dashboard.
            </p>

          </div>


          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

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
            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">

                <Lock size={18} />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="login-button"
            >
              <span>Sign in</span>
              <ArrowRight size={18} />
            </button>

          </form>


          {/* Register */}
          <div className="register-section">

            <span>
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={() => navigate("/register")}
            >
              Create account
            </button>

          </div>


          <div className="login-footer">
            Secure authentication powered by JWT
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;