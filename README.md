# AI Resume Job Portal

An AI-powered full-stack web application that helps job seekers analyze their resumes, evaluate ATS compatibility, match resumes with job descriptions, identify missing skills, and build professional resumes.

## 🚀 Live Demo

**Frontend:** https://ai-resume-job-portal-xi.vercel.app/

## ✨ Features

* 🔐 User Registration & JWT Authentication
* 👤 User Profile Management
* 📄 Resume Upload & Management
* 🤖 AI-Powered Resume Analysis
* 📊 ATS Resume Score
* 🛠️ Skill Detection
* ⚠️ Missing Skill Identification
* 💡 AI Resume Improvement Suggestions
* 🎯 Resume-to-Job Matching
* 📋 Matched & Missing Job Skills
* 📝 AI-Based Job Match Suggestions
* 📑 Professional Resume Builder
* 📥 Resume PDF Generation
* ☁️ Cloudinary Resume Storage
* 🗄️ PostgreSQL Database
* 📱 Responsive User Interface

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Axios
* Lucide React
* React Circular Progressbar

### Backend

* Python
* Django
* Django REST Framework
* JWT Authentication
* PyPDF2
* python-docx
* ReportLab

### Database & Storage

* PostgreSQL
* Cloudinary

### Deployment

* Vercel — Frontend
* Render — Backend
* Render PostgreSQL — Database
* Cloudinary — Resume Storage

## 🧠 Resume Analysis

The application analyzes uploaded resumes and provides:

* ATS score
* Detected technical skills
* Missing skills
* Resume word count
* Email and phone detection
* Resume improvement suggestions

The system currently analyzes skills such as:

`Python` `Django` `React` `JavaScript` `HTML` `CSS` `SQL` `MySQL` `PostgreSQL` `Git` `GitHub` `Docker` `AWS` `REST API`

## 🎯 Resume Job Matching

Users can select an uploaded resume and paste a job description.

The system provides:

* Resume compatibility score
* Matched skills
* Missing skills
* Improvement suggestions

This helps users understand how well their resume matches a specific job opportunity.

## 📄 Resume Builder

Users can create professional resumes through the built-in resume builder.

The application supports:

* Personal information
* Education
* Skills
* Projects
* Experience
* Professional summary
* PDF resume generation

## 🔐 Authentication

The backend uses JWT-based authentication.

Supported operations include:

* Register
* Login
* Logout
* Profile
* Protected API endpoints

User-specific resume data is protected so users can access only their own resumes.

## 🏗️ Application Architecture

```text
React + Vite
     │
     │ REST API
     ▼
Django REST Framework
     │
     ├── JWT Authentication
     │
     ├── Resume Analysis
     │
     ├── Job Matching
     │
     └── Resume Builder
     │
     ▼
PostgreSQL
     │
     ▼
Cloudinary
```

## 📂 Project Structure

```text
AI-Resume-Job-Portal/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── api/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── accounts/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── utils.py
│   │   └── job_match.py
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd AI-Resume-Job-Portal
```

### 2. Backend Setup

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment on Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django server:

```bash
python manage.py runserver
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the local Vite development server.

## 🔑 Environment Variables

### Backend

Configure the required environment variables for:

* Django secret key
* PostgreSQL database
* Cloudinary credentials
* Allowed hosts
* CORS configuration

### Frontend

Configure:

```text
VITE_API_URL=<YOUR_BACKEND_API_URL>
```

## 🌐 Deployment

### Frontend

The React/Vite frontend is deployed using Vercel.

### Backend

The Django REST API is deployed using Render with Gunicorn.

### Database

PostgreSQL is used as the production database.

### File Storage

Cloudinary is used for storing uploaded resume files.

## 🔄 Application Workflow

```text
User Registration
       ↓
User Login
       ↓
Dashboard
       ↓
Upload Resume
       ↓
Resume Stored in Cloudinary
       ↓
AI Resume Analysis
       ↓
ATS Score + Skills + Missing Skills
       ↓
Job Description
       ↓
Resume Job Match
       ↓
Compatibility Score + Recommendations
```

## 🔮 Future Enhancements

* Advanced AI-powered resume recommendations
* More comprehensive ATS analysis
* Job search integration
* Personalized job recommendations
* Resume keyword optimization
* Multiple resume templates
* Resume analytics dashboard
* Advanced skill-gap analysis
* Interview preparation tools

## 👨‍💻 Developer

**Mohammed Arif**

Python Full Stack Developer | Django REST Framework | React.js | PostgreSQL | REST APIs | AI-Powered Web Applications

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
