# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion
import wagtail.wagtailcore.fields
import wagtail.wagtailimages.blocks
import wagtail.wagtailcore.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0006_add_verbose_names'),
        ('wagtailcore', '0001_squashed_0016_change_page_url_path_to_text_field'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPostPage',
            fields=[
                ('page_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('title_extended', models.CharField(max_length=60, null=True, blank=True)),
                ('author', models.CharField(max_length=50)),
                ('date', models.DateField()),
                ('intro', models.TextField(null=True, blank=True)),
                ('content', wagtail.wagtailcore.fields.StreamField([(b'subheading', wagtail.wagtailcore.blocks.CharBlock(help_text='Subheading')), (b'heading_image', wagtail.wagtailimages.blocks.ImageChooserBlock(help_text='Subheading Image', required=False)), (b'content', wagtail.wagtailcore.blocks.RichTextBlock())])),
                ('main_image', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.SET_NULL, blank=True, to='wagtailimages.Image', null=True)),
            ],
            options={
                'verbose_name': 'Blog Post',
            },
            bases=('wagtailcore.page',),
        ),
    ]
