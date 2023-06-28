from django.db import models
from django_quill.fields import QuillField
from django.urls import reverse

from io import BytesIO
from PIL import Image
from django.core.files import File
# Create your models here.



class Tag(models.Model):
	name = models.CharField(max_length=100)

	def __str__(self):
		return self.name

class Article(models.Model):
    title = models.CharField(max_length=80)
    subtitle = models.CharField(max_length=500)
    thumbnail = models.ImageField(upload_to="blog")
    body = QuillField()
    date_posted = models.DateTimeField(auto_now_add=True)
    featured_article = models.BooleanField(default=False)
    tags = models.ManyToManyField(Tag, null=True, blank=True)
    slug = models.SlugField(null=True)
    ordering = models.IntegerField( unique = True , null= True , blank = True   )    
    date_added = models.DateTimeField(auto_now_add=True, blank=True,null=True)

    
    
    def get_absolute_url(self):
        return reverse("article", kwargs={"slug":self.slug})
    
    def __str__(self): 
        return str(self.title)

