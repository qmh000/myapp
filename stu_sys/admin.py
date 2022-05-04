from django.contrib import admin
from stu_sys.models.tsu_user import Tsu_user
from stu_sys.models.notification import Notification
from stu_sys.models.teacher import Teacher
from stu_sys.models.student import Student
from stu_sys.models.course import Course
from stu_sys.models.select import Select
# Register your models here.

admin.site.register(Tsu_user)
admin.site.register(Notification)
admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Course)
admin.site.register(Select)
