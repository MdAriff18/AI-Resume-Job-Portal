import { useEffect, useState } from "react";
import API from "../api/axios";

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

    <div className="login-container">

      <div className="login-box">

        <h1 className="login-title">
          AI Resume Job Portal
        </h1>


        <h2>
          My Resumes
        </h2>


        {
          resumes.length === 0 ? (

            <p>No resumes uploaded</p>

          ) : (

            resumes.map((resume) => (

              <div key={resume.id}>

                <h3>
                  {resume.title}
                </h3>


                <p>
                  Uploaded: {resume.uploaded_at}
                </p>


                <a
                  href={`http://127.0.0.1:8000${resume.resume}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </a>


                <br />


                <button
                  onClick={() => analyzeResume(resume.id)}
                >
                  Analyze Resume
                </button>


                <hr />

              </div>

            ))

          )
        }


        {
          analysis && (

            <div>

<h3>🤖 AI Resume Analysis</h3>

<p>
  <strong>Title:</strong> {analysis.title}
</p>

<p>
  <strong>Word Count:</strong> {analysis.word_count}
</p>

<p>
  <strong>ATS Score:</strong> {analysis.ats_score}/100
</p>

<h4>✅ Skills Found</h4>

<ul>
  {analysis.skills_found.map((skill, index) => (
    <li key={index}>{skill}</li>
  ))}
</ul>

<h4>❌ Missing Skills</h4>

<ul>
  {analysis.missing_skills.map((skill, index) => (
    <li key={index}>{skill}</li>
  ))}
</ul>

<h4>💡 Suggestions</h4>

<ul>
  {analysis.suggestions.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>

            </div>

          )
        }


        {message && <p>{message}</p>}


      </div>

    </div>

  );
}


export default MyResumes;