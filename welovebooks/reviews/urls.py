from django.urls import path
from .views import Review_CRUD

urlpatterns = [
    path("", Review_CRUD.as_view()),

]