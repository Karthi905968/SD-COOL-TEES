
from django.urls import path
from .views import UserSignUp,UserList,UserSignIn,UserCheckLogin


urlpatterns = [
    path('',UserList.as_view(),name='user-list'),
    path('signup/', UserSignUp.as_view(),name='sign-up'),
    path('signin/', UserSignIn.as_view(),name='sign-in'),
     path('check-login/', UserCheckLogin.as_view(),name='check-login'),
]