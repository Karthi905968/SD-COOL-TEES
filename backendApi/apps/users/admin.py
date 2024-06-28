from django.contrib import admin
from .models import UserModel
# Register your models here.

@admin.register(UserModel)
class UserModel(admin.ModelAdmin):
    fields = ['user_name', 'email', 'token', 'token_expires_at']
    list_filter = []
    list_display = fields
    search_fields = ['user_name', 'email']
