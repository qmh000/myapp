from django.urls import path
from stu_sys.views.account.getinfo import getinfo
from stu_sys.views.account.login import signin
from stu_sys.views.account.register import register

urlpatterns = [
    path("getinfo/", getinfo, name="account_getinfo"),
    path("login/", signin, name="account_login"),
    path("register/", register, name="account_login"),
]
