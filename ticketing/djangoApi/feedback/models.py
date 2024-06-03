import uuid

from django.db import models
from user.models import User
from event.models import Event


# Create your models here.

class Feedback(models.Model):
    GRADE_CHOICES = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5')
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    grade = models.IntegerField(choices=GRADE_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self):
        return f"Feedback for {self.event} by {self.user}"

    class Meta:
        unique_together = ['user', 'event']
