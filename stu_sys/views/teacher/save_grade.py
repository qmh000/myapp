from django.http import JsonResponse
from stu_sys.models.course import Course
from stu_sys.models.select import Select

def save_grade(request):
    data = request.GET
    username = data.get('username', "").strip()
    cname = data.get('cname', "").strip()
    grade = data.get('grade', "").strip()
    if not username:
        return JsonResponse({
            'result': "学生学号不能为空"
        })
    if not cname:
        return JsonResponse({
            'result': "课程名称不能为空"
        })
    if not grade:
        return JsonResponse({
            'result': "成绩不能为空"
        })
    cid = Course.objects.get(name=cname).cid
    sc = Select.objects.filter(user=username, cid=cid)
    if not sc:
        return JsonResponse({
            'result': "该学生未选修该门课程"
        })
    sc[0].grade = grade
    sc[0].save()
    return JsonResponse({
        'result': "success"
    })
