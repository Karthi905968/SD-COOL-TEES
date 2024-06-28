from rest_framework import serializers
from .models import Order,OrderItem

class OrderSerializer(serializers.ModelSerializer):
    model = Order
    fields='__all__'