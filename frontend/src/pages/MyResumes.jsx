import { useEffect, useState } from "react";
import { FileText, ExternalLink, Sparkles, Brain, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import API from "../api/axios";
import "../styles/MyResumes.css";

function MyResumes() {

  const [resumes, setResumes] = useState([]);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);


  useEffect(() => {
    fetchResumes();
  }, []);


  const fetchResumes = async () => {

    try {

      const token = localStorage.getItem("access");

      const response = await API.get(
        "resume/list/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumes(response.data);

    } catch (error) {

      console.log(error);
      setMessage("Failed to load resumes");

    }
  };


  const analyzeResume = async (id) => {

    try {

      const token = localStorage.getItem("access");

      const response = await API.post(
        "resume/analyze/",
        {
          resume_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(response.data);

    } catch (error) {

      console.log(error);
      setMessage("Analysis failed");

    }
  };


  return (

    <div className="resumes-page">

      {/* Page Header */}

      <div className="resumes-header">

        <div>

          <div className="page-title-row">

            <div className="page-icon">
              <FileText size={22} />
            </div>

            <div>
              <span className="page-label">
                RESUME MANAGEMENT
              </span>

              <h1>
                My Resumes
              </h1>
            </div>

          </div>

          <p>
            Manage your resumes and analyze them with AI.
          </p>

        </div>


        <div className="resume-count">

          <span>Total Resumes</span>

          <strong>
            {resumes.length}
          </strong>

        </div>

      </div>


      {/* Resume List */}

      <div className="resume-section">

        {resumes.length === 0 ? (

          <div className="empty-resumes">

            <div className="empty-icon">
              <FileText size={30} />
            </div>

            <h2>
              No resumes yet
            </h2>

            <p>
              Upload your first resume to start analyzing it with AI.
            </p>

          </div>

        ) : (

          <div className="resume-grid">

            {resumes.map((resume) => (

              <div
                className="resume-card"
                key={resume.id}
              >

                <div className="resume-card-top">

                  <div className="resume-file-icon">
                    <FileText size={22} />
                  </div>

                  <span className="resume-status">
                    Uploaded
                  </span>

                </div>


                <h3>
                  {resume.title}
                </h3>


                <p className="uploaded-date">
                  Uploaded:{" "}
                  {new Date(resume.uploaded_at).toLocaleDateString()}
                </p>


                <div className="resume-actions">

                  <a
                    className="view-resume-btn"
                    href={`http://127.0.0.1:8000${resume.resume}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={16} />
                    View Resume
                  </a>


                  <button
                    className="analyze-btn"
                    onClick={() => analyzeResume(resume.id)}
                  >
                    <Sparkles size={16} />
                    Analyze
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* AI Analysis */}

      {analysis && (

        <div className="analysis-section">

          <div className="analysis-header">

            <div className="analysis-icon">
              <Brain size={23} />
            </div>

            <div>

              <span>
                AI POWERED
              </span>

              <h2>
                Resume Analysis
              </h2>

            </div>

          </div>


          <div className="analysis-summary">

            <div className="analysis-info">

              <span>Resume</span>

              <strong>
                {analysis.title}
              </strong>

            </div>


            <div className="analysis-info">

              <span>Word Count</span>

              <strong>
                {analysis.word_count}
              </strong>

            </div>


            <div className="ats-score-box">

              <span>
                ATS Score
              </span>

              <strong>
                {analysis.ats_score}
                <small>/100</small>
              </strong>

            </div>

          </div>


          <div className="analysis-columns">

            {/* Skills Found */}

            <div className="analysis-card found-card">

              <div className="analysis-card-title">

                <CheckCircle2 size={19} />

                <h3>
                  Skills Found
                </h3>

              </div>


              <div className="analysis-badges">

                {analysis.skills_found.map(
                  (skill, index) => (

                    <span key={index}>
                      {skill}
                    </span>

                  )
                )}

              </div>

            </div>


            {/* Missing Skills */}

            <div className="analysis-card missing-analysis-card">

              <div className="analysis-card-title">

                <AlertCircle size={19} />

                <h3>
                  Missing Skills
                </h3>

              </div>


              <div className="analysis-badges">

                {analysis.missing_skills.map(
                  (skill, index) => (

                    <span key={index}>
                      {skill}
                    </span>

                  )
                )}

              </div>

            </div>

          </div>


          {/* Suggestions */}

          <div className="suggestions-card">

            <div className="analysis-card-title">

              <Lightbulb size={19} />

              <h3>
                AI Suggestions
              </h3>

            </div>


            <div className="suggestions-list">

              {analysis.suggestions.map(
                (item, index) => (

                  <div
                    className="suggestion-item"
                    key={index}
                  >

                    <span>
                      {index + 1}
                    </span>

                    <p>
                      {item}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}


      {message && (

        <div className="resume-message">
          {message}
        </div>

      )}

    </div>
  );
}

export default MyResumes;