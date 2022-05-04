from django.db import models
from django.contrib.auth.models import User
from stu_sys.models.course import Course


class Select(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cid = models.OneToOneField(Course, on_delete=models.CASCADE)
    grade = models.IntegerField()

