from django.urls import path
from stu_sys.views.student.checkinfo import checkinfo
from stu_sys.views.student.getinfo import getinfo
from stu_sys.views.student.saveinfo import saveinfo
from stu_sys.views.student.delete_info import delete_info
from stu_sys.views.student.get_selected_course import get_selected_course
from stu_sys.views.student.show_selectable_course import show_selectable_course
from stu_sys.views.student.plan import plan
from stu_sys.views.student.save_course import save_course
from stu_sys.views.student.show_grade import show_grade

urlpatterns = [
    path("checkinfo/", checkinfo, name="student_checkinfo"),
    path("getinfo/", getinfo, name="student_getinfo"),
    path("saveinfo/", saveinfo, name="student_saveinfo"),
    path("delete_info/", delete_info, name="student_delete_info"),
    path("get_selected_course/", get_selected_course, name="student_get_selected_course"),
    path("show_selectable_course/", show_selectable_course, name="student_show_selectable_course"),
    path("plan/", plan, name="student_plan"),
    path("save_course/", save_course, name="student_save_course"),
    path("show_grade/", show_grade, name="student_show_grade"),
]
