# Generated by Django 3.2.8 on 2022-05-11 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stu_sys', '0002_alter_select_grade'),
    ]

    operations = [
        migrations.AlterField(
            model_name='select',
            name='cid',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='select',
            name='user',
            field=models.CharField(max_length=30),
        ),
    ]