import { useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import API from "../api/axios";
import "../styles/ResumeUpload.css";

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

      document.getElementById("resumeFile").value = "";
    } catch (error) {
      console.error(error);
      setMessage("Resume upload failed.");
    }
  };

  return (
    <div className="upload-page">

      <div className="upload-container">

        {/* Header */}

        <div className="upload-header">

          <div className="upload-icon">
            <UploadCloud size={26} />
          </div>

          <div>
            <span className="upload-label">
              RESUME MANAGEMENT
            </span>

            <h1>Upload Resume</h1>

            <p>
              Upload your resume and let AI analyze it for you.
            </p>
          </div>

        </div>


        {/* Upload Card */}

        <div className="upload-card">

          <form onSubmit={handleUpload}>

            {/* Resume Title */}

            <div className="form-group">

              <label htmlFor="resumeTitle">
                Resume Title
              </label>

              <input
                id="resumeTitle"
                type="text"
                placeholder="e.g. Python Developer Resume"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

            </div>


            {/* Resume File */}

            <div className="form-group">

              <label>
                Resume File
              </label>

              <label
                htmlFor="resumeFile"
                className={
                  resume
                    ? "file-upload-area file-selected"
                    : "file-upload-area"
                }
              >

                <input
                  id="resumeFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    setResume(e.target.files[0]);
                    setMessage("");
                  }}
                  required
                />


                {resume ? (

                  <>
                    <div className="selected-file-icon">
                      <FileText size={25} />
                    </div>

                    <div className="selected-file-info">

                      <strong>
                        {resume.name}
                      </strong>

                      <span>
                        {(resume.size / 1024 / 1024).toFixed(2)} MB
                      </span>

                    </div>

                    <CheckCircle2
                      className="file-check"
                      size={22}
                    />
                  </>

                ) : (

                  <>
                    <div className="drop-icon">
                      <UploadCloud size={30} />
                    </div>

                    <h3>
                      Click to upload your resume
                    </h3>

                    <p>
                      PDF, DOC or DOCX
                    </p>

                    <span className="browse-text">
                      Browse files
                    </span>
                  </>

                )}

              </label>

            </div>


            {/* Upload Button */}

            <button
              type="submit"
              className="upload-button"
            >
              <UploadCloud size={18} />
              Upload Resume
            </button>

          </form>


          {/* Message */}

          {message && (

            <div
              className={
                message.includes("successfully")
                  ? "upload-message success-message"
                  : "upload-message error-message"
              }
            >

              {message.includes("successfully") ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}

              <span>
                {message}
              </span>

            </div>

          )}

        </div>


        {/* Tips */}

        <div className="upload-tips">

          <div className="tip">
            <CheckCircle2 size={18} />
            <span>
              Use an updated resume
            </span>
          </div>

          <div className="tip">
            <CheckCircle2 size={18} />
            <span>
              Keep your resume easy to read
            </span>
          </div>

          <div className="tip">
            <CheckCircle2 size={18} />
            <span>
              AI will analyze your skills
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeUpload;