# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import wagtail.wagtailcore.fields
import wagtail.wagtailcore.blocks
import wagtail.wagtailimages.blocks
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0006_add_verbose_names'),
        ('wagtailcore', '0001_squashed_0016_change_page_url_path_to_text_field'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogIndexPage',
            fields=[
                ('page_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('featured_posts', wagtail.wagtailcore.fields.StreamField([('post', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))])),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.CreateModel(
            name='BlogPostPage',
            fields=[
                ('page_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
                ('angular_url', models.CharField(help_text='Format must be underscored and lowercased title', max_length=100)),
                ('title_extended', models.CharField(max_length=60, null=True, blank=True)),
                ('author', models.CharField(max_length=50)),
                ('date', models.DateField()),
                ('categories', wagtail.wagtailcore.fields.StreamField([(b'name', wagtail.wagtailcore.blocks.CharBlock(max_length=50))])),
                ('intro', wagtail.wagtailcore.fields.RichTextField(null=True, blank=True)),
                ('content', wagtail.wagtailcore.fields.StreamField([(b'subheading', wagtail.wagtailcore.blocks.CharBlock(help_text='Subheading')), (b'subheading_background', wagtail.wagtailimages.blocks.ImageChooserBlock(help_text='Subheading Background Image', required=False)), (b'content', wagtail.wagtailcore.blocks.RichTextBlock()), (b'full_image', wagtail.wagtailimages.blocks.ImageChooserBlock(help_text='Full Image', required=False)), (b'code_block', wagtail.wagtailcore.blocks.RawHTMLBlock(help_text='Must Use http://syntaxhighlight.in/')), (b'smaller_subheading', wagtail.wagtailcore.blocks.CharBlock(help_text='Subheading'))])),
                ('related_post', wagtail.wagtailcore.fields.StreamField([('post', wagtail.wagtailcore.blocks.PageChooserBlock(required=False))])),
                ('main_background_image', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.SET_NULL, blank=True, to='wagtailimages.Image', null=True)),
                ('main_image', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.SET_NULL, blank=True, to='wagtailimages.Image', null=True)),
                ('thumbnail_image', models.ForeignKey(related_name='+', on_delete=django.db.models.deletion.SET_NULL, blank=True, to='wagtailimages.Image', null=True)),
            ],
            options={
                'verbose_name': 'Blog Post',
            },
            bases=('wagtailcore.page',),
        ),
    ]
