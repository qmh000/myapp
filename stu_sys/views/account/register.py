from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from stu_sys.models.tsu_user import Tsu_user

def register(request):
    data = request.GET
    username = data.get("username", "").strip()     # strip():去掉前后空格
    password = data.get("password", "").strip()
    password_confirm = data.get("password_confirm", "").strip()
    identity = data.get("identity")
    if not username or not password:
        return JsonResponse({
            'result': "用户名和密码不能为空",
        })
    if password != password_confirm:
        return JsonResponse({
            'result': "两次密码不一致",
        })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'result': "用户名已经存在",
        })
   ## user = User(username=username)
   ## user.set_password(password)
   ## user.save()
    user = User.objects.create_user(username=username, password=password)
    Tsu_user.objects.create(user=user, identity=identity)
    login(request, user)
    return JsonResponse({
        'result': "success"
    })
