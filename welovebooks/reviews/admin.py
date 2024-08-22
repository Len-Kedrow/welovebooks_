from django.contrib import admin

# Register your models here.

    # Explecit import of Pokemon Model
from .models import Review

    # Register your models here.
admin.site.register([Review])

