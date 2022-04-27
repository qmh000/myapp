from django.contrib import admin
from stu_sys.models.tsu_user import Tsu_user
from stu_sys.models.notification import Notification

# Register your models here.

admin.site.register(Tsu_user)
admin.site.register(Notification)
