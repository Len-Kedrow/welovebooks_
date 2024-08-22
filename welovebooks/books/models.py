from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    industry_identifiers = models.JSONField(default=list)
    thumbnail = models.CharField(max_length=255)
    # Add other fields as necessary
    
    def __str__(self):
        return self.title
    
class ToReadList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    added_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} wants to read {self.book.title}"
       

