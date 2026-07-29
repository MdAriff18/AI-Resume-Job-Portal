from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcometo AI Resume Job Portal")