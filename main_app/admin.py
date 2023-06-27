from django.contrib import admin
from projects_app.models import *
from blog_app.models import *
from main_app.models import *
# Register your models here.

admin.site.register(Project)
admin.site.register(Article)
admin.site.register(Tag)
admin.site.register(ProjectTag)
admin.site.register(Skill)
admin.site.register(Texts)
admin.site.register(Resume)

