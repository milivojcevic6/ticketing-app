# Generated by Django 5.0.6 on 2024-06-03 11:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0005_alter_event_location_url'),
        ('ticket', '0003_remove_ticket_qr_code_image'),
        ('user', '0006_user_sections_alter_user_username'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='ticket',
            unique_together={('event_id', 'user_id')},
        ),
    ]
