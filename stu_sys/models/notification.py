from django.db import models

class Notification(models.Model):
    title = models.CharField(max_length=100)
    create_time = models.DateField(auto_now_add=True)
    detail = models.TextField(max_length=1000, blank=True)

    def __str__(self):
        return str(self.title)
