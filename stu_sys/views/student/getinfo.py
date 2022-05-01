from django.http import JsonResponse
from stu_sys.models.student import Student
from stu_sys.models.tsu_user import Tsu_user

def getinfo(request):
    user = request.user
    tsu_user = Tsu_user.objects.get(user=user)
    stu = Student.objects.get(user=tsu_user)
    return JsonResponse({
        'result': "success",
        'name': stu.name,
        'sex': stu.sex,
        'age': stu.age,
        'dept': stu.dept,
        'minor_class': stu.minor_class,
        'minor_subject': stu.minor_subject,
    })
