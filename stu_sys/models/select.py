from django.db import models
from django.contrib.auth.models import User
from stu_sys.models.course import Course


class Select(models.Model):
    user = models.CharField(max_length=30)
    cid = models.IntegerField()
    grade = models.IntegerField(null=True, blank=True)

