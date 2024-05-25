from rest_framework import serializers
from .models import Section

class SectionRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ('email', 'section_username', 'password', 'name', 'description', 'location', 'location_url', 'website_url', 'facebook_url', 'instagram_url', 'linkedin_url', 'tiktok_url')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        section = Section.objects.create_section(**validated_data)
        return section

class SectionLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)