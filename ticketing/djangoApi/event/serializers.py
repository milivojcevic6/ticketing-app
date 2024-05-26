from rest_framework import serializers
from .models import Event
from datetime import datetime



class CustomDateTimeField(serializers.DateTimeField):
    def to_internal_value(self, value):
        try:
            # Parse the input datetime string into a datetime object
            return datetime.strptime(value, '%d.%m.%Y %H:%M')
        except ValueError:
            # Handle invalid input format
            raise serializers.ValidationError('Invalid datetime format. Please use DD.MM.YYYY H:M format.')


class EventSerializer(serializers.ModelSerializer):
    event_date = CustomDateTimeField()
    publish_date = CustomDateTimeField()

    class Meta:
        model = Event
        fields = '__all__'
