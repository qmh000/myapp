# Generated by Django 3.2.8 on 2022-04-27 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stu_sys', '0002_notification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='create_time',
            field=models.DateTimeField(),
        ),
    ]
