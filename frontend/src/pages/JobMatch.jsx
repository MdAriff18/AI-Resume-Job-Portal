import { useEffect, useState } from "react";
import {
  Target,
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

import API from "../api/axios";
import "../styles/JobMatch.css";

function JobMatch() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchResumes();
  }, []);

  // =========================
  // Fetch Resumes
  // =========================

  const fetchResumes = async () => {
    try {
      setErrorMessage("");

      const token = localStorage.getItem("access");

      const response = await API.get(
        "resume/list/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resumeData = response.data || [];

      setResumes(resumeData);

      if (resumeData.length > 0) {
        setResumeId(resumeData[0].id);
      }
    } catch (error) {
      console.error(
        "FETCH RESUMES ERROR:",
        error
      );

      setErrorMessage(
        "Failed to load resumes."
      );
    }
  };


  // =========================
  // Analyze Job Match
  // =========================

  const handleMatch = async () => {

    if (
      !resumeId ||
      !jobDescription.trim()
    ) {
      return;
    }

    try {

      setLoading(true);
      setResult(null);
      setErrorMessage("");

      const token =
        localStorage.getItem("access");

      const response = await API.post(
        "resume/job-match/",
        {
          resume_id: resumeId,
          job_description:
            jobDescription.trim(),
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setResult(response.data);

    } catch (error) {

      console.error(
        "JOB MATCH ERROR:",
        error
      );

      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );

      const serverError =
        error.response?.data?.details ||
        error.response?.data?.error;

      setErrorMessage(
        serverError ||
          "Job matching failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="jobmatch-page">

      <div className="jobmatch-container">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="jobmatch-header">

          <div className="jobmatch-icon">
            <Target size={27} />
          </div>

          <div>

            <span className="jobmatch-label">
              AI CAREER INTELLIGENCE
            </span>

            <h1>
              Resume Job Match
            </h1>

            <p>
              Compare your resume with a job
              description and discover your
              compatibility.
            </p>

          </div>

        </div>


        {/* =========================
            MAIN MATCHING CARD
        ========================= */}

        <div className="match-card">

          {/* Resume Selection */}

          <div className="match-section">

            <div className="section-heading">

              <div className="section-icon">
                <FileText size={18} />
              </div>

              <div>

                <h3>
                  Select Resume
                </h3>

                <p>
                  Choose the resume you want
                  to analyze.
                </p>

              </div>

            </div>


            <select
              value={resumeId}
              onChange={(e) => {
                setResumeId(e.target.value);
                setResult(null);
                setErrorMessage("");
              }}
              className="resume-select"
              disabled={loading}
            >

              {resumes.length === 0 ? (

                <option value="">
                  No resumes available
                </option>

              ) : (

                resumes.map((resume) => (

                  <option
                    key={resume.id}
                    value={resume.id}
                  >
                    {resume.title}
                  </option>

                ))

              )}

            </select>

          </div>


          {/* Job Description */}

          <div className="match-section">

            <div className="section-heading">

              <div className="section-icon">
                <Sparkles size={18} />
              </div>

              <div>

                <h3>
                  Job Description
                </h3>

                <p>
                  Paste the job description
                  you want to match.
                </p>

              </div>

            </div>


            <textarea
              className="job-description"
              rows="10"
              placeholder="Paste Job Description Here..."
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(
                  e.target.value
                );
                setErrorMessage("");
              }}
              disabled={loading}
            />


            <div className="character-count">
              {jobDescription.length} characters
            </div>

          </div>


          {/* Error */}

          {errorMessage && (

            <div
              className="resume-message"
              style={{
                marginBottom: "15px",
              }}
            >
              {errorMessage}
            </div>

          )}


          {/* Match Button */}

          <button
            className="match-button"
            onClick={handleMatch}
            disabled={
              loading ||
              !resumeId ||
              !jobDescription.trim()
            }
          >

            {loading ? (

              <>
                <span className="analyze-spinner"></span>

                Analyzing...

              </>

            ) : (

              <>
                <Sparkles size={18} />

                Analyze Job Match

                <ArrowRight size={18} />
              </>

            )}

          </button>

        </div>


        {/* =========================
            RESULTS
        ========================= */}

        {result && (

          <div className="results-section">

            {/* Results Header */}

            <div className="results-heading">

              <div className="results-heading-content">

                <span className="results-label">
                  AI ANALYSIS
                </span>

                <h2 className="results-title">
                  Match Results
                </h2>

              </div>

              <Sparkles
                size={24}
                className="results-heading-icon"
              />

            </div>


            {/* =========================
                SCORE
            ========================= */}

            <div className="score-card">

              <div className="score-circle">

                <div className="score-circle-inner">

                  <strong>
                    {result.match_score}%
                  </strong>

                  <span>
                    Match
                  </span>

                </div>

              </div>


              <div className="score-info">

                <h3>
                  Resume Compatibility
                </h3>

                <p>
                  Your resume matches this job
                  based on skills and requirements.
                </p>

              </div>

            </div>


            {/* =========================
                SKILLS GRID
            ========================= */}

            <div className="result-grid">

              {/* Matched Skills */}

              <div className="result-card matched-card">

                <div className="result-card-header">

                  <div className="result-title-icon matched-icon">
                    <CheckCircle2 size={19} />
                  </div>

                  <div className="result-header-text">

                    <h3>
                      Matched Skills
                    </h3>

                    <span>
                      Skills you already have
                    </span>

                  </div>

                </div>


                <div className="skill-list">

                  {result.matched_skills?.length > 0 ? (

                    result.matched_skills.map(
                      (skill, index) => (

                        <span
                          className="matched-skill"
                          key={index}
                        >
                          {skill}
                        </span>

                      )
                    )

                  ) : (

                    <p className="empty-result">
                      No matching skills found.
                    </p>

                  )}

                </div>

              </div>


              {/* Missing Skills */}

              <div className="result-card missing-card">

                <div className="result-card-header">

                  <div className="result-title-icon missing-icon">
                    <XCircle size={19} />
                  </div>

                  <div className="result-header-text">

                    <h3>
                      Missing Skills
                    </h3>

                    <span>
                      Skills you should improve
                    </span>

                  </div>

                </div>


                <div className="skill-list">

                  {result.missing_skills?.length > 0 ? (

                    result.missing_skills.map(
                      (skill, index) => (

                        <span
                          className="missing-skill"
                          key={index}
                        >
                          {skill}
                        </span>

                      )
                    )

                  ) : (

                    <p className="empty-result">
                      No missing skills found.
                    </p>

                  )}

                </div>

              </div>

            </div>


            {/* =========================
                AI SUGGESTIONS
            ========================= */}

            <div className="suggestions-card">

              <div className="result-card-header">

                <div className="result-title-icon suggestion-icon">
                  <Lightbulb size={19} />
                </div>

                <div className="result-header-text">

                  <h3>
                    AI Suggestions
                  </h3>

                  <span>
                    Recommendations to improve
                    your match
                  </span>

                </div>

              </div>


              <div className="suggestions-list">

                {result.suggestions?.length > 0 ? (

                  result.suggestions.map(
                    (item, index) => (

                      <div
                        className="suggestion-item"
                        key={index}
                      >

                        <span className="suggestion-number">
                          {index + 1}
                        </span>

                        <p>
                          {item}
                        </p>

                      </div>

                    )
                  )

                ) : (

                  <p className="empty-result">
                    No suggestions available.
                  </p>

                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default JobMatch;