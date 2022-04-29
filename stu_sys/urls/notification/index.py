from django.urls import path
from stu_sys.views.notification.get_notification import get_notification
from stu_sys.views.notification.delete_notification import delete_notification
from stu_sys.views.notification.select_notification import select_notification

urlpatterns = [
    path("get_notification/", get_notification, name="notication_get_notification"),
    path("delete_notification/", delete_notification, name="notification_delete_notification"),
    path("select_notification/", select_notification, name="notification_select_notification"),
]
