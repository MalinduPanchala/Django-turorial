import datetime
from enum import unique
from tkinter import CASCADE
from uuid import uuid4
from django.db import models
from django.db import connections

# Create your models here.
class Foods(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=20)
    type = models.CharField(max_length=20)
    price = models.FloatField()
    class Meta:
        db_table = "foods"

class Orders(models.Model):
    id = models.AutoField(primary_key=True)
    order_id = models.UUIDField(default=uuid4)
    food = models.IntegerField(default=1)
    name = models.CharField(max_length=20, default="Rice")
    type = models.CharField(max_length=20, default="main_dish")
    price = models.FloatField(default=0)
    created_at = models.DateField(default=datetime.date.today)
    class Meta:
        db_table = "orders"
        unique_together = (('id', 'food'),)