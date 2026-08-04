import { useState } from "react";
import API from "../api/axios";

function ResumeUpload() {
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!resume) {
      setMessage("Please select a resume file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("resume", resume);

    try {
      const token = localStorage.getItem("access");

      const response = await API.post(
        "resume/upload/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setMessage("Resume uploaded successfully!");

      setTitle("");
      setResume(null);

      // Reset file input
      document.getElementById("resumeFile").value = "";

    } catch (error) {
      console.error(error);
      setMessage("Resume upload failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">AI Resume Job Portal</h1>

        <h2>Upload Resume</h2>

        <form onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Resume Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            id="resumeFile"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />

          <button type="submit">
            Upload Resume
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "15px" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;