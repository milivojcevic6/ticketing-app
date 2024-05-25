from .models import Section
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import SectionLoginSerializer, SectionSerializer, SectionRegistrationSerializer


class SectionRegistrationView(generics.CreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionRegistrationSerializer


class SectionLoginView(generics.GenericAPIView):
    serializer_class = SectionLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email_or_username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')

        if '@' in email_or_username:
            section = Section.objects.filter(email=email_or_username).first()
        else:
            section = Section.objects.filter(section_username=email_or_username).first()

        if section is not None and section.check_password(password):
            # Handle successful login
            serializer = SectionSerializer(section)
            return Response({"message": "Login successful", "user": serializer.data}, status=status.HTTP_200_OK)
        else:
            # Invalid credentials
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
