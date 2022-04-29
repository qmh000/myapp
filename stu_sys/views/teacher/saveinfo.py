from django.http import JsonResponse
from stu_sys.models.tsu_user import Tsu_user 
from stu_sys.models.teacher import Teacher

def saveinfo(request):
    data = request.GET
    user = request.user
    tsu_user = Tsu_user.objects.get(user=user)
    name = data.get('name', "").strip()
    dept = data.get('dept', "").strip()
    if not name:
        return JsonResponse({
            'result': "姓名不能为空"
        })
    if not dept:
        return JsonResponse({
            'result': "所属院系不能为空"
        })
    temp = Teacher(user=tsu_user, name=name, dept=dept)
    temp.save()
    return JsonResponse({
        'result': "success"
    })
