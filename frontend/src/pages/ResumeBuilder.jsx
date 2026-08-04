import { useState, useEffect } from "react";
import API from "../api/axios";

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
    <div className="login-container">
      <div className="login-box">

        <h1>AI Resume Builder</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={formData.summary}
            onChange={handleChange}
          />

          <textarea
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
          />

          <textarea
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
          />

          <textarea
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
          />

          <textarea
            name="projects"
            placeholder="Projects"
            value={formData.projects}
            onChange={handleChange}
          />

          <button type="submit">
            Save Resume
          </button>

        </form>

        <hr />

        <h2>My Built Resumes</h2>

        {resumes.length === 0 ? (
          <p>No resumes found.</p>
        ) : (
          resumes.map((resume) => (
            <div key={resume.id} style={{ marginBottom: "20px" }}>
              <h3>{resume.full_name}</h3>
              <p>{resume.email}</p>

              <button
                onClick={() => downloadPDF(resume.id)}
              >
                📄 Download PDF
              </button>

              <hr />
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default ResumeBuilder;