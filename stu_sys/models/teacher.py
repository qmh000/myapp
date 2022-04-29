from django.db import models
from stu_sys.models.tsu_user import Tsu_user

class Teacher(models.Model):
    user = models.OneToOneField(Tsu_user, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    dept = models.CharField(max_length=30)

    def __str__(self):
        return str(self.user)
