from django.views.decorators.http import require_POST

# Create your views here.

from rest_framework import generics, status
from .models import User
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer
from rest_framework.response import Response


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer


class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email_or_username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')

        if '@' in email_or_username:
            user = User.objects.filter(email=email_or_username).first()
        else:
            user = User.objects.filter(username=email_or_username).first()

        if user is not None and user.check_password(password):
            # Handle successful login
            serializer = UserSerializer(user)
            return Response({"message": "Login successful", "user": serializer.data}, status=status.HTTP_200_OK)
        else:
            # Invalid credentials
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
