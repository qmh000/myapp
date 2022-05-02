from django.http import JsonResponse
from stu_sys.models.tsu_user import Tsu_user
from stu_sys.models.teacher import Teacher
from stu_sys.models.course import Course

def delete_course(request):
    data = request.GET
    name = data.get("name")
    tname = data.get("tname")
    teacher = Teacher.objects.filter(name=tname)
    cour = set()
    for obj in teacher:
        tuser = obj.user.user
        cour = Course.objects.get(name=name, tuser=tuser)
        if cour:
            break
    if not cour:
        return JsonResponse({
            'result': "failed"
        })
    cour.delete()
    return JsonResponse({
        'result': "success"
    })
