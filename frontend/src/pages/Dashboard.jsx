import "../styles/Dashboard.css";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Dashboard() {
  return (
    <div className="dashboard-container">

      <div className="hero-section">

        <div>
          <h1>👋 Welcome Back</h1>

          <p>
            Analyze your resume, improve your ATS score and
            discover your dream job with AI.
          </p>
        </div>

      </div>

      <div className="dashboard-cards">

        <div className="card">

          <h3>📄 Total Resumes</h3>

          <p>3</p>

        </div>


        <div className="card ats-card">

          <h3>🎯 ATS Score</h3>

          <div className="progress-circle">

            <CircularProgressbar
              value={85}
              text="85%"
            />

          </div>

        </div>


        <div className="card skills-card">

          <h3>🧠 Skills Found</h3>

          <div className="badges">

            <span className="skill-badge">Python</span>

            <span className="skill-badge">React</span>

            <span className="skill-badge">Django</span>

            <span className="skill-badge">SQL</span>

          </div>

        </div>


        <div className="card missing-card">

          <h3>⚠ Missing Skills</h3>

          <div className="badges">

            <span className="missing-badge">Docker</span>

            <span className="missing-badge">AWS</span>

            <span className="missing-badge">Kubernetes</span>

            <span className="missing-badge">GitHub Actions</span>

          </div>

        </div>


        <div className="card">

          <h3>💼 Jobs Matched</h3>

          <p>5</p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;