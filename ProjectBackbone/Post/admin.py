from django.contrib import admin

# Register your models here.
from Post.models import Post

class AdminPost(admin.ModelAdmin):
    search_fields = ['title']
    list_display = ['title','content','bertanswer','bertconf']
    list_filter = ['title']
    class Meta:
        model=Post;

admin.site.register(Post,AdminPost)