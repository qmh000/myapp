from django.urls import path
from stu_sys.views.admin.get_search_info import get_search_info

urlpatterns = [
    path("get_search_info/", get_search_info, name="admin_get_search_info"),
]
