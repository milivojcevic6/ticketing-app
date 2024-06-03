# Create your views here.

from rest_framework import generics
from .models import Feedback
from .serializers import FeedbackSerializer
from rest_framework.response import Response
from user.models import User
from event.models import Event
from rest_framework import status


class FeedbackCreateOrUpdateView(generics.CreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('user')
        event_id = request.data.get('event')
        grade = request.data.get('grade')

        if not user_id or not event_id:
            return Response({"error": "Both user ID and event ID are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
            event = Event.objects.get(id=event_id)
        except (User.DoesNotExist, Event.DoesNotExist):
            return Response({"error": "User or Event not found"}, status=status.HTTP_404_NOT_FOUND)

        feedback, created = Feedback.objects.update_or_create(
            user=user,
            event=event,
            defaults={'grade': grade}
        )

        if created:
            return Response({"message": "Feedback created successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Feedback updated successfully"}, status=status.HTTP_200_OK)


class FeedbackUpdateView(generics.UpdateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
