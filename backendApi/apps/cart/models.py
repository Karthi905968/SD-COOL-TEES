from django.db import models
from apps.users.models import UserModel
from apps.items.models import ItemModel
# Create your models here.

class CartModel(models.Model):
    class Meta(object):
        db_table = 'Cart'

    user = models.ForeignKey(
        UserModel,on_delete=models.CASCADE,db_index=True
    )

    items = models.ForeignKey(
        ItemModel,on_delete=models.CASCADE,db_index=True
    )

    quantity = models.IntegerField(
        'Quantity' , blank=False , null= False , db_index=True
    )

    created_at = models.DateTimeField(
        'Created at',blank=True,auto_now_add=True
    )

    updated_at = models.DateTimeField(
        'Updated at',blank=True,auto_now=True
    )
