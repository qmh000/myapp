from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    cid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    tuser = models.ForeignKey(User, on_delete=models.CASCADE)
    period = models.IntegerField()
    credit = models.FloatField()
    open_class = models.CharField(max_length=10)

