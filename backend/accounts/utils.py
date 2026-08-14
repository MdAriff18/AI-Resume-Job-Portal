import os
import re
from io import BytesIO
from urllib.parse import urlparse

import requests
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


def extract_resume_text(file_source):
    """
    Extract text from PDF or DOCX.
    Supports:
    - Cloudinary/public HTTP(S) URLs
    - Local uploaded files
    """

    text = ""

    # =========================
    # Remote file - Cloudinary
    # =========================

    if isinstance(file_source, str) and file_source.startswith(
        ("http://", "https://")
    ):

        response = requests.get(
            file_source,
            timeout=30,
        )

        response.raise_for_status()

        file_data = BytesIO(response.content)

        # Cloudinary URLs can sometimes contain query parameters.
        # Get extension from the URL path first.
        path = urlparse(file_source).path
        extension = os.path.splitext(path)[1].lower()

        # If extension is missing, try Content-Type.
        if not extension:

            content_type = response.headers.get(
                "Content-Type",
                ""
            ).lower()

            if "pdf" in content_type:
                extension = ".pdf"

            elif "word" in content_type or "officedocument" in content_type:
                extension = ".docx"

    # =========================
    # Local file
    # =========================

    else:

        if hasattr(file_source, "name"):

            extension = os.path.splitext(
                file_source.name
            )[1].lower()

        else:

            extension = os.path.splitext(
                str(file_source)
            )[1].lower()

        file_data = file_source

    # =========================
    # PDF
    # =========================

    if extension == ".pdf":

        reader = PyPDF2.PdfReader(file_data)

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    # =========================
    # DOCX
    # =========================

    elif extension == ".docx":

        document = Document(file_data)

        for paragraph in document.paragraphs:

            if paragraph.text:
                text += paragraph.text + "\n"

    else:

        raise ValueError(
            f"Unsupported resume file type: {extension or 'unknown'}"
        )

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

    # =========================
    # ATS Score
    # =========================

    score = 50

    score += min(
        len(found_skills) * 3,
        30
    )

    word_count = len(text.split())

    if word_count > 300:
        score += 10

    # =========================
    # Email
    # =========================

    email_found = bool(
        re.search(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            text,
        )
    )

    # =========================
    # Phone
    # =========================

    phone_found = bool(
        re.search(
            r"\+?\d[\d\s().-]{8,}",
            text,
        )
    )

    if email_found:
        score += 5

    if phone_found:
        score += 5

    score = min(score, 100)

    # =========================
    # Suggestions
    # =========================

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

    if word_count < 300:

        suggestions.append(
            "Add more projects, internships, and measurable achievements."
        )

    if not suggestions:

        suggestions.append(
            "Your resume looks good. Keep improving it with measurable achievements."
        )

    return {
        "ats_score": score,
        "skills_found": found_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
    }