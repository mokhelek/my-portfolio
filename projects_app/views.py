from django.shortcuts import render
from projects_app.models import *
# Create your views here.

def all_projects(request):
    projects = Project.objects.all()
    context = {"projects":projects}
    return render(request,"projects_app/projects_list.html" ,context)
