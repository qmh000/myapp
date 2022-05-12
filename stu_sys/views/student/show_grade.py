from django.http import JsonResponse
from stu_sys.models.course import Course
from stu_sys.models.teacher import Teacher
from stu_sys.models.tsu_user import Tsu_user
from stu_sys.models.student import Student
from stu_sys.models.select import Select

def show_grade(request):
    user = request.user
    sc = Select.objects.filter(user=user)
    list = []
    for obj in sc:
        cid = obj.cid
        cour = Course.objects.get(cid=cid)
        if obj.grade != None:
            cour_info = {
                'name': cour.name,
                'grade': obj.grade,
            }
            list.append(cour_info)
    obj_dic = {}
    obj_dic['data'] = list
    return JsonResponse(obj_dic)
