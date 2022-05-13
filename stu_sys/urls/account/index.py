from django.urls import path
from stu_sys.views.account.getinfo import getinfo
from stu_sys.views.account.login import signin
from stu_sys.views.account.register import register
from stu_sys.views.account.logout import signout
from stu_sys.views.account.getname import getname

urlpatterns = [
    path("getinfo/", getinfo, name="account_getinfo"),
    path("login/", signin, name="account_login"),
    path("register/", register, name="account_login"),
    path("logout/", signout, name="account_logout"),
    path("getname/", getname, name="account_getname"),
]
