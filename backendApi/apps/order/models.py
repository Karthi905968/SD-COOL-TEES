from django.db import models
from ..users.models import UserModel
from ..items.models import ItemModel

# Create your models here.
class Order(models.Model):
    class Meta(object):
        db_table = 'Order'
    
    user = models.ForeignKey(
        UserModel ,on_delete=models.CASCADE,db_index=True
    )

    total_price = models.DecimalField(
        'Total price',blank=False,null=False,max_digits=11,decimal_places=2
    )

    full_name=models.CharField(
        'Full Name',blank=False,null=False,max_length=50,db_index=True
    )

    address_line1 = models.CharField(
        'Address Line1', blank=False, null=False, max_length=250, db_index=True
    )

    address_line2 = models.CharField(
        'Address Line2', blank=False, null=False, max_length=250, db_index=True
    )

    city = models.CharField(
        'City', blank=False, null=False, max_length=25, db_index=True
    )

    state = models.CharField(
        'State', blank=False, null=False, max_length=25, db_index=True
    )

    postal_code = models.IntegerField(
        'Postal Code',blank=False,null=False,db_index=True
    )

    country = models.CharField(
        'Country', blank=False, null=False, max_length=25, db_index=True, default='United State'
    )

    telephone = models.IntegerField(
        'Telephone', blank=True, null=True, db_index=True
    )

    created_at = models.DateTimeField(
        'Created At', blank=True, auto_now_add=True
    )

    updated_at = models.DateTimeField(
        'Updated At', blank=True, auto_now=True
    )
    

class OrderItem(models.Model):
    class Meta(object):
        db_table='Order Item'

    order = models.ForeignKey(
        Order,on_delete=models.CASCADE,db_index=True
    )

    item = models.ForeignKey(
        ItemModel,on_delete=models.CASCADE,db_index=True
    )

    quantity = models. IntegerField(
        'Quantity', blank=False, null=False, db_index=True
    )

    created_at = models.DateTimeField(
        'Created At', blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Updated At', blank=True, auto_now=True
    )

    


