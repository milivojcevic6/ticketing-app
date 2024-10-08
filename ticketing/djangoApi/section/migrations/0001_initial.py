# Generated by Django 5.0.6 on 2024-05-20 20:54

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('facebook_url', models.URLField()),
                ('instagram_url', models.URLField()),
                ('linkedin_url', models.URLField()),
                ('tiktok_url', models.URLField()),
                ('location_url', models.URLField()),
                ('location', models.CharField(max_length=255)),
                ('website_url', models.URLField()),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=255)),
            ],
        ),
    ]
