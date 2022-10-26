from django.urls import path 
from .import views

app_name ="main_app"

urlpatterns = [
    path('',views.homePage,name="homePage"), # My landing page
    path('send_email/', views.sendEmail, name="sendEmail"),
    
]