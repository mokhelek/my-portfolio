from django.db import models

# Create your models here.

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to="project")
    github = models.URLField(null=True , blank=True)
    live = models.URLField(null=True, blank=True)
    featured = models.BooleanField(default=False)
    date_added = models.DateTimeField(auto_now_add=True, blank=True,null=True)
    
    def __str__(self):
        return str(self.title)
