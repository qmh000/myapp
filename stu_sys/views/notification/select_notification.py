from django.http import JsonResponse
from stu_sys.models.notification import Notification

def select_notification(request):
    data = request.GET
    title = data.get('title')

    obj = Notification.objects.filter(title=title)
    print(obj)
    if not obj:
        return JsonResponse({
            'result': "请选择一个通知"
        })
    return JsonResponse({
        'result': "success",
        'detail': obj[0].detail,
        'title': obj[0].title,
    })
