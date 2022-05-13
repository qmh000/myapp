from django.http import JsonResponse
from stu_sys.models.course import Course
from stu_sys.models.teacher import Teacher
from stu_sys.models.tsu_user import Tsu_user
from stu_sys.models.student import Student
from stu_sys.models.select import Select

def show_selectable_course(request):
    user = request.user
    identity = str()
    if user.is_authenticated:
        tsu_user = Tsu_user.objects.get(user=user)
        identity = tsu_user.identity
    else:
        obj_dic = {}
        list = []
        obj_dic['data'] = list
        return JsonResponse(obj_dic)

    tsu_user = Tsu_user.objects.get(user=user)
    stu = Student.objects.filter(user=tsu_user)
    sc = Select.objects.filter(user=user)
    courses = Course.objects.all()

    if identity != "学生" or not stu:
        obj_dic = {}
        list = []
        obj_dic['data'] = list
        return JsonResponse(obj_dic)

    list = []
    for cour in courses:
        cid = cour.cid
        exist = sc.filter(cid=cid)
        if stu[0].minor_class == cour.open_class and not exist:
            tsu_user = Tsu_user.objects.get(user=cour.tuser)
            tname = Teacher.objects.get(user=tsu_user).name
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
