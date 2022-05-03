from django.http import JsonResponse
from stu_sys.models.teacher import Teacher
from stu_sys.models.course import Course

def get_teacher_info(request):
    cond = request.GET
    dept = cond.get("dept")

    if dept == "所有学院":
        teachers = Teacher.objects.all()
    else:
        teachers = Teacher.objects.filter(dept=dept)

    list = []
    for teacher in teachers:
        teacher_info = {
            'name': teacher.name,
            'dept': teacher.dept,
        }
        list.append(teacher_info)
    obj_dic = {}
    obj_dic['data'] = list
    return JsonResponse(obj_dic)
