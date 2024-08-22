from django.contrib import admin

# Register your models here.   from django.contrib import admin
    # Explecit import of Pokemon Model
from .models import Meeting

    # Register your models here.
admin.site.register([Meeting])