from django.contrib import admin


    # Explecit import of Pokemon Model
from .models import  Book

    # Register your models here.
admin.site.register([Book])
