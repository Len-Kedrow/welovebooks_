from rest_framework import serializers
from books.models import Book, ToReadList

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'industry_identifiers', 'thumbnail']


class ToReadListSerializer(serializers.ModelSerializer):
    class Meta: 
        model = ToReadList
        fields = ['user', 'book', 'add_on']