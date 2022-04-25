from django.http import JsonResponse
from stu_sys.models.tsu_user import Tsu_user


def getinfo(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            'result': "未登录"
        })
    else:
        tsu_user = Tsu_user.objects.get(user=user)
        return JsonResponse({
            'result': "success",
            'username': tsu_user.user.username,
            'identity': tsu_user.identity,
        })
