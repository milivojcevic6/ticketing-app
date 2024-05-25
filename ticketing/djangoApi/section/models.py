
import uuid
from django.contrib.auth.hashers import check_password
from django.db import models


# Create your models here.d


class Section(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    section_username = models.CharField(max_length=255, unique=True, blank=True, null=True)
    description = models.TextField(default=None, null=True, blank=True)
    location = models.CharField(max_length=255)
    location_url = models.URLField(null=True, blank=True)
    website_url = models.URLField(null=True, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255, null=True, blank=True)
    facebook_url = models.URLField(null=True, blank=True)
    instagram_url = models.URLField(null=True, blank=True)
    linkedin_url = models.URLField(null=True, blank=True)
    tiktok_url = models.URLField(null=True, blank=True)
    country_code = models.CharField(max_length=3, default="SI")

    REQUIRED_FIELDS = ['name', 'email', 'description', 'location', 'location_url', 'website_url', 'facebook_url',
                       'instagram_url', 'linkedin_url', 'tiktok_url', 'country_code']

    def __str__(self):
        return self.section_username

    def check_password(self, raw_password):
        if self.password and raw_password:
            return check_password(raw_password, self.password)
        return False


