import uuid

from django.db import models


# Create your models here.d

class Section(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    section_username = models.CharField(max_length=255, unique=True, blank=True, null=True)
    description = models.TextField(default=None, null=True, blank=True)
    location = models.CharField(max_length=255)
    location_url = models.URLField()
    website_url = models.URLField()
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    facebook_url = models.URLField(null=True, blank=True)
    instagram_url = models.URLField(null=True, blank=True)
    linkedin_url = models.URLField(null=True, blank=True)
    tiktok_url = models.URLField(null=True, blank=True)

    REQUIRED_FIELDS = ['name', 'email', 'description', 'location', 'location_url', 'website_url', 'facebook_url',
                       'instagram_url', 'linkedin_url', 'tiktok_url']

    def __str__(self):
        return self.section_username

    def set_password(self, raw_password):
        self.password = raw_password  # Use a proper hashing mechanism
        self.save()

    def check_password(self, raw_password):
        return self.password == raw_password  # Use a proper hashing mechanism
