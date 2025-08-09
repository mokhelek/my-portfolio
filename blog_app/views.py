from django.shortcuts import render, get_object_or_404
from django.http import Http404
from .models import *
from django.core.paginator import Paginator
# Create your views here.

def all_articles(request):
    try:
        articles = Article.objects.all().order_by('-date_posted')
        paginator = Paginator(articles, 9)  # Changed to 9 for better grid layout
       
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        context = {"articles": page_obj}
        return render(request , 'blog_app/article_list.html', context)
    except Exception as e:
        # Handle any database errors gracefully
        context = {"articles": []}
        return render(request , 'blog_app/article_list.html', context)

def article(request, slug):
    try:
        article = get_object_or_404(Article, slug=slug)
        
        # Get related articles (exclude current article, order by date)
        articles = Article.objects.exclude(slug=slug).order_by('-date_posted')[:3]
        
        context = {"article": article, "articles": articles}
        
        return render(request, "blog_app/article.html", context)
    except Http404:
        raise Http404("Article not found")
    except Exception as e:
        # Handle any other errors gracefully
        context = {"article": None, "articles": []}
        return render(request, "blog_app/article.html", context)