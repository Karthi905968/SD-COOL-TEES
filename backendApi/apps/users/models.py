from django.db import models

# Create your models here.
class UserModel(models.Model):
    class Meta(object):
        db_table = 'User'
    
    user_name = models.CharField(
        'Name',max_length=100,blank=False,null=False,db_index=True
    )

    email = models.EmailField(
        'Email',max_length=100,blank=False,null=False,db_index=True
    )

    password = models.CharField(
        'password',max_length=100,blank=False,null=False,db_index=True
    )

    token = models.CharField(
        'token',null=True,blank=True,max_length=100,db_index=True
    )

    token_expires_at = models.DateTimeField(
        'Token Expires DateTime',blank=True,auto_now=True
    )

    created_at = models.DateTimeField(
        'Created DateTime',blank=False,auto_now_add=True
    )

    updated_at = models.DateTimeField(
        'Updated DateTime',blank=False,auto_now=True
    )
    