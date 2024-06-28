from django.db import models
from backendApi.constants import *
from cloudinary.models import CloudinaryField
# Create your models here.

class ItemModel(models.Model):
    class Meta(object):
        db_table = 'Items'

    status = models.CharField(
        'Status',blank=False,default='inactive',max_length=50,db_index=True,choices=STATUS
    )

    name = models.CharField(
        'Name',max_length=50,blank=False,null=False,db_index=True
    )

    price = models.DecimalField(
        'Price',blank=False,null=False,max_digits=14,decimal_places=2
    )

    image = CloudinaryField(
        'Image',blank=False,null=False
    )

    created_at = models.DateTimeField(
        'Created At',blank=True,auto_now_add=True
    )

    updated_at = models.DateTimeField(
        'Updated At',blank=True,auto_now=True
    )



    