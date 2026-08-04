from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ("candidate", "Candidate"),
        ("recruiter", "Recruiter"),
        ("admin", "Admin"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="candidate"
    )

    phone = models.CharField(
        max_length=15,
        blank=True
    )

    profile_picture = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.username


class Resume(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="resumes"
    )

    title = models.CharField(max_length=200)

    resume = models.FileField(
        upload_to="resumes/"
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title

class ResumeBuilder(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )

    full_name = models.CharField(max_length=100)

    email = models.EmailField()

    phone = models.CharField(max_length=15)

    summary = models.TextField()

    skills = models.TextField()

    education = models.TextField()

    experience = models.TextField()

    projects = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name