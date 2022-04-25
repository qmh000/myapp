from django.urls import path, include
from stu_sys.views.index import index

urlpatterns = [
    path("", index, name="index"),
    path("account/", include("stu_sys.urls.account.index")),
    path("admin/", include("stu_sys.urls.admin.index")),
    path("teacher/", include("stu_sys.urls.teacher.index")),
    path("student/", include("stu_sys.urls.student.index")),
]