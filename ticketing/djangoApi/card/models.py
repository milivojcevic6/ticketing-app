import uuid

from django.db import models


# Create your models here.d

class Card(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    code = models.CharField(max_length=255, unique=True)
    expiration_date = models.DateField()
    activation_date = models.DateField()
