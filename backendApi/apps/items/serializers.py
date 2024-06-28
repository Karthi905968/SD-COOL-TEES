from rest_framework import serializers
from .models import ItemModel
class ItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(allow_null=True)

    class Meta:
        model = ItemModel
        fields = '__all__'