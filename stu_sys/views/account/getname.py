from django.http import JsonResponse
from stu_sys.models.tsu_user import Tsu_user
from stu_sys.models.student import Student
from stu_sys.models.teacher import Teacher

def getname(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            'result': "未登录"
        })
    else:
        tsu_user = Tsu_user.objects.get(user=user)
        stu = Student.objects.filter(user=tsu_user)
        teacher = Teacher.objects.filter(user=tsu_user)
        name = str()
        if stu:
            name = stu[0].name;
        if teacher:
            name = teacher[0].name;
        return JsonResponse({
            'result': "success",
            'name': name,
        })
