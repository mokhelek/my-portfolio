from django.urls import path 
from .import views

app_name ="blog_app"

urlpatterns = [
    path('',views.all_articles,name="all_articles"),  # display all projects
    path('article/<slug:slug>',views.article, name="article")
    
]