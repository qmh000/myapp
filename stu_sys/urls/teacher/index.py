from django.urls import path
from stu_sys.views.teacher.checkinfo import checkinfo
from stu_sys.views.teacher.saveinfo import saveinfo
from stu_sys.views.teacher.getinfo import getinfo
from stu_sys.views.teacher.delete_info import delete_info
from stu_sys.views.teacher.get_course import get_course
from stu_sys.views.teacher.get_class import get_class
from stu_sys.views.teacher.save_grade import save_grade

urlpatterns = [
    path("checkinfo/", checkinfo, name="teacher_checkinfo"),
    path("saveinfo/", saveinfo, name="teacher_saveinfo"),
    path("getinfo/", getinfo, name="teacher_getinfo"),
    path("delete_info/", delete_info, name="teacher_delete_info"),
    path("get_course/", get_course, name="teacher_get_course"),
    path("get_class/", get_class, name="teacher_get_class"),
    path("save_grade/", save_grade, name="teacher_save_grade"),
]
