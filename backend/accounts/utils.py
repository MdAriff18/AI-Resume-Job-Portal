import os
import re

import PyPDF2
from docx import Document


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
]


def extract_resume_text(file_path):
    text = ""

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":

        with open(file_path, "rb") as file:

            reader = PyPDF2.PdfReader(file)

            for page in reader.pages:

                page_text = page.extract_text()

                if page_text:
                    text += page_text + "\n"

    elif extension == ".docx":

        document = Document(file_path)

        for paragraph in document.paragraphs:
            text += paragraph.text + "\n"

    return text.strip()


def analyze_resume(text):

    text_lower = text.lower()

    found_skills = []

    for skill in COMMON_SKILLS:

        if skill in text_lower:
            found_skills.append(skill)

    missing_skills = [
        skill
        for skill in COMMON_SKILLS
        if skill not in found_skills
    ]

    score = 50

    score += min(len(found_skills) * 3, 30)

    if len(text.split()) > 300:
        score += 10

    email_found = bool(
        re.search(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            text,
        )
    )

    phone_found = bool(
        re.search(
            r"\+?\d[\d\s-]{8,}",
            text,
        )
    )

    if email_found:
        score += 5

    if phone_found:
        score += 5

    score = min(score, 100)

    suggestions = []

    if len(found_skills) < 6:
        suggestions.append(
            "Add more relevant technical skills."
        )

    if not email_found:
        suggestions.append(
            "Add a professional email address."
        )

    if not phone_found:
        suggestions.append(
            "Add a phone number."
        )

    if len(text.split()) < 300:
        suggestions.append(
            "Add more projects, internships, and measurable achievements."
        )

    return {
        "ats_score": score,
        "skills_found": found_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
    }