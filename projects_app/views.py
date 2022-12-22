from django.shortcuts import render
from projects_app.models import *
# Create your views here.

def all_projects(request):
    projects = Project.objects.all().order_by("date_added")[::-1]
    context = {"projects":projects}
    return render(request,"projects_app/projects_list.html" ,context)
