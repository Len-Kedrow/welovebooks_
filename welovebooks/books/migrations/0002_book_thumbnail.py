# Generated by Django 5.1 on 2024-08-21 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='thumbnail',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
