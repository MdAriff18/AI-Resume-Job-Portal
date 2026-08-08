import { useState, useEffect } from "react";
import API from "../api/axios";
import "../styles/ResumeBuilder.css";

function ResumeBuilder() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
  });

  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await API.get("resume-builder/");
      setResumes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("resume-builder/", formData);

      alert("Resume saved successfully!");

      setFormData({
        full_name: "",
        email: "",
        phone: "",
        summary: "",
        skills: "",
        education: "",
        experience: "",
        projects: "",
      });

      fetchResumes();
    } catch (error) {
      console.log(error);
      alert("Failed to save resume.");
    }
  };

  const downloadPDF = async (id) => {
    try {
      const response = await API.get(
        `resume-builder/${id}/pdf/`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Resume.pdf");

      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.log(error);
      alert("Failed to download PDF.");
    }
  };

  return (
    <div className="resume-builder-page">

      {/* Header */}

      <div className="builder-header">

        <div className="builder-icon">
          ✨
        </div>

        <div>
          <h1>AI Resume Builder</h1>

          <p>
            Create a professional resume in minutes
          </p>
        </div>

      </div>


      {/* Builder Card */}

      <div className="builder-card">

        <div className="section-title">

          <span>📝</span>

          <div>
            <h2>Build Your Resume</h2>
            <p>Fill in your professional details</p>
          </div>

        </div>


        <form onSubmit={handleSubmit}>

          {/* Personal Information */}

          <div className="form-section">

            <h3>👤 Personal Information</h3>

            <div className="input-grid">

              <div className="input-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="input-group">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="input-group">

                <label>Phone</label>

                <input
                  type="text"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </div>


          {/* Professional Summary */}

          <div className="form-section">

            <h3>💼 Professional Summary</h3>

            <textarea
              name="summary"
              placeholder="Write a short professional summary about yourself..."
              value={formData.summary}
              onChange={handleChange}
              rows="5"
            />

          </div>


          {/* Skills */}

          <div className="form-section">

            <h3>🛠️ Skills</h3>

            <textarea
              name="skills"
              placeholder="Python, Django, React, PostgreSQL, Git..."
              value={formData.skills}
              onChange={handleChange}
              rows="4"
            />

          </div>


          {/* Education */}

          <div className="form-section">

            <h3>🎓 Education</h3>

            <textarea
              name="education"
              placeholder="Degree, College, University, Graduation Year..."
              value={formData.education}
              onChange={handleChange}
              rows="4"
            />

          </div>


          {/* Experience */}

          <div className="form-section">

            <h3>💻 Experience</h3>

            <textarea
              name="experience"
              placeholder="Company, role, responsibilities, achievements..."
              value={formData.experience}
              onChange={handleChange}
              rows="5"
            />

          </div>


          {/* Projects */}

          <div className="form-section">

            <h3>🚀 Projects</h3>

            <textarea
              name="projects"
              placeholder="Project name, technologies used, key features..."
              value={formData.projects}
              onChange={handleChange}
              rows="5"
            />

          </div>


          <button
            type="submit"
            className="save-resume-btn"
          >
            ✨ Save Resume
          </button>

        </form>

      </div>


      {/* Saved Resumes */}

      <div className="saved-resumes">

        <div className="saved-header">

          <div>
            <h2>📄 My Built Resumes</h2>

            <p>
              Your professionally created resumes
            </p>
          </div>

          <span className="resume-count">
            {resumes.length}
          </span>

        </div>


        {resumes.length === 0 ? (

          <div className="empty-resumes">

            <div className="empty-icon">
              📄
            </div>

            <h3>No resumes found</h3>

            <p>
              Create your first professional resume above.
            </p>

          </div>

        ) : (

          <div className="resume-list">

            {resumes.map((resume) => (

              <div
                className="resume-item"
                key={resume.id}
              >

                <div className="resume-info">

                  <div className="resume-file-icon">
                    📄
                  </div>

                  <div>

                    <h3>
                      {resume.full_name}
                    </h3>

                    <p>
                      {resume.email}
                    </p>

                  </div>

                </div>


                <button
                  className="download-btn"
                  onClick={() => downloadPDF(resume.id)}
                >
                  📥 Download PDF
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default ResumeBuilder;