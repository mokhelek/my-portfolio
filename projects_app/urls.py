from django.urls import path 
from .import views

app_name ="projects_app"

urlpatterns = [
    path('',views.all_projects,name="all_projects"),  # display all projects
    
]