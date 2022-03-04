# Generated by Django 4.0.3 on 2022-03-03 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Foods',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
                ('type', models.CharField(max_length=20)),
                ('price', models.FloatField()),
            ],
            options={
                'db_table': 'foods',
            },
        ),
    ]