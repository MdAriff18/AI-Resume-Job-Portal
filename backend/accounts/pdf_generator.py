from io import BytesIO

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)


def generate_resume_pdf(resume):

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph(
            f"<b>{resume.full_name}</b>",
            styles["Title"],
        )
    )

    story.append(
        Paragraph(
            f"Email: {resume.email}",
            styles["Normal"],
        )
    )

    story.append(
        Paragraph(
            f"Phone: {resume.phone}",
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 12))

    story.append(
        Paragraph(
            "<b>Professional Summary</b>",
            styles["Heading2"],
        )
    )

    story.append(
        Paragraph(
            resume.summary,
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 12))

    story.append(
        Paragraph(
            "<b>Skills</b>",
            styles["Heading2"],
        )
    )

    story.append(
        Paragraph(
            resume.skills,
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 12))

    story.append(
        Paragraph(
            "<b>Education</b>",
            styles["Heading2"],
        )
    )

    story.append(
        Paragraph(
            resume.education,
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 12))

    story.append(
        Paragraph(
            "<b>Experience</b>",
            styles["Heading2"],
        )
    )

    story.append(
        Paragraph(
            resume.experience,
            styles["Normal"],
        )
    )

    story.append(Spacer(1, 12))

    story.append(
        Paragraph(
            "<b>Projects</b>",
            styles["Heading2"],
        )
    )

    story.append(
        Paragraph(
            resume.projects,
            styles["Normal"],
        )
    )

    doc.build(story)

    pdf = buffer.getvalue()

    buffer.close()

    return pdf