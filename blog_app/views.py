from django.shortcuts import render
from .models import *
from django.core.paginator import Paginator
# Create your views here.

def all_articles(request):
    articles = Article.objects.all()
    paginator = Paginator(articles, 10) 
   
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    context = {"articles": page_obj}
    return render(request , 'blog_app/article_list.html', context)

def article(request , slug):
    article = Article.objects.get(slug=slug)
    
    articles = Article.objects.exclude( slug = slug )
    
    context = {"article":article, "articles":articles }
    
    return render(request , "blog_app/article.html", context)