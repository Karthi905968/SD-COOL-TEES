import datetime
from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .models import UserModel

class CustomLoginRequiredMixin:

    def dispatch(self, request, *args, **kwargs):
        if 'Authorization' not in request.headers:
            response = Response({'error': 'Please set Auth-Token.'}, status=status.HTTP_401_UNAUTHORIZED)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response

        token = request.headers['Authorization']
        now = datetime.datetime.now()
        login_user = UserModel.objects.filter(token=token)

        if not login_user.exists():
            response = Response({'error': 'The token is invalid or expired.'}, status=status.HTTP_401_UNAUTHORIZED)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            return response

        request.login_user = login_user.first()
        return super().dispatch(request, *args, **kwargs)
