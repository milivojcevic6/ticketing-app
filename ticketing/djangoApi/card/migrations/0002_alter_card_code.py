# Generated by Django 5.0.6 on 2024-05-27 09:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('card', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='card',
            name='code',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
