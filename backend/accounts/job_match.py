import re

COMMON_SKILLS = [
    "python",
    "django",
    "react",
    "javascript",
    "html",
    "css",
    "sql",
    "mysql",
    "postgresql",
    "git",
    "github",
    "docker",
    "aws",
    "rest api",
    "flask",
    "bootstrap",
    "tailwind",
    "mongodb",
]


def match_resume_with_job(resume_text, job_description):

    resume = resume_text.lower()
    job = job_description.lower()

    matched_skills = []
    missing_skills = []

    for skill in COMMON_SKILLS:

        if skill in job:

            if skill in resume:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

    total = len(matched_skills) + len(missing_skills)

    if total == 0:
        score = 0
    else:
        score = round((len(matched_skills) / total) * 100)

    suggestions = []

    if missing_skills:
        suggestions.append(
            "Add experience or projects related to the missing skills."
        )

    if score < 60:
        suggestions.append(
            "Customize your resume based on the job description."
        )

    if score >= 80:
        suggestions.append(
            "Your resume is well aligned with this job."
        )

    return {
        "match_score": score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
    }