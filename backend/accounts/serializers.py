from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Resume
from .models import ResumeBuilder


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "phone",
            "role",
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User(**validated_data)

        user.set_password(password)

        user.save()

        return user


class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()

    password = serializers.CharField(write_only=True)

    def validate(self, data):

        email = data.get("email")
        password = data.get("password")

        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:
            raise serializers.ValidationError(
                "Invalid email or password"
            )

        if not user.check_password(password):
            raise serializers.ValidationError(
                "Invalid email or password"
            )

        refresh = RefreshToken.for_user(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "username": user.username,
                "email": user.email,
            }
        }


class ResumeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resume
        fields = [
            "id",
            "title",
            "resume",
            "uploaded_at",
        ]

class ResumeBuilderSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResumeBuilder
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "summary",
            "skills",
            "education",
            "experience",
            "projects",
            "created_at",
        ]