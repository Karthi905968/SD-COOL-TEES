from rest_framework import generics
from .serializers import UserSerializer,UserSignUpSerializer,UserSignInSerializer
from .models import UserModel
from .mixens import CustomLoginRequiredMixin


class UserSignUp(generics.CreateAPIView):
    queryset=UserModel.objects.all()
    serializer_class=UserSignUpSerializer

class UserSignIn(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSignInSerializer


class UserList(CustomLoginRequiredMixin,generics.ListAPIView):
    #Get all Users
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class UserCheckLogin(CustomLoginRequiredMixin,generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        
        serializer = UserSerializer([request.login_user],many = True)
        return serializer.data[0]


