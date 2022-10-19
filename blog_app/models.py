from django.db import models
from django_quill.fields import QuillField
from django.urls import reverse

from io import BytesIO
from PIL import Image
from django.core.files import File
# Create your models here.

def compress(image):
    im =Image.open(image)
    im_io = BytesIO()
    im.save(im_io,'PNG',quality=60)
    new_image = File(im_io,name=image.name)
    return new_image


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
    
    def save(self,*args,**kwargs):
        new_image = compress(self.thumbnail)
        self.thumbnail = new_image
        super().save(*args,**kwargs)
    
    def get_absolute_url(self):
        return reverse("article", kwargs={"slug":self.slug})
    
    def __str__(self): 
        return str(self.title)

