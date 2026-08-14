from django.contrib.auth import get_user_model
from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from .models import Resume, ResumeBuilder

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    ResumeSerializer,
    ResumeBuilderSerializer,
)

from .utils import (
    extract_resume_text,
    analyze_resume,
)

from .job_match import (
    match_resume_with_job,
)

from .pdf_generator import generate_resume_pdf


User = get_user_model()


# =========================================================
# REGISTER
# =========================================================

class RegisterAPIView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(
        self,
        request,
        *args,
        **kwargs,
    ):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        refresh = RefreshToken.for_user(
            user
        )

        return Response(
            {
                "refresh": str(refresh),
                "access": str(
                    refresh.access_token
                ),
                "user": {
                    "username": user.username,
                    "email": user.email,
                },
            },
            status=status.HTTP_201_CREATED,
        )


# =========================================================
# LOGIN
# =========================================================

class LoginAPIView(generics.GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        return Response(
            serializer.validated_data,
            status=status.HTTP_200_OK,
        )


# =========================================================
# LOGOUT
# =========================================================

class LogoutAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        try:

            refresh_token = request.data[
                "refresh"
            ]

            token = RefreshToken(
                refresh_token
            )

            token.blacklist()

            return Response(
                {
                    "message":
                    "Logout successful"
                },
                status=status.HTTP_205_RESET_CONTENT,
            )

        except Exception:

            return Response(
                {
                    "error":
                    "Invalid token"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


# =========================================================
# PROFILE
# =========================================================

class ProfileAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        user = request.user

        return Response(
            {
                "username": user.username,
                "email": user.email,
                "phone": user.phone,
                "role": user.role,
            },
            status=status.HTTP_200_OK,
        )


# =========================================================
# RESUME UPLOAD
# =========================================================

class ResumeUploadAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        serializer = ResumeSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                user=request.user
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


# =========================================================
# RESUME LIST
# =========================================================

class ResumeListAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        resumes = Resume.objects.filter(
            user=request.user
        )

        serializer = ResumeSerializer(
            resumes,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


# =========================================================
# ANALYZE RESUME
# =========================================================

class AnalyzeResumeAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        resume_id = request.data.get(
            "resume_id"
        )

        if not resume_id:

            return Response(
                {
                    "error":
                    "resume_id is required"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            resume = Resume.objects.get(
                id=resume_id,
                user=request.user,
            )

        except Resume.DoesNotExist:

            return Response(
                {
                    "error":
                    "Resume not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        try:

            # Get Cloudinary/public file URL
            resume_url = resume.resume.url

            resume_text = extract_resume_text(
                resume_url
            )

        except Exception as e:

            return Response(
                {
                    "error":
                    "Unable to read resume file",
                    "details":
                    str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not resume_text:

            return Response(
                {
                    "error":
                    "Could not extract text from resume."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            analysis = analyze_resume(
                resume_text
            )

        except Exception as e:

            return Response(
                {
                    "error":
                    "Resume analysis failed",
                    "details":
                    str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {
                "title": resume.title,

                "word_count":
                    len(
                        resume_text.split()
                    ),

                "ats_score":
                    analysis[
                        "ats_score"
                    ],

                "skills_found":
                    analysis[
                        "skills_found"
                    ],

                "missing_skills":
                    analysis[
                        "missing_skills"
                    ],

                "suggestions":
                    analysis[
                        "suggestions"
                    ],
            },
            status=status.HTTP_200_OK,
        )


# =========================================================
# JOB MATCH
# =========================================================

class ResumeJobMatchAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        resume_id = request.data.get(
            "resume_id"
        )

        job_description = request.data.get(
            "job_description",
            ""
        )

        if not resume_id:

            return Response(
                {
                    "error":
                    "resume_id is required"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not job_description.strip():

            return Response(
                {
                    "error":
                    "Job description is required"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            resume = Resume.objects.get(
                id=resume_id,
                user=request.user,
            )

        except Resume.DoesNotExist:

            return Response(
                {
                    "error":
                    "Resume not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        try:

            resume_url = resume.resume.url

            resume_text = extract_resume_text(
                resume_url
            )

        except Exception as e:

            return Response(
                {
                    "error":
                    "Unable to read resume file",
                    "details":
                    str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not resume_text:

            return Response(
                {
                    "error":
                    "Could not extract text from resume."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:

            result = match_resume_with_job(
                resume_text,
                job_description,
            )

        except Exception as e:

            return Response(
                {
                    "error":
                    "Job matching failed",
                    "details":
                    str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            result,
            status=status.HTTP_200_OK,
        )


# =========================================================
# RESUME BUILDER
# =========================================================

class ResumeBuilderAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        serializer = ResumeBuilderSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                user=request.user
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def get(self, request):

        resumes = ResumeBuilder.objects.filter(
            user=request.user
        )

        serializer = ResumeBuilderSerializer(
            resumes,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


# =========================================================
# RESUME PDF
# =========================================================

class ResumePDFAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request,
        resume_id,
    ):

        try:

            resume = ResumeBuilder.objects.get(
                id=resume_id,
                user=request.user,
            )

        except ResumeBuilder.DoesNotExist:

            return Response(
                {
                    "error":
                    "Resume not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        pdf = generate_resume_pdf(
            resume
        )

        response = HttpResponse(
            pdf,
            content_type="application/pdf",
        )

        response[
            "Content-Disposition"
        ] = (
            f'attachment; '
            f'filename="{resume.full_name}_Resume.pdf"'
        )

        return response