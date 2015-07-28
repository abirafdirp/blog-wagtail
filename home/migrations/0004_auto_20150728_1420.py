# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_homepage_body'),
    ]

    operations = [
        migrations.RenameField(
            model_name='homepage',
            old_name='body',
            new_name='overview',
        ),
    ]
