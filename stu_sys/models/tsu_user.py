from django.db import models
from django.contrib.auth.models import User

class Tsu_user(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    identity = models.CharField(max_length=30)

    def __str__(self):
        return str(self.user)
