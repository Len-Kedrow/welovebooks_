from django.db import models
from books.models import Book
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator 

# Create your models here.
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.IntegerField(default= 3, validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    
    def __str__(self):
        return f"Review of {self.book.title} by {self.user.username}"