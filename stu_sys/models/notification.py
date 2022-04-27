from django.db import models

class Notification(models.Model):
    title = models.CharField(max_length=100)
    create_time = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.title)
