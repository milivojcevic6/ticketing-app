from .models import Section
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import SectionLoginSerializer, SectionSerializer, SectionRegistrationSerializer, EventSerializer
from event.models import Event


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


class SectionListView(generics.ListAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        country_code = self.request.query_params.get('country_code')
        if country_code:
            queryset = queryset.filter(country_code=country_code)
        return queryset


class SectionEventsView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        section_id = self.kwargs['uuid']
        return Event.objects.filter(section__id=section_id)

    def list(self, request, *args, **kwargs):
        section_id = self.kwargs.get('uuid')
        if not Section.objects.filter(id=section_id).exists():
            return Response({"error": "Section not found"}, status=status.HTTP_404_NOT_FOUND)
        return super().list(request, *args, **kwargs)
