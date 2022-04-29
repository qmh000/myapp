from django.urls import path
from stu_sys.views.teacher.checkinfo import checkinfo
from stu_sys.views.teacher.saveinfo import saveinfo
from stu_sys.views.teacher.getinfo import getinfo
from stu_sys.views.teacher.delete_info import delete_info

urlpatterns = [
    path("checkinfo/", checkinfo, name="teacher_checkinfo"),
    path("saveinfo/", saveinfo, name="teacher_saveinfo"),
    path("getinfo/", getinfo, name="teacher_getinfo"),
    path("delete_info/", delete_info, name="teacher_delete_info"),
]
