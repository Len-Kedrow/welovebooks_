from django.shortcuts import render, get_object_or_404
import requests
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout, authenticate
from .models import Book, ToReadList
from .serializers import BookSerializer, ToReadListSerializer
from django.conf import settings
from rest_framework.views import APIView 
from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_204_NO_CONTENT,  
    HTTP_201_CREATED, 
    HTTP_400_BAD_REQUEST
)

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication 
from rest_framework import generics, permissions 
from dotenv import load_dotenv
import os

load_dotenv()
book_key = os.getenv("GOOGLE_BOOKS_API_KEY")



# Create your views here.
class BookSearch(APIView):
    
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def  get(self, request, *args, **kwargs):
        
        query = request.query_params.get('q', '')
        response = requests.get(f'https://www.googleapis.com/books/v1/volumes?q={query}&key={book_key}')
        print("start", response,"and", query)
        if response.status_code == 200:
            data = response.json()
            items = data.get('items', [])

            # Extract the relevant parts
            books = []
            for item in items:
                volume_info = item.get('volumeInfo', {})
                industry_identifiers = volume_info.get('industryIdentifiers', []),
                image_links = volume_info.get('imageLinks', {})
                thumbnail = image_links.get('thumbnail')

                book_data = {
                    'title': volume_info.get('title', 'No title'),
                    'authors': volume_info.get('authors', ['Unknown author']),
                    'industryIdentifiers': industry_identifiers,
                    'thumbnail': thumbnail
                }
                
                books.append(book_data)
                  
            return Response(books, status=HTTP_200_OK)
        else:
            return Response({"message": "Error fetching data from Google Books API."}, status=response.status_code)

class AllBooks(generics.GenericAPIView):
   
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try: 
            all_books = Book.objects.all()
            serialized_books = BookSerializer(all_books, many=True)
            return Response(serialized_books.data, status=HTTP_200_OK)
        except Exception as e: 
            return Response(e, status=HTTP_400_BAD_REQUEST)



class ToReadListView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookSerializer

    def get(self, request):
        """List all books in the user's to-read list."""
        user = request.user
        to_read_books = ToReadList.objects.filter(user=user).select_related('book')
        books = [item.book for item in to_read_books]
        serialized_books = self.get_serializer(books, many=True)
        return Response(serialized_books.data, status=HTTP_200_OK)

    def post(self, request):
        """Add a book to the user's to-read list."""
        book_id = request.data.get('book_id')
        if not book_id:
            return Response({"detail": "Book ID is required."}, status=HTTP_400_BAD_REQUEST)

        book = get_object_or_404(Book, id=book_id)
        user = request.user

        # Check if the book is already in the user's to-read list
        to_read_item, created = ToReadList.objects.get_or_create(user=user, book=book)

        if created:
            return Response({"message": "Book added to your to-read list"}, status=HTTP_201_CREATED)
        else:
            return Response({"message": "Book is already in your to-read list"}, status=HTTP_200_OK)
        

class StoreBookView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(f"Received data: {request.data}")
        book_data = request.data

        title = book_data.get('title', 'No title')
        author = ', '.join(book_data.get('authors', ['Unknown author']))
        industry_identifiers=book_data.get('industry_identifiers'),
        thumbnail =book_data.get('thumbnail',"No thumbnail")

        book, created = Book.objects.get_or_create(
            title=title,
            author=author,
            industry_identifiers=industry_identifiers,
            thumbnail = thumbnail
        )

        if created:
            return Response({"message": "Book stored successfully.", "book": BookSerializer(book).data}, status=HTTP_201_CREATED)
        else:
            return Response({"message": "Book already exists in the database.", "book": BookSerializer(book).data}, status=HTTP_200_OK)

    def put(self, request):
        print(f"Received data: {request.data}")
        book_data = request.data

        title = book_data.get('title', 'No title')
        author = ', '.join(book_data.get('authors', ['Unknown author']))
        isbn_list = book_data.get('industryIdentifiers', [])
        isbn = next((identifier['identifier'] for identifier in isbn_list if identifier['type'] == 'ISBN_13'), 'No ISBN')

        # Attempt to find the book by its ISBN, assuming ISBN is unique
        try:
            book = Book.objects.get(isbn=isbn)
            # Update the book's details
            book.title = title
            book.author = author
            book.save()
            return Response({"message": "Book updated successfully.", "book": BookSerializer(book).data}, status=HTTP_200_OK)
        
        except Book.DoesNotExist:
            # Create a new book if it doesn't exist
            book = Book.objects.create(
                title=title,
                author=author,
                isbn=isbn
            )
            return Response({"message": "Book created successfully.", "book": BookSerializer(book).data}, status=HTTP_201)
        
class RemoveBook(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        isbn = request.data.get('isbn')

        if not isbn:
            return Response({"error": "ISBN not provided"}, status=HTTP_400_BAD_REQUEST)
        
        # Get the book object using ISBN or return 404 if not found
        book = get_object_or_404(Book, industry_identifiers__contains=[{"type": "ISBN_13", "identifier": isbn}])

        # Delete the book
        book.delete()
        return Response({"message": "Book deleted successfully."}, status=HTTP_204_NO_CONTENT)