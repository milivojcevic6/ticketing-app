import uuid

from django.db import models

from user.models import User

# Create your models here.d

class Ticket(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    issued_date = models.DateField()
    qr_code_image = models.ImageField(upload_to='')
    status = models.BooleanField(default=False)
    # event_id = models.UUIDField(default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)