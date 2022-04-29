from django.http import JsonResponse
from stu_sys.models.notification import Notification

def delete_notification(request):
    data = request.GET
    title = data.get('title')

    obj = Notification.objects.filter(title=title)
    if not obj:
        return JsonResponse({
            'result': "failed"
        })
    obj.delete()
    return JsonResponse({
        'result': "success"
    })
