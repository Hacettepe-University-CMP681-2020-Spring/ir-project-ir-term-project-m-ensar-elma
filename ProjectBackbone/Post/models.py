from django.db import models

# Create your models here.
class Post(models.Model):
    title=models.CharField(max_length=250,verbose_name="Title");
    content=models.TextField(verbose_name="Content");
    publishing_date=models.DateTimeField();
    category=models.TextField(verbose_name="Category");
    keywords= models.TextField(verbose_name="Keywords");
    bertanswer=models.TextField(verbose_name="Bert Answer");
    bertconf=models.TextField(verbose_name="Confidence");
    def __str__(self):
        return self.title