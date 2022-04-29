from django.http import JsonResponse
from stu_sys.models.notification import Notification

def get_notification(request):
    objects = Notification.objects.all()
    list = []
    for obj in objects:
        obj_info = {
            'title': obj.title,
            'create_time': str(obj.create_time),
            'detail': obj.detail,
        }
        list.append(obj_info)
    obj_dic = {}
    obj_dic['data'] = list
    return JsonResponse(obj_dic)
