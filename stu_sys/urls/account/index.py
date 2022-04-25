from django.urls import path
from stu_sys.views.account.getinfo import getinfo

urlpatterns = [
    path("getinfo/", getinfo, name="account_getinfo")
]
