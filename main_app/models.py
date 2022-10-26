from django.db import models

# Create your models here.

class Skill(models.Model):
    name = models.CharField(max_length=100)
    thumbnail = models.ImageField(upload_to="skills")
    description = models.TextField()
    
    def __str__(self):
        return self.name
