from django.shortcuts import render
from projects_app.models import *
from blog_app.models import *
# Create your views here.

def homePage(request):
    projects = Project.objects.filter(featured=True)[0:4]
    articles = Article.objects.filter(featured_article = True)[0:3:-1]
    
    context = {"projects":projects ,"articles":articles}
    return render(request,"main_app/index.html",context)