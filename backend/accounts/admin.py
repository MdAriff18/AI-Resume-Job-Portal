from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User

    list_display = (
        "email",
        "username",
        "role",
        "is_staff",
        "is_active",
    )

    ordering = ("email",)

    fieldsets = UserAdmin.fieldsets + (
        (
            "Extra Info",
            {
                "fields": (
                    "phone_number",
                    "role",
                )
            },
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            None,
            {
                "fields": (
                    "email",
                    "phone_number",
                    "role",
                )
            },
        ),
    )