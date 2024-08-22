from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
import requests
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Review, Book
from .serializers import ReviewSerializer 
from django.conf import settings
from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_204_NO_CONTENT, 
    HTTP_201_CREATED, 
    HTTP_400_BAD_REQUEST
)

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication 
from rest_framework.views import APIView

# Create your views here.
class Review_CRUD(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, reveiw_id=None):
        # if review_id is provided get the requested review.
        if reveiw_id: 
            review = get_object_or_404(Review, id=reveiw_id, user=request.user)
            serializer = ReviewSerializer(review) 
            return Response(serializer.data, status= HTTP_200_OK)
        else: 
            reviews = Review.objects.filter(user=request.user)
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        
    def post(self, request): 
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response( serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    def put(self, request, review_id):
    # Update an existing review
        review = get_object_or_404(Review, id=review_id, user=request.user)
        serializer = ReviewSerializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, review_id):
        # Delete a review
        review = get_object_or_404(Review, id=review_id, user=request.user)
        review.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    
# Create your views here.

