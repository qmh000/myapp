from django.http import JsonResponse
from stu_sys.models.tsu_user import Tsu_user
from stu_sys.models.teacher import Teacher

def delete_info(request):
    user = request.user
    tsu_user = Tsu_user.objects.get(user=user)
    teacher = Teacher.objects.get(user=tsu_user)
    if not teacher:
        return JsonResponse({
            'result': "failed"
        })
    teacher.delete()
    return JsonResponse({
        'result': "success"
    })

