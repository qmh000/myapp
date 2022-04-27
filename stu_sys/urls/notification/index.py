from django.urls import path
from stu_sys.views.notification.get_notification import get_notification

urlpatterns = [
    path("get_notification/", get_notification, name="notication_get_notification")
]
