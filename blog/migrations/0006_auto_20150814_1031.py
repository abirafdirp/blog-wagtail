# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_blogpostpage_main_image_disc'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpostpage',
            name='main_image_disc',
        ),
        migrations.AddField(
            model_name='blogpostpage',
            name='main_img_disc',
            field=models.CharField(help_text='main image disclaimer', max_length=50, null=True, blank=True),
        ),
    ]
