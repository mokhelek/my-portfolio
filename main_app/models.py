from django.db import models

# Create your models here.

class Skill(models.Model):
    name = models.CharField(max_length=100)
    thumbnail = models.ImageField(upload_to="skills")
    description = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True, blank=True,null=True)

    def __str__(self):
        return self.name
    
class Texts(models.Model):
    intro_text = models.TextField()
    about_text = models.TextField()
    greetings_text = models.TextField()
    
    def __str__(self):
        return "Website Texts"
    
class Resume(models.Model):
    resume_file = models.FileField(upload_to="resume")
    
    def __str__(self):
        return "my resume"