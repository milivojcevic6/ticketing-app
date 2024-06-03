import uuid

from django.db import models

from user.models import User
from event.models import Event


# Create your models here.d

class Ticket(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    issued_date = models.DateField(null=True, blank=True)
    status = models.BooleanField(default=False)
    event_id = models.ForeignKey(Event, on_delete=models.CASCADE, default=None)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    REQUIRED_FIELDS = ['event_id', 'user_id']

    class Meta:
        unique_together = ['event_id', 'user_id']