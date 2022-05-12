from django.http import JsonResponse
from stu_sys.models.tsu_user import Tsu_user
from stu_sys.models.student import Student
from stu_sys.models.select import Select
from stu_sys.models.course import Course
from stu_sys.models.teacher import Teacher

def save_course(request):
    data = request.GET
    user = request.user
    name = data.get('name', "").strip()
    tname = data.get('tname', "").strip()
    period = data.get('period', "").strip()
    credit = data.get('credit', "").strip()
    open_class = data.get('open_class', "").strip()
    cour = Course.objects.get(name=name, period=period, credit=credit, open_class=open_class)
    temp = Select(user=user, cid=cour.cid, grade=None)
    temp.save()
    return JsonResponse({
      'result': "success"
    })
