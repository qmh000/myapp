from django.http import JsonResponse
from stu_sys.models.tsu_user import Tsu_user
from stu_sys.models.course import Course
from stu_sys.models.teacher import Teacher
from django.contrib.auth.models import User

def save_course(request):
    data = request.GET
    name = data.get('name', "").strip()
    tuser = data.get('tuser', "").strip()
    period = data.get('period', "").strip()
    credit = data.get('credit', "").strip()
    open_class = data.get('open_class', "").strip()
    if not name:
        return JsonResponse({
            'result': "课程名称不能为空"
        })
    if not tuser:
        return JsonResponse({
            'result': "教师工号不能为空"
        })
    if not period:
        return JsonResponse({
            'result': "学时不能为空"
        })
    if not credit:
        return JsonResponse({
            'result': "学分不能为空"
        })
    if not open_class:
        return JsonResponse({
            'result': "开课班级不能为空"
        })
    try:
        user = User.objects.get(username=tuser)
        temp = Course(name=name,tuser=user, period=period, credit=credit, open_class=open_class)
        temp.save()
        return JsonResponse({
          'result': "success"
        })
    except:
        return JsonResponse({
            'result': "请输入正确的教师工号！"
        })
