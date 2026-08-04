from django.urls import path

from .views import (
    RegisterAPIView,
    LoginAPIView,
    LogoutAPIView,
    ProfileAPIView,
    ResumeUploadAPIView,
    ResumeListAPIView,
    AnalyzeResumeAPIView,
    ResumeJobMatchAPIView,
    ResumeBuilderAPIView,
    ResumePDFAPIView,
)


urlpatterns = [

    path(
        "register/",
        RegisterAPIView.as_view(),
        name="register",
    ),

    path(
        "login/",
        LoginAPIView.as_view(),
        name="login",
    ),

    path(
        "logout/",
        LogoutAPIView.as_view(),
        name="logout",
    ),

    path(
        "profile/",
        ProfileAPIView.as_view(),
        name="profile",
    ),

    path(
        "resume/upload/",
        ResumeUploadAPIView.as_view(),
        name="resume-upload",
    ),

    path(
        "resume/list/",
        ResumeListAPIView.as_view(),
        name="resume-list",
    ),

    path(
        "resume/analyze/",
        AnalyzeResumeAPIView.as_view(),
        name="resume-analyze",
    ),
    path(
        "resume/job-match/",
        ResumeJobMatchAPIView.as_view(),
        name="resume-job-match",
    ),

        path(
        "resume-builder/",
        ResumeBuilderAPIView.as_view(),
        name="resume-builder",
    ),

        path(
        "resume-builder/<int:resume_id>/pdf/",
        ResumePDFAPIView.as_view(),
        name="resume-pdf",
    ),


]