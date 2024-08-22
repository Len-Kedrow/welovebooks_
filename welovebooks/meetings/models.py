from django.db import models
from django.contrib.auth.models import User
from books.models import Book

# Create your models here.
class Meeting(models.Model):
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    attendees = models.ManyToManyField(User)
    
    def __str__(self):
        return f"{self.book.title} - {self.date} at {self.time}"