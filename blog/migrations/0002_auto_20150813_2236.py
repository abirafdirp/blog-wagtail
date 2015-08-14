# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import wagtail.wagtailcore.fields
import wagtail.wagtailcore.blocks
import wagtail.wagtailimages.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpostpage',
            name='content',
            field=wagtail.wagtailcore.fields.StreamField([(b'subheading', wagtail.wagtailcore.blocks.CharBlock(help_text='Subheading')), (b'subheading_background', wagtail.wagtailimages.blocks.ImageChooserBlock(help_text='Subheading Background Image', required=False)), (b'content', wagtail.wagtailcore.blocks.RichTextBlock()), (b'full_image', wagtail.wagtailimages.blocks.ImageChooserBlock(help_text='Full Image', required=False)), (b'code_block', wagtail.wagtailcore.blocks.RawHTMLBlock(help_text='Must Use http://syntaxhighlight.in/')), (b'pre_tag', wagtail.wagtailcore.blocks.RawHTMLBlock()), (b'smaller_subheading', wagtail.wagtailcore.blocks.CharBlock(help_text='Subheading'))]),
        ),
    ]
