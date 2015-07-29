from __future__ import unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore import blocks
from wagtail.wagtailcore import fields
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailsearch import index


class ContentBlock(blocks.StreamBlock):
    subheading = blocks.CharBlock(help_text='Subheading')
    heading_image = ImageChooserBlock(required=False,
                                      help_text='Subheading Image')
    content = blocks.RichTextBlock()


class BlogPostPage(Page):
    title_extended = models.CharField(max_length=60, blank=True, null=True)
    author = models.CharField(max_length=50)
    date = models.DateField()
    main_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )
    intro = models.TextField(blank=True, null=True)
    content = fields.StreamField(ContentBlock())

    content_panels = Page.content_panels + [
        FieldPanel('title_extended'),
        FieldPanel('date'),
        ImageChooserPanel('main_image'),
        FieldPanel('intro'),
        StreamFieldPanel('content'),
    ]

    class Meta:
        verbose_name = 'Blog Post'


