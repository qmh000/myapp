from django.urls import path
from stu_sys.views.admin.get_search_info import get_search_info
from stu_sys.views.admin.modify_student_info import modify_student_info
from stu_sys.views.admin.get_teacher_info import get_teacher_info

urlpatterns = [
    path("get_search_info/", get_search_info, name="admin_get_search_info"),
    path("modify_student_info/", modify_student_info, name="admin_modify_student_info"),
    path("get_teacher_info/", get_teacher_info, name="admin_get_teacher_info"),
]
