from django.http import JsonResponse
from stu_sys.models.course import Course
from stu_sys.models.teacher import Teacher
from stu_sys.models.tsu_user import Tsu_user

def get_course(request):
    courses = Course.objects.all()
    list = []
    for cour in courses:
        tsu_user = Tsu_user.objects.filter(user=cour.tuser)[0]
        tname = Teacher.objects.filter(user=tsu_user)[0].name
        cour_info = {
            'name': cour.name,
            'tname': tname,
            'period': cour.period,
            'credit': cour.credit,
            'open_class': cour.open_class,
        }
        list.append(cour_info)
    obj_dic = {}
    obj_dic['data'] = list
    return JsonResponse(obj_dic)
