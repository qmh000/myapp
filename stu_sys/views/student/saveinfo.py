from django.http import JsonResponse
from stu_sys.models.tsu_user import Tsu_user
from stu_sys.models.student import Student

def saveinfo(request):
    data = request.GET
    user = request.user
    tsu_user = Tsu_user.objects.get(user=user)
    name = data.get('name', "").strip()
    sex = data.get('sex', "").strip()
    age = data.get('age', "").strip()
    dept = data.get('dept', "").strip()
    minor_subject = data.get('minor', "").strip()
    minor_class = data.get('class', "").strip()
    if not name:
        return JsonResponse({
            'result': "姓名不能为空"
        })
    if not sex:
        return JsonResponse({
            'result': "性别不能为空"
        })
    if not age:
        return JsonResponse({
            'result': "年龄不能为空"
        })
    if not dept:
        return JsonResponse({
            'result': "所属院系不能为空"
        })
    if not minor_subject:
        return JsonResponse({
            'result': "辅修专业不能为空"
        })
    if not minor_class:
        return JsonResponse({
            'result': "辅修班级不能为空"
        })
    try:
        temp = Student(user=tsu_user, name=name, sex=sex, age=age, dept=dept, minor_class=minor_class, minor_subject=minor_subject)
        temp.save()
        return JsonResponse({
          'result': "success"
        })
    except:
        return JsonResponse({
            'result': "请输入正确的密码！"
        })
