from django.views.decorators.http import require_POST

# Create your views here.

from rest_framework import generics, status
from .models import User
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer, SectionSerializer, \
    UserUpdateSerializer, EventSerializer, UserPasswordChangeSerializer, TicketSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from section.models import Section
from event.models import Event
from ticket.models import Ticket


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


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserSectionsView(APIView):
    def get(self, request, uuid=None):
        if uuid:
            # Retrieve sections for the specific user
            try:
                user = User.objects.get(id=uuid)
                sections = user.sections.all()
                serializer = SectionSerializer(sections, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Retrieve all sections
            sections = Section.objects.all()
            serializer = SectionSerializer(sections, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserEventsView(APIView):
    def get(self, request, uuid):
        try:
            user = User.objects.get(id=uuid)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        sections = user.sections.all()
        events = Event.objects.filter(section__in=sections)
        serializer = EventSerializer(events, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer

    def get_object(self):
        # Retrieve the user instance based on the UUID provided in the request body
        uuid = self.request.data.get('id')
        return User.objects.get(id=uuid)


class UserPasswordChangeView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserPasswordChangeSerializer

    def update(self, request, *args, **kwargs):
        # Retrieve the user instance based on the UUID provided in the request body
        uuid = request.data.get('uuid')
        if not uuid:
            return Response({"error": "UUID not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=uuid)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Validate the provided data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check if the provided old password matches the user's current password
        old_password = serializer.validated_data.get('old_password')
        if not user.check_password(old_password):
            return Response({"error": "Invalid old password"}, status=status.HTTP_400_BAD_REQUEST)

        # Change the user's password
        new_password = serializer.validated_data.get('new_password')
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)


class UserTicketsView(generics.ListAPIView):
    serializer_class = TicketSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Ticket.objects.filter(user_id=user_id)