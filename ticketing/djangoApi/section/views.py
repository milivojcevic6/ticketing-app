from rest_framework import generics
from .models import Section
from .serializers import SectionRegistrationSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import SectionLoginSerializer

# Create your views here.

class SectionRegistrationView(generics.CreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionRegistrationSerializer

class SectionLoginView(generics.GenericAPIView):
    serializer_class = SectionLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        section = authenticate(
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if section:
            # Handle successful login
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)