from django.http import JsonResponse
from stu_sys.models.student import Student

def modify_student_info(request):
    data = request.GET
    name = data.get('name', "").strip()
    minor_subject = data.get('minor_subject', "").strip()
    minor_class = data.get('minor_class', "").strip()
    if not name:
        return JsonResponse({
            'result': "请选择一名学生"
        })
    if not minor_subject:
        return JsonResponse({
            'result': "请输入辅修专业"
        })
    if not minor_class:
        return JsonResponse({
            'result': "请输入辅修班级"
        })

    student = Student.objects.filter(name=name)
    stu = student[0]
    stu.minor_subject = minor_subject
    stu.minor_class = minor_class
    stu.save()
    return JsonResponse({
        'result': "success"
    })
