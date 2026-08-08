import "../styles/Dashboard.css";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Dashboard() {
  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-label">OVERVIEW</span>

          <h2>AI Resume Dashboard</h2>

          <p>
            Welcome back! Here’s a quick overview of your resume performance.
          </p>
        </div>

        <div className="dashboard-status">
          <span className="status-dot"></span>
          System Active
        </div>
      </div>


      {/* Stats Cards */}
      <div className="dashboard-cards">

        {/* Total Resumes */}
        <div className="card stat-card">
          <div className="card-icon resume-icon">
            📄
          </div>

          <div className="stat-content">
            <span>Total Resumes</span>
            <strong>3</strong>
            <small>Uploaded resumes</small>
          </div>
        </div>


        {/* ATS Score */}
        <div className="card ats-card">
          <div className="card-heading">
            <div>
              <span>ATS SCORE</span>
              <h3>Resume Strength</h3>
            </div>

            <div className="mini-icon">✦</div>
          </div>

          <div className="progress-wrapper">
            <div className="progress-circle">
              <CircularProgressbar
                value={85}
                text={`${85}%`}
              />
            </div>

            <div className="score-info">
              <strong>Excellent</strong>
              <p>Your resume is highly optimized for ATS systems.</p>
            </div>
          </div>
        </div>


        {/* Skills Found */}
        <div className="card skills-card">
          <div className="card-heading">
            <div>
              <span>SKILLS</span>
              <h3>Skills Found</h3>
            </div>

            <div className="mini-icon">✓</div>
          </div>

          <div className="badges">
            <span className="skill-badge">Python</span>
            <span className="skill-badge">React</span>
            <span className="skill-badge">Django</span>
            <span className="skill-badge">SQL</span>
          </div>
        </div>


        {/* Missing Skills */}
        <div className="card missing-card">
          <div className="card-heading">
            <div>
              <span>IMPROVEMENT</span>
              <h3>Missing Skills</h3>
            </div>

            <div className="mini-icon warning-icon">!</div>
          </div>

          <div className="badges">
            <span className="missing-badge">Docker</span>
            <span className="missing-badge">AWS</span>
            <span className="missing-badge">Kubernetes</span>
            <span className="missing-badge">GitHub Actions</span>
          </div>
        </div>


        {/* Jobs Matched */}
        <div className="card stat-card">
          <div className="card-icon job-icon">
            💼
          </div>

          <div className="stat-content">
            <span>Jobs Matched</span>
            <strong>5</strong>
            <small>Potential opportunities</small>
          </div>
        </div>

      </div>


      {/* Bottom Section */}
      <div className="dashboard-bottom">

        <div className="insight-card">
          <div className="insight-icon">✦</div>

          <div>
            <span>AI INSIGHT</span>

            <h3>Your resume is performing well!</h3>

            <p>
              Your ATS score is strong. Adding skills like Docker and AWS
              could further improve your job matching results.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;