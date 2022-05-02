from django.http import JsonResponse
from stu_sys.models.student import Student

def get_search_info(request):
    cond = request.GET
    minor = cond.get("minor")
    minor_class = cond.get("class")
    dept = cond.get("dept")

    if minor == "所有专业":
        students = Student.objects.all()
    else:
        students = Student.objects.filter(minor_subject=minor)
    if minor_class == "所有班级":
        students = students.all()
    else:
        students = students.filter(minor_class=minor_class)
    if dept == "所有学院":
        students = students.all()
    else:
        students = students.filter(dept=dept)

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

