from django.http import JsonResponse
from stu_sys.models.notification import Notification

def get_notification(request):
    objects = Notification.objects.all();
    data = dict();
    for obj in objects:
        title = str(obj.title)
        create_time = str(obj.create_time)
        data.update({title: create_time})

    return JsonResponse(data)
