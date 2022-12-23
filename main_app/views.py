from django.shortcuts import render

from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings

from projects_app.models import *
from blog_app.models import *
from main_app.models import *


# Create your views here.

def homePage(request):
    projects = Project.objects.filter(featured=True).order_by("date_added")[0:4:-1]
    articles = Article.objects.filter(featured_article = True).order_by("date_added")[0:3:-1]
    skills = Skill.objects.all()
    texts = Texts.objects.all()
    resume = Resume.objects.all()
    
    context = {
        "projects":projects ,
        "articles":articles,
        "skills":skills,
        "texts":texts,
        "resume":resume,
        }
    return render(request,"main_app/index.html",context)

def sendEmail(request):
    if request.method == 'POST':
        template = render_to_string('main_app/email_template.html',{
			'name': request.POST['name'],
			'email': request.POST['email'],
   			'message': request.POST['message'],
		})
        
          
        email = EmailMessage(
			subject = "EMAIL FROM MY PORTFOLIO",
   			body= template, 
      		from_email= settings.EMAIL_HOST_USER,
			to = ["mkatleho191@gmail.com"],
   			reply_to = [request.POST['email']],
        )
    
        email.content_subtype = "html"
        email.fail_silently =False
        email.send()
    return render (request , "main_app/email_sent.html"  )