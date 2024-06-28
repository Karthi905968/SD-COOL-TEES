from django.urls import path
from .views import OrderAdd

urlpatterns = [
   path('add/',OrderAdd.as_view(),name='order_add')
]