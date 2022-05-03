from django.http import JsonResponse
from stu_sys.models.teacher import Teacher

def modify_teacher_info(request):
    data = request.GET
    name = data.get('name', "").strip()
    dept = data.get('dept', "").strip()
    if not name:
        return JsonResponse({
            'result': "请选择一位老师"
        })
    if not dept:
        return JsonResponse({
            'result': "请修改教师所属院系"
        })

    teacher = Teacher.objects.get(name=name)
    teacher.dept = dept
    teacher.save()
    return JsonResponse({
        'result': "success"
        })
