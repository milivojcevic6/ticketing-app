from django.views.decorators.http import require_POST

# Create your views here.

from rest_framework import generics, status
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserRegistrationSerializer, UserLoginSerializer
from rest_framework.response import Response

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if user:
            # Handle successful login
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)