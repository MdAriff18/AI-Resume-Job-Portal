import { useEffect, useState } from "react";
import API from "../api/axios";

function JobMatch() {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await API.get("resume/list/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(response.data);

      if (response.data.length > 0) {
        setResumeId(response.data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMatch = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await API.post(
        "resume/job-match/",
        {
          resume_id: resumeId,
          job_description: jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>Resume vs Job Description</h1>

        <select
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
        >
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>
              {resume.title}
            </option>
          ))}
        </select>

        <br /><br />

        <textarea
          rows="10"
          cols="50"
          placeholder="Paste Job Description Here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <br /><br />

        <button onClick={handleMatch}>
          Match Resume
        </button>

        {result && (
          <div style={{ marginTop: "20px" }}>
            <h2>📊 Match Score: {result.match_score}%</h2>

            <h3>✅ Matched Skills</h3>
            <ul>
              {result.matched_skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h3>❌ Missing Skills</h3>
            <ul>
              {result.missing_skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h3>💡 Suggestions</h3>
            <ul>
              {result.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

export default JobMatch;