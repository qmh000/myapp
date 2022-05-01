from django.db import models
from stu_sys.models.tsu_user import Tsu_user

class Student(models.Model):
    user = models.OneToOneField(Tsu_user, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    sex = models.CharField(max_length=30)
    age = models.IntegerField()
    dept = models.CharField(max_length=30)
    minor_class = models.CharField(max_length=30)
    minor_subject = models.CharField(max_length=30)

    def __str__(self):
        return str(self.user)
