# Generated by Django 3.2.8 on 2022-05-11 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stu_sys', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='select',
            name='grade',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
