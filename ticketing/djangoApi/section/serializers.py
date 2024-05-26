from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Section
from event.models import Event
import string
import random


def generate_random_password(length=7):
    characters = string.ascii_letters
    return ''.join(random.choice(characters) for i in range(length))


class SectionRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = (
            'email', 'section_username', 'name', 'description', 'location', 'location_url', 'website_url',
            'facebook_url',
            'instagram_url', 'linkedin_url', 'tiktok_url', 'password', 'country_code')
        extra_kwargs = {
            'password': {'required': False}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        if not password:
            # Generate a random password if not provided
            generated_password = generate_random_password()
            hashed_password = make_password(generated_password)
            validated_data['password'] = hashed_password
        else:
            # Hash the provided password
            validated_data['password'] = make_password(password)
            generated_password = password  # Store the original password for response

        section = Section.objects.create(**validated_data)

        # Add password to the response data
        section.password = generated_password
        return section


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        exclude = ["password"]


class SectionLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # Ensure email or username is provided
        if not username:
            raise serializers.ValidationError("Please provide email or username.")

        return data


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'