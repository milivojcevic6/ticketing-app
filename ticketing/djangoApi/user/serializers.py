from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import User, Card
from section.models import Section
from event.models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'  # You can specify individual fields if needed


class UserSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    card_id = CardSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'card_id', 'events']


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = User.objects.create(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # Ensure email or username is provided
        if not username:
            raise serializers.ValidationError("Please provide email or username.")

        return data


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        exclude = ["password"]
