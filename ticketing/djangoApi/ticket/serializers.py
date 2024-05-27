from rest_framework import serializers
from .models import Ticket
from event.models import Event
from user.models import User


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']


class TicketSerializer(serializers.ModelSerializer):
    event_id = EventSerializer(read_only=True)
    user_id = UserSerializer(read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'
