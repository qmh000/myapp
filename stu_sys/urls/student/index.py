from django.urls import path
from stu_sys.views.student.checkinfo import checkinfo
from stu_sys.views.student.getinfo import getinfo
from stu_sys.views.student.saveinfo import saveinfo
from stu_sys.views.student.delete_info import delete_info
from stu_sys.views.student.get_selected_course import get_selected_course

urlpatterns = [
    path("checkinfo/", checkinfo, name="student_checkinfo"),
    path("getinfo/", getinfo, name="student_getinfo"),
    path("saveinfo/", saveinfo, name="student_saveinfo"),
    path("delete_info/", delete_info, name="student_delete_info"),
    path("get_selected_course/", get_selected_course, name="student_get_selected_course")
]
