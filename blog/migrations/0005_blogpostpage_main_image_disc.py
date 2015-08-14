# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_auto_20150814_0822'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpostpage',
            name='main_image_disc',
            field=models.CharField(max_length=50, null=True, blank=True),
        ),
    ]
