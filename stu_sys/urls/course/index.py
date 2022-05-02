from django.urls import path
from stu_sys.views.course.get_course import get_course
from stu_sys.views.course.save_course import save_course
from stu_sys.views.course.delete_course import delete_course

urlpatterns = [
    path("get_course/", get_course, name="admin_get_course"),
    path("save_course/", save_course, name="admin_save_course"),
    path("delete_course/", delete_course, name="admin_delete_course"),
]
