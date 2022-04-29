from django.http import JsonResponse
from stu_sys.models.notification import Notification

def add_notification(request):
    data = request.GET
    title = data.get('title', "").strip()
    detail = data.get('detail', "").strip()
    if not title:
        return JsonResponse({
            'result': "标题不能为空"
        })
    if not detail:
        return JsonResponse({
            'result': "通知内容不能为空"
        })
    temp = Notification(title=title, detail=detail)
    temp.save()
    return JsonResponse({
        'result': "success"
    })
