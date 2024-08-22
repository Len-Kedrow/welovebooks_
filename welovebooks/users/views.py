from django.shortcuts import render
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User

from rest_framework.status import (
    HTTP_200_OK, 
    HTTP_204_NO_CONTENT, 
    HTTP_201_CREATED, 
    HTTP_400_BAD_REQUEST
)

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication 


# Create your views here.
class Sign_Up(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get("email")
        
        try: 
            new_user = User.objects.create_user(**data)
            new_user.full_clean()
            new_user.set_password(data.get("password"))
            new_user.save()
            
            token = Token.objects.create(user=new_user)
            return Response({"user": new_user.username, "token": token.key}, status=HTTP_201_CREATED)
        except ValidationError as e:
            print(e)
            return Response(e.message_dict, status=HTTP_400_BAD_REQUEST)
        

class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get(
            "username", request.data.get("email"))

        user = authenticate(username=data.get('username'), password=data.get('password'))
        print(user)

        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)

            response_data = {"token": token.key,"user": user.email}
            return Response(response_data, status=HTTP_200_OK)

        # Else, no user found
        return Response("Invalid login credentials", status=HTTP_400_BAD_REQUEST) #Set up more robust error messeages once running
 
class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)
    
class Info(TokenReq):
    def get(self, request):
       return Response({"user":request.user.email})       
