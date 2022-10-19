from django.db import models

# Create your models here.

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    thumbnail = models.ImageField(upload_to="./main_app/static/images/project")
    github = models.URLField(null=True , blank=True)
    live = models.URLField(null=True, blank=True)
    featured = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.title)
