import re


COMMON_SKILLS = [
    "python",
    "django",
    "django rest framework",
    "rest api",
    "react",
    "javascript",
    "typescript",
    "html",
    "css",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "git",
    "github",
    "docker",
    "aws",
    "flask",
    "fastapi",
    "bootstrap",
    "tailwind",
    "java",
    "c++",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "data analysis",
    "pandas",
    "numpy",
    "scikit-learn",
    "api",
]


def normalize_text(text):
    """
    Convert text into a normalized format
    for reliable skill matching.
    """

    text = text.lower()

    # Replace special characters with spaces
    text = re.sub(r"[^a-z0-9+#.\s]", " ", text)

    # Normalize multiple spaces
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def contains_skill(text, skill):
    """
    Check whether a skill exists as a complete word/phrase.
    Prevents partial matches such as:
    'java' matching 'javascript'.
    """

    skill_pattern = re.escape(skill.lower())

    return bool(
        re.search(
            rf"(?<![a-z0-9]){skill_pattern}(?![a-z0-9])",
            text,
        )
    )


def match_resume_with_job(resume_text, job_description):

    resume = normalize_text(resume_text)
    job = normalize_text(job_description)

    matched_skills = []
    missing_skills = []

    # Find only skills actually mentioned
    # in the job description.
    required_skills = []

    for skill in COMMON_SKILLS:

        if contains_skill(job, skill):
            required_skills.append(skill)

    # Compare job skills against resume skills
    for skill in required_skills:

        if contains_skill(resume, skill):
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    # Remove duplicates while keeping order
    matched_skills = list(dict.fromkeys(matched_skills))
    missing_skills = list(dict.fromkeys(missing_skills))

    total_required = len(required_skills)

    # -----------------------------------------
    # Skill Match Score
    # -----------------------------------------

    if total_required > 0:

        skill_score = (
            len(matched_skills) / total_required
        ) * 100

    else:

        skill_score = 0


    # -----------------------------------------
    # Resume Content Relevance
    # -----------------------------------------

    resume_words = set(resume.split())

    job_words = set(job.split())

    stop_words = {
        "the",
        "and",
        "for",
        "with",
        "from",
        "this",
        "that",
        "your",
        "you",
        "are",
        "will",
        "our",
        "have",
        "has",
        "who",
        "job",
        "role",
        "work",
        "years",
        "year",
        "experience",
        "required",
        "looking",
        "candidate",
        "should",
        "must",
    }

    meaningful_job_words = {
        word
        for word in job_words
        if len(word) >= 4
        and word not in stop_words
        and not word.isdigit()
    }

    if meaningful_job_words:

        keyword_overlap = (
            len(
                resume_words.intersection(
                    meaningful_job_words
                )
            )
            / len(meaningful_job_words)
        ) * 100

    else:

        keyword_overlap = 0


    # -----------------------------------------
    # Final Score
    # -----------------------------------------

    if total_required > 0:

        # Skills are more important than
        # general keyword overlap.
        final_score = (
            (skill_score * 0.75)
            + (keyword_overlap * 0.25)
        )

    else:

        # If no recognized skills exist in the JD,
        # use general keyword relevance.
        final_score = keyword_overlap


    # Keep score between 0 and 100
    score = round(
        max(0, min(final_score, 100))
    )


    # -----------------------------------------
    # Suggestions
    # -----------------------------------------

    suggestions = []

    if missing_skills:

        important_missing = missing_skills[:5]

        suggestions.append(
            "Consider adding experience, projects, "
            "or certifications related to: "
            + ", ".join(important_missing)
            + "."
        )


    if score < 40:

        suggestions.append(
            "Your resume has low alignment with "
            "this job. Tailor your skills and "
            "project descriptions to the job requirements."
        )

    elif score < 70:

        suggestions.append(
            "Your resume has moderate alignment. "
            "Highlight relevant technical skills "
            "and project experience more clearly."
        )

    elif score < 85:

        suggestions.append(
            "Your resume is well aligned. "
            "Adding the remaining required skills "
            "could further improve your match."
        )

    else:

        suggestions.append(
            "Your resume is highly aligned with "
            "this job description."
        )


    # Keyword recommendation
    if keyword_overlap < 20:

        suggestions.append(
            "Use relevant keywords from the job "
            "description naturally in your resume."
        )


    return {
        "match_score": score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
    }