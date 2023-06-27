from django.db import models
from django_quill.fields import QuillField
# Create your models here.


class ProjectTag(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name
    
class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to="project")
    tags = models.ManyToManyField(ProjectTag, null=True, blank=True)
    github = models.URLField(null=True , blank=True)
    live = models.URLField(null=True, blank=True)
    featured = models.BooleanField(default=False)

    demoUsername = models.CharField(max_length=250, null= True, blank= True )
    demoPassword = models.CharField(max_length=250, null= True, blank= True)
    ordering = models.IntegerField( unique = True , null= True , blank = True   )    
    date_added = models.DateTimeField(auto_now_add=True, blank=True,null=True)
    
    def __str__(self):
        return str(self.title)

