import { useEffect, useState } from "react";
import {
  FileText,
  ExternalLink,
  Sparkles,
  Brain,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

import API from "../api/axios";
import "../styles/MyResumes.css";

function MyResumes() {

  const [resumes, setResumes] = useState([]);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);

  // Loading state for individual resume analysis
  const [analyzingId, setAnalyzingId] = useState(null);


  useEffect(() => {
    fetchResumes();
  }, []);


  // =========================
  // Fetch Resumes
  // =========================

  const fetchResumes = async () => {

    try {

      setMessage("");

      const token = localStorage.getItem("access");

      const response = await API.get(
        "resume/list/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumes(response.data || []);

    } catch (error) {

      console.log(error);

      setMessage("Failed to load resumes");

    }
  };


  // =========================
  // Analyze Resume
  // =========================

  const analyzeResume = async (id) => {

    // Prevent multiple clicks
    if (analyzingId !== null) {
      return;
    }

    try {

      setMessage("");

      setAnalysis(null);

      setAnalyzingId(id);

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

      setMessage("Analysis failed. Please try again.");

    } finally {

      setAnalyzingId(null);

    }
  };


  return (

    <div className="resumes-page">

      {/* =========================
          Page Header
      ========================= */}

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


        {/* Resume Count */}

        <div className="resume-count">

          <span>
            Total Resumes
          </span>

          <strong>
            {resumes.length}
          </strong>

        </div>

      </div>


      {/* =========================
          Resume List
      ========================= */}

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

            {resumes.map((resume) => {

              const isAnalyzing = analyzingId === resume.id;

              return (

                <div
                  className="resume-card"
                  key={resume.id}
                >

                  {/* Card Top */}

                  <div className="resume-card-top">

                    <div className="resume-file-icon">
                      <FileText size={22} />
                    </div>

                    <span className="resume-status">
                      Uploaded
                    </span>

                  </div>


                  {/* Resume Title */}

                  <h3>
                    {resume.title}
                  </h3>


                  {/* Upload Date */}

                  <p className="uploaded-date">

                    Uploaded:{" "}

                    {new Date(
                      resume.uploaded_at
                    ).toLocaleDateString()}

                  </p>


                  {/* Actions */}

                  <div className="resume-actions">

                    {/* View Resume */}

                    <a
                      className="view-resume-btn"
                      href={`https://ai-resume-job-portal-backend.onrender.com${resume.resume}`}
                      target="_blank"
                      rel="noreferrer"
                    >

                      <ExternalLink size={16} />

                      View Resume

                    </a>


                    {/* Analyze */}

                    <button
                      className="analyze-btn"
                      onClick={() =>
                        analyzeResume(resume.id)
                      }
                      disabled={analyzingId !== null}
                    >

                      {isAnalyzing ? (

                        <>

                          <span className="analyze-spinner"></span>

                          Analyzing...

                        </>

                      ) : (

                        <>

                          <Sparkles size={16} />

                          Analyze

                        </>

                      )}

                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>


      {/* =========================
          AI Analysis
      ========================= */}

      {analysis && (

        <div className="analysis-section">

          {/* Analysis Header */}

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


          {/* Analysis Summary */}

          <div className="analysis-summary">

            <div className="analysis-info">

              <span>
                Resume
              </span>

              <strong>
                {analysis.title}
              </strong>

            </div>


            <div className="analysis-info">

              <span>
                Word Count
              </span>

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

                <small>
                  /100
                </small>

              </strong>

            </div>

          </div>


          {/* =========================
              Skills Columns
          ========================= */}

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

                {analysis.skills_found &&
                analysis.skills_found.length > 0 ? (

                  analysis.skills_found.map(
                    (skill, index) => (

                      <span key={index}>
                        {skill}
                      </span>

                    )
                  )

                ) : (

                  <span>
                    No skills found
                  </span>

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

                {analysis.missing_skills &&
                analysis.missing_skills.length > 0 ? (

                  analysis.missing_skills.map(
                    (skill, index) => (

                      <span key={index}>
                        {skill}
                      </span>

                    )
                  )

                ) : (

                  <span>
                    No missing skills
                  </span>

                )}

              </div>

            </div>

          </div>


          {/* =========================
              AI Suggestions
          ========================= */}

          <div className="suggestions-card">

            <div className="analysis-card-title">

              <Lightbulb size={19} />

              <h3>
                AI Suggestions
              </h3>

            </div>


            <div className="suggestions-list">

              {analysis.suggestions &&
              analysis.suggestions.length > 0 ? (

                analysis.suggestions.map(
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
                )

              ) : (

                <div className="suggestion-item">

                  <span>
                    ✓
                  </span>

                  <p>
                    Your resume looks good. No additional suggestions at this time.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      )}


      {/* =========================
          Message
      ========================= */}

      {message && (

        <div className="resume-message">
          {message}
        </div>

      )}

    </div>
  );
}

export default MyResumes;