import uuid

from django.contrib.auth.hashers import check_password
from django.db import models

from card.models import Card


# Create your models here.d

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    card_id = models.ForeignKey(Card, on_delete=models.CASCADE, null=True, blank=True)

    REQUIRED_FIELDS = ['username', 'email', 'password', 'first_name', 'last_name']

    def __str__(self):
        return self.username

    def set_password(self, raw_password):
        self.password = raw_password  # Use a proper hashing mechanism
        self.save()

    def check_password(self, raw_password):
        if self.password and raw_password:
            return check_password(raw_password, self.password)
        return False
