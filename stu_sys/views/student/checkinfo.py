from django.http import JsonResponse
from stu_sys.models.tsu_user import Tsu_user
from stu_sys.models.student import Student

def checkinfo(request):
    user = request.user
    tsu_user = Tsu_user.objects.get(user=user)
    stu = Student.objects.filter(user=tsu_user)
    if not stu:
        return JsonResponse({
            'result': "failed"
        })
    return JsonResponse({
        'result': "success"
    })
