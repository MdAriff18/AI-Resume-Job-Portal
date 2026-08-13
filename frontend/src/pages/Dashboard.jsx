import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import API from "../api/axios";
import "../styles/Dashboard.css";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access");

      const response = await API.get("resume/list/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userResumes = response.data || [];

      setResumes(userResumes);

      // Analyze latest uploaded resume
      if (userResumes.length > 0) {
        const latestResume = [...userResumes].sort(
          (a, b) =>
            new Date(b.uploaded_at) - new Date(a.uploaded_at)
        )[0];

        const analysisResponse = await API.post(
          "resume/analyze/",
          {
            resume_id: latestResume.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAnalysis(analysisResponse.data);
      } else {
        setAnalysis(null);
      }
    } catch (error) {
      console.error("Dashboard data loading failed:", error);
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  const atsScore = analysis?.ats_score || 0;
  const skillsFound = analysis?.skills_found || [];
  const missingSkills = analysis?.missing_skills || [];

  const getScoreText = () => {
    if (atsScore >= 80) return "Excellent";
    if (atsScore >= 60) return "Good";
    if (atsScore >= 40) return "Needs Improvement";
    return "Needs Work";
  };

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-label">
            OVERVIEW
          </span>

          <h2>
            AI Resume Dashboard
          </h2>

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

            <span>
              Total Resumes
            </span>

            <strong>
              {loading ? "..." : resumes.length}
            </strong>

            <small>
              Uploaded resumes
            </small>

          </div>

        </div>


        {/* ATS Score */}
        <div className="card ats-card">

          <div className="card-heading">

            <div>
              <span>
                ATS SCORE
              </span>

              <h3>
                Resume Strength
              </h3>
            </div>

            <div className="mini-icon">
              ✦
            </div>

          </div>


          {loading ? (

            <div className="score-info">

              <strong>
                Analyzing...
              </strong>

              <p>
                Analyzing your latest resume.
              </p>

            </div>

          ) : analysis ? (

            <div className="progress-wrapper">

              <div className="progress-circle">

                <CircularProgressbar
                  value={atsScore}
                  text={`${atsScore}%`}
                />

              </div>

              <div className="score-info">

                <strong>
                  {getScoreText()}
                </strong>

                <p>
                  Your latest resume has been analyzed by the AI system.
                </p>

              </div>

            </div>

          ) : (

            <div className="score-info">

              <strong>
                No Resume
              </strong>

              <p>
                Upload a resume to calculate your ATS score.
              </p>

            </div>

          )}

        </div>


        {/* Skills Found */}
        <div className="card skills-card">

          <div className="card-heading">

            <div>
              <span>
                SKILLS
              </span>

              <h3>
                Skills Found
              </h3>
            </div>

            <div className="mini-icon">
              ✓
            </div>

          </div>


          <div className="badges">

            {loading ? (

              <span className="skill-badge">
                Loading...
              </span>

            ) : skillsFound.length > 0 ? (

              skillsFound.map((skill, index) => (

                <span
                  className="skill-badge"
                  key={index}
                >
                  {skill}
                </span>

              ))

            ) : (

              <span className="skill-badge">
                No skills found
              </span>

            )}

          </div>

        </div>


        {/* Missing Skills */}
        <div className="card missing-card">

          <div className="card-heading">

            <div>
              <span>
                IMPROVEMENT
              </span>

              <h3>
                Missing Skills
              </h3>
            </div>

            <div className="mini-icon warning-icon">
              !
            </div>

          </div>


          <div className="badges">

            {loading ? (

              <span className="missing-badge">
                Loading...
              </span>

            ) : missingSkills.length > 0 ? (

              missingSkills.map((skill, index) => (

                <span
                  className="missing-badge"
                  key={index}
                >
                  {skill}
                </span>

              ))

            ) : (

              <span className="missing-badge">
                No missing skills
              </span>

            )}

          </div>

        </div>


        {/* Jobs Matched */}
        <div className="card stat-card">

          <div className="card-icon job-icon">
            💼
          </div>

          <div className="stat-content">

            <span>
              Jobs Matched
            </span>

            <strong>
              —
            </strong>

            <small>
              Analyze jobs using Resume Job Match
            </small>

          </div>

        </div>

      </div>


      {/* Bottom Section */}
      <div className="dashboard-bottom">

        <div className="insight-card">

          <div className="insight-icon">
            ✦
          </div>

          <div>

            <span>
              AI INSIGHT
            </span>


            {loading ? (

              <>
                <h3>
                  Analyzing your resume...
                </h3>

                <p>
                  Your latest resume is being analyzed by the AI system.
                </p>
              </>

            ) : analysis ? (

              <>
                <h3>
                  Your resume score is {atsScore}%!
                </h3>

                <p>
                  {missingSkills.length > 0
                    ? `Consider adding skills like ${missingSkills
                        .slice(0, 3)
                        .join(", ")} to improve your job matching results.`
                    : "Your resume currently has no detected missing skills."}
                </p>
              </>

            ) : (

              <>
                <h3>
                  Upload your resume to get started!
                </h3>

                <p>
                  Upload a resume to receive your ATS score,
                  detected skills, and improvement suggestions.
                </p>
              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;