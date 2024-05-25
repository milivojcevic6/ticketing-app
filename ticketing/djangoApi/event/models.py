import uuid

from django.db import models

from user.models import User
from section.models import Section
# Create your models here.d

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=240, decimal_places=2)
    esn_price = models.DecimalField(max_digits=240, decimal_places=2)
    location = models.CharField(max_length=255)
    location_url = models.URLField()
    type = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event_date = models.DateTimeField()
    publish_date = models.DateTimeField()
    section = models.ForeignKey(Section, on_delete=models.CASCADE)

