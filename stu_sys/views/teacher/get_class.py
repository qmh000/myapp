from django.http import JsonResponse
from stu_sys.models.student import Student

def get_class(request):
    cond = request.GET
    minor_class = cond.get("class")

    if minor_class == "所有班级":
        students = Student.objects.all()
    else:
        students = Student.objects.filter(minor_class=minor_class)

    list = []
    for stu in students:
        obj_info = {
            'name': stu.name,
            'sex': stu.sex,
            'age': stu.age,
            'dept': stu.dept,
            'minor_class': stu.minor_class,
            'minor_subject': stu.minor_subject,
        }
        list.append(obj_info)
    obj_dic = {}
    obj_dic['data'] = list
    return JsonResponse(obj_dic)

