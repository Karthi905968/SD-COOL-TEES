from rest_framework import generics
from .serializers import ItemSerializer
from .models import ItemModel
# Create your views here.

class ItemView(generics.ListAPIView):
    queryset=ItemModel.objects.order_by('-created_at').filter(status='active')
    serializer_class=ItemSerializer

