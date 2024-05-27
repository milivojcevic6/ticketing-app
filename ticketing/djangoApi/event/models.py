import uuid

from django.db import models

from section.models import Section


# Create your models here.d

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=240, decimal_places=2)
    esn_price = models.DecimalField(max_digits=240, decimal_places=2)
    location = models.CharField(max_length=255)
    location_url = models.URLField(null=True, blank=True)
    type = models.CharField(max_length=255)
    event_date = models.DateTimeField()
    publish_date = models.DateTimeField()
    section = models.ForeignKey(Section, related_name='events', on_delete=models.CASCADE)
    capacity = models.IntegerField(default=100)
