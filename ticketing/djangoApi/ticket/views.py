from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Ticket
from .serializers import TicketSerializer
from user.models import User
from event.models import Event


# Create your views here.

class TicketCreateView(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def create(self, request, *args, **kwargs):
        # Extract event ID and user ID from the request data
        event_id = request.data.get('event_id')
        user_id = request.data.get('user_id')

        # Check if event ID and user ID are provided
        if not event_id or not user_id:
            return Response({"error": "Both event ID and user ID are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the provided event ID and user ID exist
        try:
            event = Event.objects.get(id=event_id)
            user = User.objects.get(id=user_id)
        except Event.DoesNotExist:
            return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Create a ticket
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            ticket = serializer.save(event_id=event, user_id=user)
            return Response(TicketSerializer(ticket).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TicketDetailView(generics.RetrieveAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        try:
            return self.retrieve(request, *args, **kwargs)
        except Ticket.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

