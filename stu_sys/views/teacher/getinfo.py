from django.http import JsonResponse
from stu_sys.models.teacher import Teacher
from stu_sys.models.tsu_user import Tsu_user

def getinfo(request):
    user = request.user
    tsu_user = Tsu_user.objects.get(user=user)
    teacher = Teacher.objects.get(user=tsu_user)
    return JsonResponse({
        'result': "success",
        'name': teacher.name,
        'dept': teacher.dept,
    })

